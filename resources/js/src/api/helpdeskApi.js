import axios from "axios";
import { getEnv } from "../helpers/getEnv";

const { VITE_APP_URL } = getEnv();

const helpdeskApi = axios.create({
    baseURL: VITE_APP_URL,
    withCredentials: true,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
});

let csrfTokenInitialized = false;
let csrfTokenPromise = null;

// Helper para redirección al login
const redirectToLogin = () => {
    localStorage.clear();
    csrfTokenInitialized = false;
    window.location.href = "/auth/login";
};

const ensureCsrfToken = async () => {
    // Si ya está inicializado, retornar inmediatamente
    if (csrfTokenInitialized) {
        return Promise.resolve();
    }

    // Si ya hay una petición en curso, esperar a que termine
    if (csrfTokenPromise) {
        return csrfTokenPromise;
    }

    // Crear nueva promesa y almacenarla
    csrfTokenPromise = axios
        .get(`${VITE_APP_URL}/sanctum/csrf-cookie`, {
            withCredentials: true,
        })
        .then(() => {
            csrfTokenInitialized = true;
        })
        .catch((error) => {
            console.error("Error al obtener CSRF token:", error);
            throw error;
        })
        .finally(() => {
            csrfTokenPromise = null;
        });

    return csrfTokenPromise;
};

// Inicializar CSRF token al cargar
ensureCsrfToken();

helpdeskApi.interceptors.request.use(
    async (config) => {
        // Asegurar que el CSRF token esté inicializado antes de cada petición
        await ensureCsrfToken();

        const token = localStorage.getItem("auth_token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

helpdeskApi.interceptors.response.use(
    (response) => response,
    async (error) => {
        const { response, config } = error;

        if (response && response.status === 401) {
            // Obtener token del header en lugar de localStorage
            const token = config.headers.Authorization?.replace("Bearer ", "");

            if (!token) {
                // No hay token, redirigir al login
                redirectToLogin();
                return Promise.reject(error);
            }

            // Hay token pero falló - puede ser que expiró
            // Solo redirigir si no es una petición que ya se está reintentando
            // y no es un endpoint de autenticación (prevenir loop infinito)
            if (
                !config._retry &&
                !config.url.includes("/refresh") &&
                !config.url.includes("/auth/login")
            ) {
                config._retry = true;

                // Log en desarrollo
                if (import.meta.env.DEV) {
                    console.log(
                        `[helpdeskApi] Reintentando petición: ${config.url}`,
                    );
                }

                // Intentar refrescar el CSRF token
                csrfTokenInitialized = false;
                await ensureCsrfToken();

                // Reintentar la petición una vez
                try {
                    return await helpdeskApi(config);
                } catch (retryError) {
                    // Si falla de nuevo, ahora sí redirigir
                    redirectToLogin();
                    return Promise.reject(retryError);
                }
            } else {
                // Si es un endpoint de auth o ya se reintentó, redirigir directamente
                redirectToLogin();
                return Promise.reject(error);
            }
        }

        if (response && response.status === 403) {
            console.error(
                "Error 403: No tienes permisos para acceder a este recurso",
            );
        }

        if (!response) {
            console.error("Error de red o servidor no disponible");
        }

        return Promise.reject(error);
    },
);

export default helpdeskApi;

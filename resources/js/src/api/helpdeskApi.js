import axios from "axios";
import { getEnv } from "../helpers/getEnv";

const { VITE_APP_URL } = getEnv();

// Crear una instancia de Axios
const helpdeskApi = axios.create({
    baseURL: VITE_APP_URL,
    withCredentials: true, // Asegúrate de que Axios envíe las cookies con cada solicitud
});

// Interceptor para agregar los encabezados necesarios
helpdeskApi.interceptors.request.use(async (config) => {
    // Verificar si ya se ha obtenido el token CSRF
    if (!document.cookie.includes('XSRF-TOKEN')) {
        await axios.get(`${VITE_APP_URL}/sanctum/csrf-cookie`, {
            withCredentials: true, // Esto es importante para Sanctum
        });
    }

    // Agregar encabezado de autorización si existe el token en localStorage
    const token = localStorage.getItem("auth_token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    // Agregar cualquier otro encabezado necesario
    config.headers.Accept = "application/json";

    return config;
}, (error) => {
    return Promise.reject(error);
});

export default helpdeskApi;



/* import axios from "axios";
import { getEnv } from "../helpers/getEnv";

const { VITE_APP_URL } = getEnv();

const helpdeskApi = axios.create({
    baseURL: VITE_APP_URL,
});

helpdeskApi.interceptors.request.use((config) => {
    config.headers = {
        ...config.headers,
        Accept: "application/json",
        Authorization: "Bearer " + localStorage.getItem("auth_token"),
    };
    return config;
});

export default helpdeskApi;
 */

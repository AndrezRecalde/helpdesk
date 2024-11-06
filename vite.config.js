import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [
        laravel({
            input: ["resources/sass/app.scss", "resources/js/app.js"],
            refresh: true,
        }),
        react(),
    ],
    build: {
        chunkSizeWarningLimit: 1000, // Ajusta según sea necesario
        rollupOptions: {
            output: {
                manualChunks(id) {
                    // Dividir las bibliotecas relacionadas con React en un solo chunk
                    if (
                        id.includes("node_modules/react") ||
                        id.includes("node_modules/react-dom")
                    ) {
                        return "react-vendor";
                    }

                    // Mantine y sus módulos asociados en un solo chunk
                    if (id.includes("node_modules/@mantine")) {
                        return "mantine-vendor";
                    }

                    // Bibliotecas de @tiptap
                    if (id.includes("node_modules/@tiptap")) {
                        return "tiptap-vendor";
                    }

                    // Librerías de Redux
                    if (
                        id.includes("node_modules/@reduxjs/toolkit") ||
                        id.includes("node_modules/react-redux") ||
                        id.includes("node_modules/redux")
                    ) {
                        return "redux-vendor";
                    }

                    // Dividir las bibliotecas de gráficos
                    if (
                        id.includes("node_modules/chart.js") ||
                        id.includes("node_modules/react-chartjs-2")
                    ) {
                        return "chart-vendor";
                    }

                    // Dividir las dependencias de utilidades como clsx, axios, etc.
                    if (
                        id.includes("node_modules/clsx") ||
                        id.includes("node_modules/axios") ||
                        id.includes("node_modules/dayjs")
                    ) {
                        return "utils-vendor";
                    }

                    // Dividir cualquier otro módulo de terceros en un chunk 'vendor' genérico
                    if (id.includes("node_modules")) {
                        return "vendor";
                    }
                    // Agrupa todos los hooks en un chunk separado
                    if (id.includes("src/hooks")) {
                        return "hooks";
                    }
                    // Agrupa todos los componentes en un chunk separado
                    if (id.includes("src/components")) {
                        return "components";
                    }
                    // Agrupa todas las páginas en un chunk separado
                    if (id.includes("src/pages")) {
                        return "pages";
                    }
                    // Agrupa el store de Redux en otro chunk separado
                    if (id.includes("src/store")) {
                        return "store";
                    }
                    return null;
                },
            },
        },
    },
});

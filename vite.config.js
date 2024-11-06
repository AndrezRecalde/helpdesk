import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel({
            input: [
                'resources/sass/app.scss',
                'resources/js/app.js',
            ],
            refresh: true,
        }),
        react(),
    ],
    build: {
        chunkSizeWarningLimit: 1000, // Ajusta según sea necesario
        rollupOptions: {
            output: {
                manualChunks(id) {
                    if (id.includes('node_modules')) {
                        if (id.includes('react') || id.includes('react-dom')) {
                            return 'react-vendor'; // Asegura que React y React-DOM estén juntos
                        }
                        /* if (id.includes('@mantine') || id.includes('@emotion')) {
                            return 'mantine-vendor'; // Mantine y su dependencia
                        } */
                        /* if (id.includes('axios')) {
                            return 'axios-vendor'; // Axios en su propio chunk
                        } */
                        return 'vendor'; // Módulos adicionales
                    }
                    // Agrupa todos los hooks en un chunk separado
                    if (id.includes('src/hooks')) {
                        return 'hooks';
                    }
                    // Agrupa todos los componentes en un chunk separado
                    if (id.includes('src/components')) {
                        return 'components';
                    }
                    // Agrupa todas las páginas en un chunk separado
                    if (id.includes('src/pages')) {
                        return 'pages';
                    }
                    // Agrupa el store de Redux en otro chunk separado
                    if (id.includes('src/store')) {
                        return 'store';
                    }
                    return null;
                },
            },
        },
    },
});

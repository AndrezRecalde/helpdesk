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
                        // Agrupa React y React-DOM juntos
                        if (id.includes('react') || id.includes('react-dom')) {
                            return 'react-vendor';
                        }
                        // Agrupa Mantine y sus dependencias relacionadas
                        if (id.includes('@mantine') || id.includes('@emotion')) {
                            return 'mantine-vendor';
                        }
                        // Mantén el resto de las dependencias de terceros en su propio chunk
                        return 'vendor';
                    }
                    // Agrupa todos los hooks en un chunk separado
                    if (id.includes('src/hooks')) {
                        return 'hooks';
                    }
                    // Agrupa todos los components en un chunk separado
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
                },
            },
        },
    },
});

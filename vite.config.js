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
    optimizeDeps: {
        entries: ['resources/js/app.js'], // Archivos de entrada de tu aplicación
        manualChunks(id) {
            if (id.includes('node_modules')) {
                return 'vendor'; // Agrupa módulos de node_modules en un fragmento separado
            }
        },
    },
});

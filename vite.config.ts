import path from 'path'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
    preview: {
        port: 3000,
    },
    server: {
        port: 3000,
        hmr: {
            clientPort: 443,
        },
    },
})

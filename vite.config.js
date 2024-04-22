import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        VitePWA({
            registerType: 'autoUpdate',
            injectRegister: 'auto',
            manifest: {
                name: 'Personal AniList',
                short_name: 'PAL',
                description: 'Crea tus listas de animes y personajes favoritos con nuestra aplicación web.',
                theme_color: '#212529',
                icons: [
                    {
                        src: '/android-launchericon-144-144.png',
                        sizes: '144x144',
                        type: 'image/png'
                    },
                    {
                        src: '/android-launchericon-192-192.png',
                        sizes: '192x192',
                        type: 'image/png'
                    },
                    {
                        src: '/android-launchericon-512-512.png',
                        sizes: '512x512',
                        type: 'image/png'
                    },
                    {
                        src: '/android-launchericon-512-512.png',
                        sizes: '512x512',
                        type: 'image/png',
                        purpose: 'any'
                    },
                    {
                        src: '/android-launchericon-512-512.png',
                        sizes: '512x512',
                        type: 'image/png',
                        purpose: 'maskable'
                    },
                ],
                display: 'standalone',
                background_color: '#212529',
                start_url: '.',
                orientation: 'portrait',
            }
        })
    ],
})

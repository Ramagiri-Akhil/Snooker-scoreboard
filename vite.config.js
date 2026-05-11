import { defineConfig }
from "vite";

import react
from "@vitejs/plugin-react";

import tailwindcss
from "@tailwindcss/vite";

import { VitePWA }
from "vite-plugin-pwa";

export default defineConfig({

  plugins: [

    react(),

    tailwindcss(),

    VitePWA({

      registerType:
        "autoUpdate",

      injectRegister:
        "auto",

      devOptions: {
        enabled: true,
      },

      manifest: {

        name:
          "Snooker Scoreboard",

        short_name:
          "Snooker",

        description:
          "Professional Snooker Scoreboard App",

        theme_color:
          "#0b1014",

        background_color:
          "#0b1014",

        display:
          "standalone",

        orientation:
          "portrait",

        start_url: "/",

        scope: "/",

        icons: [

          {
            src: "/pwa-192.png",
            sizes: "192x192",
            type: "image/png",
          },

          {
            src: "/pwa-512.png",
            sizes: "512x512",
            type: "image/png",
          },

          {
            src: "/pwa-512.png",
            sizes: "512x512",
            type: "image/png",
            purpose:
              "maskable",
          },
        ],
      },

      screenshots: [

  {
    src: "/mobile-preview.png",

    sizes: "540x720",

    type: "image/png",

    form_factor: "narrow",

    label:
      "Mobile View",
  },

  {
    src: "/desktop-preview.png",

    sizes: "1280x720",

    type: "image/png",

    form_factor: "wide",

    label:
      "Desktop View",
  },
],

      workbox: {

globPatterns: [
  "**/*.{js,css,html,png,svg,ico,mp3,wav}"
],
      },
    }),
  ],
});
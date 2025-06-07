// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";
export default defineNuxtConfig({
  app: {
    head: {
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.png" }],
    },
  },
  future: { compatibilityVersion: 4 },
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  devServer: {
    port: 3000,
    host: "0.0.0.0",
    https: {
      key: "../la7media.test+3-key.pem",
      cert: "../la7media.test+3.pem",
    },
  },

  css: ["~/assets/css/main.css", "leaflet/dist/leaflet.css"],
  vite: {
    plugins: [tailwindcss()],
  },
  supabase: {
    redirect: false,
    clientOptions: {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    },
  },
  modules: [
    "@nuxt/eslint",
    "shadcn-nuxt",
    "@nuxtjs/supabase",
    "@nuxtjs/leaflet",
    "@nuxtjs/turnstile",
  ],
  turnstile: {
    siteKey: "0x4AAAAAABgPMyVOvsDnioqa",
  },
});

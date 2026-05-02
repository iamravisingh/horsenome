import { defineConfig } from "vite";
import wyw from "@wyw-in-js/vite";
import react from "@vitejs/plugin-react";
import { siteConfig, siteMetadata } from "./src/config/site";

// https://vite.dev/config/
export default defineConfig({
  server: {
    host: "localhost",
    port: 3000,
  },
  preview: {
    host: "localhost",
    port: 3000,
  },
  plugins: [
    {
      name: "horsenome-html-metadata",
      transformIndexHtml(html) {
        return html
          .replace(/__SITE_TITLE__/g, siteConfig.title)
          .replace(/__SITE_NAME__/g, siteConfig.name)
          .replace(/__SITE_DESCRIPTION__/g, siteConfig.description)
          .replace(/__SITE_CANONICAL_URL__/g, siteMetadata.canonicalUrl)
          .replace(/__SITE_OG_IMAGE_URL__/g, siteMetadata.ogImageUrl)
          .replace(/__SITE_THEME_COLOR__/g, siteConfig.themeColor)
          .replace(/__SITE_TWITTER_CARD__/g, siteConfig.twitterCard);
      },
    },
    react(),
    wyw({
      include: ["**/*.{ts,tsx}"],
      babelOptions: {
        presets: ["@babel/preset-typescript", "@babel/preset-react"],
      },
    }),
  ],
});

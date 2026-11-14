import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import {
  assetHeaders,
  buildHeadersFile,
  cspMeta,
  cspPreview,
  imageHeaders,
  securityHeaders,
} from './security-headers';

/**
 * Applies the policy in security-headers.ts everywhere it is needed:
 *  - build:   writes dist/_headers (Cloudflare Pages) and adds a CSP <meta> tag
 *  - preview: sends the same headers from `npm run preview`
 * The dev server (`npm run dev`) is left alone — hot-reloading needs inline
 * scripts that the production policy rightly forbids.
 */
function securityHeadersPlugin(): Plugin {
  return {
    name: 'workout-world-security-headers',

    transformIndexHtml: {
      order: 'post',
      handler(html, ctx) {
        if (ctx.server) return html; // dev server: no CSP
        return {
          html,
          tags: [
            {
              tag: 'meta',
              attrs: {
                'http-equiv': 'Content-Security-Policy',
                content: cspMeta,
              },
              injectTo: 'head-prepend',
            },
          ],
        };
      },
    },

    generateBundle() {
      this.emitFile({
        type: 'asset',
        fileName: '_headers',
        source: buildHeadersFile(),
      });
    },

    configurePreviewServer(server) {
      server.middlewares.use((req, res, next) => {
        const headers: Record<string, string> = {
          ...securityHeaders,
          'Content-Security-Policy': cspPreview,
        };
        // HSTS is meaningless (and unhelpful) on http://localhost
        delete headers['Strict-Transport-Security'];
        if (req.url?.startsWith('/assets/')) Object.assign(headers, assetHeaders);
        if (req.url?.startsWith('/images/') || req.url === '/og-image.jpg') {
          Object.assign(headers, imageHeaders);
        }
        for (const [name, value] of Object.entries(headers)) {
          res.setHeader(name, value);
        }
        next();
      });
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), securityHeadersPlugin()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    // Only listen on this computer while developing (not the whole network).
    host: 'localhost',
  },
  preview: {
    host: 'localhost',
  },
  build: {
    target: 'es2019',
    outDir: 'dist',
    assetsDir: 'assets',
    // No source maps in production: the original source is not published.
    sourcemap: false,
    chunkSizeWarningLimit: 1500,
    rollupOptions: {
      output: {
        manualChunks: {
          // Split the heavy 3D stack into its own chunk so the rest of the
          // app loads fast and the 3D code can be dynamically imported.
          three: ['three'],
          r3f: ['@react-three/fiber', '@react-three/drei'],
          motion: ['framer-motion'],
          gsap: ['gsap'],
        },
      },
    },
  },
});

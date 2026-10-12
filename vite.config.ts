import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
export default defineConfig({
  plugins: [react()],
  build: {
    target: 'es2022',
    rollupOptions: {
      output: {
        onlyExplicitManualChunks: true,
        manualChunks(id) {
          // Include implementation subpaths (not just package entry wrappers).
          // Otherwise Rollup may put shared React CJS code in the lazy engine chunk.
          if (
            /\/node_modules\/(react|react-dom|scheduler)\//.test(id) ||
            id.includes('commonjsHelpers')
          )
            return 'react-runtime';
          if (/\/node_modules\/(three|@react-three)\//.test(id)) return 'three-engine';
        },
      },
    },
  },
});

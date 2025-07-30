// vite.config.js
import { defineConfig } from 'vite'
import copy from 'rollup-plugin-copy'
import { minify } from 'terser'

export default defineConfig({
  root: 'src',
  build: {
    outDir: '../build',
    emptyOutDir: true,
  },
  plugins: [
    copy({
      // The `hook` property specifies when the plugin should run. 'writeBundle' runs after the bundle is generated.
      hook: 'writeBundle',
      targets: [
        {
          src: 'src/base-element.js', // The specific file you want to minify
          dest: 'dist',                   // The destination folder
          
          // The transform function minifies the file's content
          transform: async (contents) => {
            const result = await minify(contents.toString());
            return result.code; // Return the minified code
          },
          
          // Optionally, you can rename the output file
          rename: 'base-element.min.js',
        },
        {
          src: 'src/base-element.js', // The specific file you want to minify
          dest: 'dist',                   // The destination folder
        },
      ],
    }),
  ],
});
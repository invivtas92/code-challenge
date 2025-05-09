import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig(({ mode }) => {
  const generateScopedName = mode === 'production' ? '[hash:base64:5]' : '[path]_[local]_[hash:base64:5]';
  
  return {
    envDir: './env',
    plugins: [
      react(),
      tsconfigPaths({
        projects: ['tsconfig.app.json']
      })
    ],
    css: {
      preprocessorOptions: {
        scss: {
          api: "modern"
        }
      },
      modules: {
        localsConvention: 'camelCase',
        generateScopedName
      }
    }
  }
})

import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vite.dev/config/
// trailing slash is important for the base path to work correctly
export default defineConfig({
  plugins: [react()],
  base: '/~aurila/WSK25/week5/custom_hooks/',
});

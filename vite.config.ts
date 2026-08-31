/// <reference types="vitest" />
import { defineConfig } from 'vite';
import { resolve } from 'path';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	test: {
		environment: 'jsdom',
	},
	build: {
		lib: {
			entry: resolve(__dirname, 'src/index.tsx'),
			name: 'React Material Symbols',
			formats: ['es', 'umd'],
			fileName: (format) => `index.${format}.js`,
		},
		rollupOptions: {
			// React is a peer dependency, so it must never be bundled into the library.
			// Without this, the copy of React installed at build time is shipped to every
			// consumer alongside their own.
			external: ['react', 'react-dom', 'react/jsx-runtime'],
			output: {
				globals: {
					react: 'React',
					'react-dom': 'ReactDOM',
					'react/jsx-runtime': 'jsxRuntime',
				},
			},
		},
	},
});

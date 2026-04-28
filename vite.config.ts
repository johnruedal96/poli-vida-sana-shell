import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import federation from '@originjs/vite-plugin-federation'

const mfNutritionUrl = process.env.VITE_MF_NUTRITION_URL || 'http://localhost:3001/assets/remoteEntry.js'
const mfExerciseUrl = process.env.VITE_MF_EXERCISE_URL || 'https://poli-vida-sana-mf-exercise.vercel.app/assets/remoteEntry.js'
const mfMetricsUrl = process.env.VITE_MF_METRICS_URL || 'https://poli-vida-sana-mf-metrics.vercel.app/assets/remoteEntry.js'

console.log({mfNutritionUrl})

export default defineConfig({
  plugins: [
    react(), 
    tailwindcss(),
    federation({
      name: 'shell',
      filename: 'remoteEntry.js',
      remotes: {
        'mf-nutrition': mfNutritionUrl,
        'mf-exercise': mfExerciseUrl,
        'mf-metrics': mfMetricsUrl,
      },
      shared: ['react', 'react-dom', 'zustand', 'recharts', 'react-router-dom'],
    }),
  ],
  build: { target: 'esnext' }
})
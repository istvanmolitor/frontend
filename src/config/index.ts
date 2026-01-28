export const config = {
  SERVER_URL: import.meta.env.VITE_SERVER_URL || 'http://127.0.0.1:8000',
} as const

export default config

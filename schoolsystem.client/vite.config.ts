import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import fs from 'fs'
import path from 'path'
import child_process from 'child_process'
import { env } from 'process'

const baseFolder =
  env.APPDATA !== undefined && env.APPDATA !== '' ? `${env.APPDATA}/ASP.NET/https` : `${env.HOME}/.aspnet/https`

const certificateName = 'schoolsystem.client'
const certFilePath = path.join(baseFolder, `${certificateName}.pem`)
const keyFilePath = path.join(baseFolder, `${certificateName}.key`)

if (!fs.existsSync(certFilePath) || !fs.existsSync(keyFilePath)) {
  if (
    0 !==
    child_process.spawnSync(
      'dotnet',
      ['dev-certs', 'https', '--export-path', certFilePath, '--format', 'Pem', '--no-password'],
      { stdio: 'inherit' },
    ).status
  ) {
    throw new Error('Could not create certificate.')
  }
}

const target = env.ASPNETCORE_HTTPS_PORT
  ? `https://localhost:${env.ASPNETCORE_HTTPS_PORT}`
  : env.ASPNETCORE_URLS
    ? env.ASPNETCORE_URLS.split(';')[0]
    : 'https://localhost:7045'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@assets': fileURLToPath(new URL('./src/assets', import.meta.url)),
      '@components': fileURLToPath(new URL('./src/components', import.meta.url)),
      '@hooks': fileURLToPath(new URL('./src/hooks', import.meta.url)),
      '@router': fileURLToPath(new URL('./src/router', import.meta.url)),
      '@actions': fileURLToPath(new URL('./src/actions', import.meta.url)),
      '@app': fileURLToPath(new URL('./src/app', import.meta.url)),
    },
  },
  server: {
    proxy: {
      '^/api': {
        target,
        secure: false,
      },
    },
    port: 5173,
    https: {
      key: fs.readFileSync(keyFilePath),
      cert: fs.readFileSync(certFilePath),
    },
  },
})

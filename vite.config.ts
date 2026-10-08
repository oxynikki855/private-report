import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import { execFile } from 'node:child_process'
import { createServer } from 'node:net'
import { promisify } from 'node:util'

const execFileAsync = promisify(execFile)
const forecastDirectory = '/mnt/e/AP02-demand-forecast/frontend'
const worldMonitorDirectory = '/home/oxynikki/projects/worldmonitor'
const forecastPort = 4174
const worldMonitorPort = 3333

async function listening(port: number) {
  return await new Promise<boolean>((resolve) => {
    const server = createServer()
    server.once('error', () => resolve(true))
    server.once('listening', () => server.close(() => resolve(false)))
    server.listen(port, '127.0.0.1')
  })
}

async function waitUntilListening(port: number) {
  for (let attempt = 0; attempt < 30; attempt += 1) {
    if (await listening(port)) return
    await new Promise((resolve) => setTimeout(resolve, 250))
  }
  throw new Error(`service on port ${port} did not start`)
}

async function start(command: string, directory: string, port: number) {
  if (await listening(port)) return
  await execFileAsync('bash', ['-lc', `nohup ${command} > /home/oxynikki/.claude/jobs/50c425d0/tmp/${port}.log 2>&1 &`], { cwd: directory })
  await waitUntilListening(port)
}

function localForecastDemo(): Plugin {
  const handle = async (request: { method?: string; url?: string }, response: { statusCode: number; setHeader(name: string, value: string): void; end(content?: string): void }) => {
    if (request.method !== 'POST') { response.statusCode = 405; response.end(); return }
    const target = request.url?.includes('worldmonitor')
      ? { command: 'npm run dev -- --host 127.0.0.1 --port 3333', directory: worldMonitorDirectory, port: worldMonitorPort }
      : { command: 'npm run dev -- --host 127.0.0.1 --port 4174', directory: forecastDirectory, port: forecastPort }
    try {
      await start(target.command, target.directory, target.port)
      response.setHeader('content-type', 'application/json')
      response.end(JSON.stringify({ url: `http://127.0.0.1:${target.port}` }))
    } catch {
      response.statusCode = 500
      response.setHeader('content-type', 'application/json')
      response.end(JSON.stringify({ error: 'local demo service could not be started' }))
    }
  }

  return {
    name: 'local-forecast-demo',
    configureServer(server) { server.middlewares.use('/__local-demo/', handle) },
    configurePreviewServer(server) { server.middlewares.use('/__local-demo/', handle) },
  }
}

export default defineConfig({
  server: { host: '127.0.0.1', port: 4200, strictPort: true },
  preview: { host: '127.0.0.1', port: 4173, strictPort: true },
  plugins: [react(), localForecastDemo()],
})

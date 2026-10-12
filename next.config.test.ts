import { afterEach, describe, expect, it, vi } from 'vitest'

async function configuration(origin: string) {
  vi.stubEnv('MEDIKA_DEMO_ORIGIN', origin)
  vi.resetModules()
  return (await import('./next.config')).default
}

afterEach(() => { vi.unstubAllEnvs() })

describe('Medika external rewrites', () => {
  it('supports standalone development without an origin', async () => {
    expect(await (await configuration('')).rewrites!()).toEqual([])
  })

  it('proxies the entry point and all child routes without exposing the origin as browser env', async () => {
    const config = await configuration(' https://child.example/// ')
    expect(await config.rewrites!()).toEqual({ beforeFiles: [
      { source: '/medika', destination: 'https://child.example/medika' },
      { source: '/medika/:path*', destination: 'https://child.example/medika/:path*' },
    ] })
    expect(config.env).toBeUndefined()
    expect(config.redirects).toBeUndefined()
  })

  it('supports a separate local child server', async () => {
    const rewrites = await (await configuration('http://localhost:3010/')).rewrites!()
    expect(rewrites).toMatchObject({ beforeFiles: [
      { destination: 'http://localhost:3010/medika' },
      { destination: 'http://localhost:3010/medika/:path*' },
    ] })
  })

  it.each(['https://child.example/medika', 'https://child.example/?secret=x',
    'https://user:password@child.example', 'ftp://child.example', 'https://child.example/#x'])
  ('rejects values that are not a bare HTTP(S) origin: %s', async origin => {
    await expect(configuration(origin)).rejects.toThrow('MEDIKA_DEMO_ORIGIN')
  })
})

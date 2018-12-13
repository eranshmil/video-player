export function isDevMode(): boolean {
  return process.env.ELECTRON_SERVE === 'true';
}

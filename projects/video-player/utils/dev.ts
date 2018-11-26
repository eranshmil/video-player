export function isDevMode(): boolean {
  return process.argv.includes('--serve');
}

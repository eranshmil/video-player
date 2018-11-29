import * as url from 'url';

export const ALLOWED_EXTENSIONS = ['mp4', 'm4v', 'ogv', 'webm', 'vtt'];

export function createLocalUrl(pathname: string): string {
  return url.format({
    pathname,
    protocol: 'file:'
  });
}

import * as url from 'url';

export function createLocalUrl(pathname: string): string {
  return url.format({
    pathname,
    protocol: 'file:'
  });
}

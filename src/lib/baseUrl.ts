/**
 * Archive paths inside the app are always "logical" root-relative paths ("/activity/13thquanwen.htm").
 * When the site is hosted under a sub-path (GitHub project pages: https://user.github.io/<repo>/), Vite's
 * `base` is "/<repo>/". These helpers convert between the two at every network / DOM boundary.
 */
const BASE = import.meta.env.BASE_URL.replace(/\/+$/, '');   // "" at the root, "/<repo>" under a sub-path

/** logical archive path -> real URL path ("/activity/x.htm" -> "/<repo>/activity/x.htm"). Hash/query are kept. */
export const withBase = (path: string): string =>
  BASE && path.startsWith('/') && !path.startsWith(BASE + '/') ? BASE + path : path;

/** real URL pathname -> logical archive path ("/<repo>/activity/x.htm" -> "/activity/x.htm"). */
export const stripBase = (pathname: string): string =>
  BASE && (pathname === BASE || pathname.startsWith(BASE + '/')) ? pathname.slice(BASE.length) || '/' : pathname;

import { interpolate } from './interpolate';

/**
 * Creates a route path by interpolating parameters and optionally appending a query string.
 *
 * @param {string[]} routes - An array of route segments to form the path.
 * @param {{ [key: string]: string | number }} [params={}] - An object containing key-value pairs for route interpolation and query parameters.
 * @returns {string} The generated route path with interpolated parameters and an optional query string.
 */
export function createRoute(
  routes: string[],
  params: { [key: string]: string | number } = {}
): string {
  const routePath = interpolate(routes.join('/'), params);

  if (params.year) {
    const queryString = Object.keys(params)
      .map(
        (key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
      )
      .join('&');

    return queryString ? `${routePath}?${queryString}` : routePath;
  }

  return routePath;
}

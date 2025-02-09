import { createRoute } from './route';
import { buildUrl } from './string';

/**
 * Generates a shareable link for a given route with dynamic parameters.
 *
 * @param {string[]} routeSegments - An array of route segments to construct the URL.
 * @param {{ [key: string]: string | number }} params - An object containing dynamic parameters for route interpolation.
 * @returns {string} The generated shareable URL.
 */
export const generateShareableLink = (
  routeSegments: string[],
  params: { [key: string]: string | number }
): string => {
  const baseUrl = window.location.origin;

  return buildUrl(createRoute([baseUrl, ...routeSegments], params));
};

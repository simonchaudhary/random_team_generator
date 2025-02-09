/**
 * Build supplied string by interpolating properties after delimiter(':') with the given parameters.
 *
 * @example
 * interpolate('/posts/:id', {id: 1})
 * => '/posts/1'
 *
 */
export function interpolate(
  str: string,
  params: { [key: string]: string | number }
): string {
  let url = str;
  Object.keys(params).forEach((key) => {
    url = url.replaceAll(`:${key}`, `${params[key]}`);
  });

  return url;
}

/**
 * get required parameters from string as given by  delimiter(':').
 *
 * @example
 * unInterpolate('/posts/:id','/posts/1')
 * => {id: 1}
 *
 */
export function unInterpolate(route: string, url: string) {
  const stencil = route.replaceAll(/:(.*?)(?:\/|$)/g, '(?<$1>.*?)(?:/|$)');
  const pattern = new RegExp(stencil);
  const matches = url.match(pattern);
  return matches?.groups;
}

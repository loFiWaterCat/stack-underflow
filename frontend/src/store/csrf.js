const csrfFetch = async (url, options = {}) => {
  // Default to get if none provided
  options.method = options.method || 'GET';

  // Default to empty headers if none provided
  options.headers = options.headers || {};

  // default content-type to application/json and set csrf token
  if (options.method.toUpperCase() !== 'GET') {
    options.headers['Content-Type'] = 
      options.headers['Content-Type'] || 'application/json';
    options.headers['X-CSRF-Token'] = sessionStorage.getItem('X-CSRF-Token');
  }

  // call fetch with url and updated options hash
  const res = await fetch(url, options);

  // if res status code is 400 or above, throw error
  if (res.status >= 400) throw res;

  // if the res status code is under 400, return response to next promise chain
  return res;
}

export const storeCSRFToken = (response) => {
  const csrfToken = response.headers.get("X-CSRF-Token");
  if (csrfToken) {
    sessionStorage.setItem("X-CSRF-Token", csrfToken);
  }
}

export const restoreCSRF = async () => {
  const response = await csrfFetch("/api/session");
  storeCSRFToken(response);
  return response
}

export default csrfFetch;

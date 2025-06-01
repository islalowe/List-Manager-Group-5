class APILibrary {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  buildURL(endpoint, queryParams) {
    let url = `${this.baseURL}${endpoint}`;
    if (queryParams) {
      url += `?${queryParams}`;
    }
    return url;
  }

  async request(method, endpoint, queryParams = '', body = null) {
    const url = this.buildURL(endpoint, queryParams);

    const options = {
      method,
      headers: { 'Content-Type': 'application/json' }
    };

    if (body && ['POST', 'PUT', 'PATCH'].includes(method.toUpperCase())) {
      if (typeof body === 'string') {
        options.body = body;
      } else {
        options.body = JSON.stringify(body);
      }
    }

    try {
      const response = await fetch(url, options);
      const contentType = response.headers.get('content-type');

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      if (contentType && contentType.includes('application/json')) {
        return await response.json();
      } else {
        return await response.text();
      }
    } catch (err) {
      throw new Error(`Request failed: ${err.message}`);
    }
  }
}
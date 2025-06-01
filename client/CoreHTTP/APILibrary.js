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

    console.log("Sending request to:", url); // Debug log

    const options = {
      method,
      headers: { 'Content-Type': 'application/json' }
    };

    if (body && ['POST', 'PUT', 'PATCH'].includes(method.toUpperCase())) {
      // If body is already an object, keep it; otherwise try parsing it
      if (typeof body === 'object') {
        options.body = JSON.stringify(body);
      } else {
        try {
          options.body = JSON.stringify(JSON.parse(body));
        } catch (e) {
          throw new Error('Invalid JSON in request body');
        }
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
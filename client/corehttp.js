// Constructor to create an XHR object
class coreHTTP {

    /* <<< HTTP GET request >>> */
    async get(url) {
      const requestOptions = {
        method: "GET",
        headers: {"Content-Type": "application/json"}
      };
      const response = await fetch(url, requestOptions);
      if (response.ok) {
        const responseData = await response.json();
        return (responseData);
      } else {
        return (Promise.reject(response.status));
      }
    }
    
    /* <<< HTTP POST request >>> */
    async post(url, requestData) {
      const reqOptions = {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(requestData)};
      const response = await fetch(url, reqOptions);
      if (response.ok) {
        const responseData = await response.json();
        return responseData;
      } else {
        return (Promise.reject(response.status));
      }
    }
    
    /* <<< HTTP PUT request >>> */
    async put(url, requestData) {
      const reqOptions = {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(requestData)};
      const response = await fetch(url, reqOptions);
      if (response.ok) {
        const responseData = await response.json();
        return (responseData);
      } else {
        return (Promise.reject(response.status));
      }
    }
  
    async delete(url) {
      const reqOptions = {
        method: "DELETE",
        headers: {"Content-Type": "application/json"}};
        const response = await fetch(url, reqOptions);
        if (response.ok) {
          return ({});
        } else {
          return (Promise.reject(response.status));
        }
    }
  }



  // class APILibrary {
  //   constructor(baseURL) {
  //     this.baseURL = baseURL;
  //   }
  
  //   buildURL(endpoint, queryParams) {
  //     let url = `${this.baseURL}${endpoint}`;
  //     if (queryParams) {
  //       url += `?${queryParams}`;
  //     }
  //     return url;
  //   }
  
  //   async request(method, endpoint, queryParams = '', body = null) {
  //     const url = this.buildURL(endpoint, queryParams);
  //     const options = {
  //       method,
  //       headers: { 'Content-Type': 'application/json' }
  //     };
  
  //     if (body && ['POST', 'PUT', 'PATCH'].includes(method.toUpperCase())) {
  //       try {
  //         options.body = JSON.stringify(JSON.parse(body));
  //       } catch (e) {
  //         throw new Error('Invalid JSON in request body');
  //       }
  //     }
  
  //     try {
  //       const response = await fetch(url, options);
  //       const contentType = response.headers.get('content-type');
  
  //       if (!response.ok) {
  //         throw new Error(`HTTP error! Status: ${response.status}`);
  //       }
  
  //       if (contentType && contentType.includes('application/json')) {
  //         return await response.json();
  //       } else {
  //         return await response.text();
  //       }
  //     } catch (err) {
  //       throw new Error(`Request failed: ${err.message}`);
  //     }
  //   }
  // }
  
  // const api = new APILibrary("https://api.allorigins.win/raw?url=https://jsonplaceholder.typicode.com");
  
  // document.getElementById("send").addEventListener("click", async () => {
  //   const method = document.getElementById("method").value;
  //   const endpoint = document.getElementById("endpoint").value.trim();
  //   const query = document.getElementById("query").value.trim();
  //   const body = document.getElementById("body").value.trim();
  //   const responseBox = document.getElementById("response");
  
  //   responseBox.textContent = "Loading...";
  
  //   try {
  //     const result = await api.request(method, endpoint, query, body);
  //     responseBox.textContent = JSON.stringify(result, null, 2);
  //   } catch (err) {
  //     responseBox.textContent = `Error: ${err.message}`;
  //   }
  // });
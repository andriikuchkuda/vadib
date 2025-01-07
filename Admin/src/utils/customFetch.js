const customFetch = async (endpoint, method="GET", body) => {
  const url = process.env.REACT_APP_BASE_URL + endpoint;

  const headers = {
    "Content-Type" : "application/json"
  }

  const option = {
    method : method,
    headers,
    body : method === "POST" || method === "PUT" ? JSON.stringify(body) : null
  };
  
  const response = await fetch(url, option);

  if (!response.ok) {
    if (response.status === 401) {
      console.error('Authentication error. Please log in again.');
    }
    throw new Error(`Fetch error: ${response.statusText}`);
  }

  const data = await response.json();
  return data;
}

export default customFetch;
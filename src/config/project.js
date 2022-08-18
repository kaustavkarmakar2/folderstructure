const getApiUrl = (origin) => {
    if (origin.includes("localhost") || origin.includes("dev")) {
      return "http://localhost:8080/fs?path";
    }
  
    return "http://localhost:8080/fs?path";
  };
  
  const SERVER_API_URL = getApiUrl(window.location.origin);
  
  const variables = {
    SERVER_API_URL
  };
  export default variables;
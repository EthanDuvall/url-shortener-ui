export const getUrls = () => {
  return fetch("http://localhost:3001/api/v1/urls")
    .then((response) => {
      if (!response.ok) {
        console.error(response);
      } else {
        return response.json();
      }
    })
    .then((data) => {
      return data;
    })
    .catch((err) => console.error(err));
};

export const addUrl = (title, url) => {
  return fetch("http://localhost:3001/api/v1/urls", {
    method: "POST",
    body:JSON.stringify({
      long_url: url,
      title,
    }),
    headers: {
      "Content-type": "application/json"
    },
  })
    .then((response) => {
      if (!response.ok) {
        console.error(response);
      } else {
        return response.json();
      }
    })
    .then((data) => {
      return data;
    })
    .catch((err) => console.error(err));
};

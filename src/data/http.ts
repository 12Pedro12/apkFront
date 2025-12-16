export const API_URL = "http://192.168.100.54:8000/";

export const http = async (url: string, options: RequestInit = {}) => {
  const res = await fetch(`${API_URL}${url}`, {
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  });

  return res.json();
};


const API_URL = "/api/todos";

async function apiRequest(url = API_URL, options = {}) {
  const response = await fetch(url, {
    ...options,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    const errors = data?.errors
      ? Object.values(data.errors).flat().join(" ")
      : "";

    throw new Error(
      errors || data?.message || `Request failed: ${response.status}`
    );
  }

  return data;
}

export const getTodos = () => apiRequest();

export const createTodo = (todo) =>
  apiRequest(API_URL, {
    method: "POST",
    body: JSON.stringify(todo),
  });

export const updateTodo = (id, todo) =>
  apiRequest(`${API_URL}/${id}`, {
    method: "PATCH",
    body: JSON.stringify(todo),
  });

export const deleteTodo = (id) =>
  apiRequest(`${API_URL}/${id}`, {
    method: "DELETE",
  });

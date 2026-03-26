const API_BASE = 'http://localhost:8000/api';

export const getToken = () => localStorage.getItem('token');

export const apiClient = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> => {
  const token = getToken();

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers ?? {}),
    },
  });

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message || 'Request failed');
  }

  return json;
};

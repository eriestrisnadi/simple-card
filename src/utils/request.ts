export async function request<TResponse>(
  url: string,
  config?: RequestInit
): Promise<TResponse> {
  try {
    const response = await fetch(url, config);
    return await response.json();
  } catch (error) {
    throw error;
  }
}

export default request;

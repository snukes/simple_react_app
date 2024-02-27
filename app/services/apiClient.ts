
/*
 * endpoint param must not include a '/' prefix
 */
export const get = async (endpoint: string, params?: any) => {
  const requestUrl = generateUrl(endpoint);
  console.log(`sending get request to ${requestUrl}`)
  try {
    const response = await fetch(requestUrl, params);
    return await response.json();
  } catch (error) {
    // TODO add better error handling
    throw error;
  }
}

export const post = async (endpoint: string, params?: any, data?: any) => {
  const requestUrl = generateUrl(endpoint);
  let options : RequestInit = {
    method: "POST",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    ...params
  }
  try {
    const response = await fetch(requestUrl, options);
    return await response.json();
  } catch (error) {
    // TODO add better error handling
    throw error;
  }
}

const generateUrl = (endpoint: string) => {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL ?? '';
  return `${baseUrl}/${endpoint}`
}
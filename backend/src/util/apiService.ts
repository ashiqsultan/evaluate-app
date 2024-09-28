import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { URL } from 'url';
import { RequestSchema } from '../db/schema';

function buildUrl(requestData: RequestSchema): string {
  const url = new URL(requestData.url);

  // Add query parameters
  if (requestData.queryParams) {
    for (const [key, value] of Object.entries(requestData.queryParams)) {
      url.searchParams.append(key, value);
    }
  }

  return url.toString();
}

async function apiService(requestData: RequestSchema): Promise<AxiosResponse> {
  const config: AxiosRequestConfig = {
    method: requestData.verb.toLowerCase(),
    url: buildUrl(requestData),
    headers: requestData.headers || {},
  };

  if (config.method && ['post', 'put', 'patch'].includes(config.method)) {
    config.data = requestData.body;
  }
  try {
    const axiosRequest = await axios(config);
    if (axiosRequest.status === 200 && axiosRequest.data) {
      return axiosRequest.data;
    }
    throw new Error('Error in Axios Response');
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios Error');
      console.error(error.message);
      throw new Error(error.message);
    }
    throw error;
  }
}

export default apiService;

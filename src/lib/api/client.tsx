import { API_BASE_URL } from '../../infrastructure/config';

class ApiClient {
  constructor(baseUrl = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  async request(endpoint, options = {}) {
    try {
      const token = localStorage.getItem('jwtToken');
      const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
        ...(options.headers || {})
      };
      const config = { ...options, headers, mode: 'cors' };
      const fullUrl = `${this.baseUrl}${endpoint}`;
      const response = await fetch(fullUrl, config);
      let responseData;
      try {
        responseData = await response.json();
      } catch (parseError) {
        try {
          const text = await response.text();
          responseData = text || null;
        } catch (textError) {
          responseData = null;
        }
      }
      if (response.status === 401) {
        const isBackendError = responseData && 
          (responseData.error?.includes('mapper') || 
           responseData.error?.includes('ModuleMapper') ||
           responseData.error?.includes('unnamed module'));
        if (isBackendError) {
          const error = new Error('Серверна помилка. Будь ласка, спробуйте пізніше.');
          error.status = 500;
          error.response = {
            status: 500,
            data: responseData,
            headers: response.headers ? Object.fromEntries(response.headers.entries()) : {}
          };
          throw error;
        }
        const isTokenError = responseData && (
          responseData.message === 'Token expired' || 
          responseData.message === 'Invalid token' ||
          responseData.error === 'Unauthorized' ||
          responseData === 'Token expired' ||
          responseData === 'Invalid token' ||
          responseData === 'Unauthorized' ||
          responseData.message?.includes('JWT')
        );
        if (isTokenError) {
          localStorage.removeItem('jwtToken');
          localStorage.removeItem('userRole');
          window.location.href = '/login';
        }
        const error = new Error(
          responseData?.message || 
          (typeof responseData === 'string' ? responseData : 'Authentication required')
        );
        error.status = 401;
        error.response = {
          status: 401,
          data: responseData,
          headers: response.headers ? Object.fromEntries(response.headers.entries()) : {}
        };
        throw error;
      }
      if (!response.ok) {
        const errorMessage = 
          (responseData && (responseData.message || responseData.error)) ||
          (typeof responseData === 'string' && responseData) ||
          `Request failed with status ${response.status}`;
        const error = new Error(errorMessage) as any;
        error.status = response.status;
        error.response = {
          status: response.status,
          data: responseData,
          headers: response.headers ? Object.fromEntries(response.headers.entries()) : {}
        };
        throw error;
      }
      const actualData = responseData?.data || responseData;
      return actualData;
    } catch (error) {
      const enhancedError = error;
      if (!enhancedError.status) enhancedError.status = 0;
      if (!enhancedError.response) {
        enhancedError.response = {
          status: enhancedError.status,
          data: enhancedError.message,
          headers: {}
        };
      }
      throw enhancedError;
    }
  }

  get(endpoint) {
    return this.request(endpoint);
  }

  post(endpoint, data) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }

  put(endpoint, data) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data)
    });
  }

  delete(endpoint) {
    return this.request(endpoint, {
      method: 'DELETE'
    });
  }
}

const api = new ApiClient();
export default api;


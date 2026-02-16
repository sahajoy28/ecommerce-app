import axios, { AxiosInstance, AxiosError } from "axios";

export interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

export interface ApiError {
  message: string;
  code?: string;
  status?: number;
  details?: any;
}

class ApiClient {
  private client: AxiosInstance;
  private readonly DEFAULT_TIMEOUT = 10000; // 10 seconds
  private readonly MAX_RETRIES = 3;
  private readonly RETRY_DELAY = 1000; // 1 second

  constructor(baseURL: string) {
    this.client = axios.create({
      baseURL,
      timeout: this.DEFAULT_TIMEOUT,
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Add response interceptor for error handling
    this.client.interceptors.response.use(
      response => response,
      error => this.handleError(error)
    );
  }

  /**
   * Perform GET request with retry logic
   */
  async get<T>(url: string, retries = this.MAX_RETRIES): Promise<T> {
    try {
      const response = await this.client.get<T>(url);
      return response.data;
    } catch (error) {
      if (retries > 0 && this.isRetryable(error)) {
        await this.delay(this.RETRY_DELAY);
        return this.get<T>(url, retries - 1);
      }
      throw this.transformError(error);
    }
  }

  /**
   * Perform POST request
   */
  async post<T>(url: string, data?: any): Promise<T> {
    try {
      const response = await this.client.post<T>(url, data);
      return response.data;
    } catch (error) {
      throw this.transformError(error);
    }
  }

  /**
   * Perform PUT request
   */
  async put<T>(url: string, data?: any): Promise<T> {
    try {
      const response = await this.client.put<T>(url, data);
      return response.data;
    } catch (error) {
      throw this.transformError(error);
    }
  }

  /**
   * Perform DELETE request
   */
  async delete<T>(url: string): Promise<T> {
    try {
      const response = await this.client.delete<T>(url);
      return response.data;
    } catch (error) {
      throw this.transformError(error);
    }
  }

  /**
   * Check if error is retryable
   */
  private isRetryable(error: any): boolean {
    if (!axios.isAxiosError(error)) {
      return false;
    }

    // Retry on network errors and 5xx server errors
    const status = error.response?.status;
    return !error.response || (status && status >= 500) || error.code === "ECONNABORTED";
  }

  /**
   * Transform axios error to custom ApiError
   */
  private transformError(error: any): ApiError {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      return {
        message: axiosError.message || "An error occurred",
        code: axiosError.code,
        status: axiosError.response?.status,
        details: axiosError.response?.data,
      };
    }

    return {
      message: error?.message || "An unexpected error occurred",
    };
  }

  /**
   * Handle error response
   */
  private handleError(error: any) {
    console.error("[API Error]", error);
    return Promise.reject(error);
  }

  /**
   * Utility to delay execution
   */
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Set auth token
   */
  setAuthToken(token: string) {
    this.client.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  /**
   * Clear auth token
   */
  clearAuthToken() {
    delete this.client.defaults.headers.common["Authorization"];
  }
}

// Create API client instances for different services
// Pointing to the local Node.js backend
export const productsApi = new ApiClient("http://localhost:5000/api");
export const authApi = new ApiClient("http://localhost:5000/api");

export default ApiClient;

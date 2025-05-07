export interface SubscriptionFormData {
  email: string;
}

export type FormStatus = 'idle' | 'loading' | 'success' | 'error';

export interface ApiResponse {
  success: boolean;
  message: string;
  data?: any;
}
export interface ErrorResponse {
  error: string;
}

export interface ErrorRequest {
  error: string;
  cause: {
    code?: number;
  };
}

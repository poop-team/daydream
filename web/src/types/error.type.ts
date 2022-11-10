export interface ErrorResponse extends Error {
  error: string;
  cause?: {
    code?: number;
  };
}

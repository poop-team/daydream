export interface ErrorResponse extends Error {
  cause?: {
    code: number;
  };
}

interface Error {
  cause?: unknown;
}
export interface ErrorResponse extends Error {
  cause?: {
    code: number;
    name: string;
    message: string;
  };
}
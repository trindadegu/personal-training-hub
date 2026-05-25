/** Logs the real DB error server-side and returns a generic Error for clients. */
export function dbError(error: { message?: string } | null | undefined, context?: string): Error {
  // eslint-disable-next-line no-console
  console.error(`[db-error]${context ? ` ${context}` : ""}`, error?.message ?? error);
  return new Error("Internal server error");
}
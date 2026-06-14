function dbError(error, context) {
  console.error(`[db-error]${""}`, error?.message ?? error);
  return new Error("Internal server error");
}
export {
  dbError as d
};

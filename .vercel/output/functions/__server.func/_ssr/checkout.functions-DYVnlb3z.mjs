import { c as createSsrRpc } from "./createSsrRpc-BaOR-_gw.mjs";
import { c as createServerFn } from "./server-DVxLX_uO.mjs";
import { o as objectType, e as enumType, s as stringType } from "../_libs/zod.mjs";
const createPagamentoCheckoutFn = createServerFn({
  method: "POST"
}).inputValidator((input) => objectType({
  pagamentoId: stringType().uuid(),
  returnUrl: stringType().url().max(500),
  environment: enumType(["sandbox", "live"])
}).parse(input)).handler(createSsrRpc("2f06a034265b06b69152a68bc408232e21547ec9ac87c003807e7d86393bf7ed"));
const myHasOverdueFn = createServerFn({
  method: "GET"
}).handler(createSsrRpc("6b4504be85b69592a4c7b8469f8bbe933d46dc98629a895883aa2f80a6234560"));
export {
  createPagamentoCheckoutFn as c,
  myHasOverdueFn as m
};

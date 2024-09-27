import { createApi } from "@reduxjs/toolkit/query/react";
import { extendedQuery } from "./extendedQuery.ts";

export const api = createApi({
  baseQuery: extendedQuery,
  endpoints: () => ({}),
});

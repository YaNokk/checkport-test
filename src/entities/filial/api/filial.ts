import { api } from "@/shared/api";
import { GetFilialFilialGet } from "../model";

export const { useGetFilialQuery } = api.injectEndpoints({
  endpoints: (build) => ({
    getFilial: build.query<
      GetFilialFilialGet.ResponseBody,
      GetFilialFilialGet.RequestParams
    >({
      query() {
        return "/filial/";
      },
    }),
  }),
});

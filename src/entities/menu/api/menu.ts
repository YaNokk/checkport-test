import { api } from "@/shared/api";
import { GetMenu } from "@/entities/menu/model";

export const { useGetMenuQuery } = api.injectEndpoints({
  endpoints: (build) => ({
    getMenu: build.query<
      GetMenu.ResponseBody,
      GetMenu.RequestQuery & GetMenu.RequestParams
    >({
      query({ filialId, ...rest }) {
        return {
          url: `/filial/${filialId}/menu/`,
          params: Object.fromEntries(
            Object.entries(rest).filter(([key, value]) => key && value),
          ),
        };
      },
    }),
  }),
});

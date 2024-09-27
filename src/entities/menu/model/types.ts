/* eslint-disable */
/* tslint:disable */
import {Menu, PaginatorMenu} from "@/shared/api";

export namespace GetMenu {
  export type RequestParams = {
    /** Filial Id */
    filialId: number;
  };
  export type RequestQuery = {
    /**
     * Limit
     * @default 1
     */
    limit?: number;
    /**
     * Page
     * @default 1
     */
    page?: number;
    /** Name */
    name?: string;
    /** Filial */
    filial: string;
    /** Tt */
    tt?: string;
    /** Active */
    active?: "active" | "no_active";
  };
  export type RequestBody = never;
  export type RequestHeaders = {};
  export type ResponseBody = PaginatorMenu<Menu>;
}

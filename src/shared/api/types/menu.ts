import { Branch } from "@/shared/api/types/branch.ts";
import { Filial } from "@/shared/api/types/filial.ts";

export const MenuActive = {
  active: "active",
  inactive: "no_active",
} as const;

export interface Menu {
  /**
   * ИД
   * ...
   * @exclusiveMin 0
   */
  id: number;
  /**
   * Наименование
   * ...
   * @maxLength 255
   */
  name: string;
  /** Филиал */
  filial: Filial;
  /** Торговая точка */
  tt: Branch;
  /** Активность */
  active: boolean;
  /** Экспорт */
  export: string[];
}

export interface GetMenuFilialFilialIdMenuGetParams {
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
  filial?: string;
  /** Tt */
  tt?: string;
  /** Active */
  active?: string;
  /** Filial Id */
  filialId: number;
}

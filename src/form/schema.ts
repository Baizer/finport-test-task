import type { VNode } from "vue";

export enum IFilterType {
  TEXT,
  DATE,
  DATERANGE,
  BOOLEAN
}

export enum IFilterOperator {
  EQUAL,
  ILIKE,
  RANGE
}

export interface IFilter {
    id: string;
    type: IFilterType;
    operator: IFilterOperator;
    visible: boolean
}

export interface IColumn {
    id: string;
    title: string;
    visible: boolean;
    sortable: boolean;
    value?: (data: Record<string, unknown>, column: IColumn) => VNode | string
}


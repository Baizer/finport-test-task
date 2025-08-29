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
  visible: boolean;
}

export interface IColumn {
  id: string;
  title: string;
  visible: boolean;
  sortable: boolean;
  value?: (data: Record<string, unknown>, column: IColumn) => VNode | string;
}

// Component props interfaces
export interface DatatableProps {
  columns: IColumn[];
  filters: IFilter[];
  data: any[];
}

export interface DatatableHeaderProps {
  visibleColumns: IColumn[];
  visibleFilters: IFilter[];
  showColumnSettings: boolean;
  showFiltersSettings: boolean;
}

export interface FiltersSectionProps {
  visibleFilters: IFilter[];
  visibleColumns: IColumn[];
  filtersCollapsed: boolean;
  filterValues: FilterValues;
}

export interface TableComponentProps {
  visibleColumns: IColumn[];
  paginatedData: any[];
  sortColumn: string | null;
  sortDirection: SortDirection;
  columns: IColumn[];
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  perPage: number;
}

// Component emits interfaces
export interface DatatableHeaderEmits {
  (e: 'update:showColumnSettings', value: boolean): void;
  (e: 'update:showFiltersSettings', value: boolean): void;
  (e: 'columnVisibilityChange', columnId: string, visible: boolean): void;
  (e: 'filterVisibilityChange', filterId: string, visible: boolean): void;
}

export interface FiltersSectionEmits {
  (e: 'update:filtersCollapsed', value: boolean): void;
  (e: 'update:filterValues', value: FilterValues): void;
  (e: 'clearFilters'): void;
}

export interface TableComponentEmits {
  (e: 'sort', columnId: string): void;
}

export interface PaginationEmits {
  (e: 'update:currentPage', value: number): void;
  (e: 'update:perPage', value: number): void;
}

// Utility types
export type SortDirection = 'asc' | 'desc' | '';
export type FilterValues = Record<string, any>;
export type VisibilityMap = Record<string, boolean>;

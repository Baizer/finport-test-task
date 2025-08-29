import { type IColumn, IFilterOperator } from '../../form/schema';

export function getItemValue(item: any, columnId: string, columns: IColumn[]): any {
  const column = columns.find(col => col.id === columnId);

  if (column?.value) {
    const result = column.value(item, column);
    return typeof result === 'string' ? result : result?.toString() || '';
  }
  return item[columnId];
}

const normalize = (val: any): string => String(val).toLowerCase().trim();

export const FILTERS_MAP: Record<IFilterOperator, (itemValue: any, value: any) => boolean> = {
  [IFilterOperator.EQUAL]: (itemValue, value) => normalize(itemValue) === normalize(value),

  [IFilterOperator.ILIKE]: (itemValue, value) => normalize(itemValue).includes(normalize(value)),

  [IFilterOperator.RANGE]: (itemValue, value) => {
    const itemDate = new Date(itemValue);

    const hasFrom = Boolean(value?.from);
    const hasTo = Boolean(value?.to);

    if (hasFrom && hasTo) {
      const fromDate = new Date(value.from);
      const toDate = new Date(value.to);
      return itemDate >= fromDate && itemDate <= toDate;
    }

    if (hasFrom) {
      const fromDate = new Date(value.from);
      return itemDate >= fromDate;
    }

    if (hasTo) {
      const toDate = new Date(value.to);
      return itemDate <= toDate;
    }

    return true;
  }
};

function normalizeValue(value: any): any {
  if (!isNaN(value) && value !== '' && value !== true && value !== false) {
    return Number(value);
  }

  const date = new Date(value);
  if (!isNaN(date.getTime())) {
    return date.getTime();
  }

  if (typeof value === 'boolean') {
    return value ? 1 : 0;
  }

  return String(value).toLowerCase().trim();
}

export function universalSort<T>(
  data: T[],
  key: keyof T,
  order: 'asc' | 'desc' = 'asc'
): T[] {
  return [...data].sort((a, b) => {
    const aVal = a[key];
    const bVal = b[key];

    if (aVal == null) return 1;
    if (bVal == null) return -1;

    const aValue = normalizeValue(aVal);
    const bValue = normalizeValue(bVal);

    if (aValue < bValue) return order === 'asc' ? -1 : 1;
    if (aValue > bValue) return order === 'asc' ? 1 : -1;
    return 0;
  });
}


import type { VisibilityMap } from '../../form/schema';
import { DEFAULTS, STORAGE_KEYS } from './constants';

export function getStorageItem<T>(key: string, defaultValue: T): T {
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) : defaultValue;
}

export function setStorageItem<T>(key: string, value: T): void {
  localStorage.setItem(key, JSON.stringify(value));
}

export function getColumnVisibility(): VisibilityMap {
  return getStorageItem(STORAGE_KEYS.COLUMNS_VISIBILITY, {});
}

export function setColumnVisibility(visibility: VisibilityMap): void {
  setStorageItem(STORAGE_KEYS.COLUMNS_VISIBILITY, visibility);
}

export function getFilterVisibility(): VisibilityMap {
  return getStorageItem(STORAGE_KEYS.FILTERS_VISIBILITY, {});
}

export function setFilterVisibility(visibility: VisibilityMap): void {
  setStorageItem(STORAGE_KEYS.FILTERS_VISIBILITY, visibility);
}

export function getItemsPerPage(): number {
  return getStorageItem(STORAGE_KEYS.ITEMS_PER_PAGE, DEFAULTS.ITEMS_PER_PAGE);
}

export function setItemsPerPage(value: number): void {
  setStorageItem(STORAGE_KEYS.ITEMS_PER_PAGE, value);
}

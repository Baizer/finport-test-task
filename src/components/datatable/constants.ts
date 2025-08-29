// LocalStorage keys
export const STORAGE_KEYS = {
  COLUMNS_VISIBILITY: 'columns_visibility',
  FILTERS_VISIBILITY: 'filters_visibility',
  ITEMS_PER_PAGE: 'items_per_page'
} as const;

// Default values
export const DEFAULTS = {
  ITEMS_PER_PAGE: 5,
  CURRENT_PAGE: 1,
  SORT_DIRECTION: ''
} as const;

// Pagination options
export const PAGINATION_OPTIONS = [5, 10, 20, 50] as const;

// Sort directions
export const SORT_DIRECTIONS = ['asc', 'desc', ''] as const;

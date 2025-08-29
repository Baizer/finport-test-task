import { ref, computed, onMounted } from 'vue';
import { type FilterValues, type IColumn, type IFilter, type SortDirection, type VisibilityMap } from '../../../form/schema';
import { FILTERS_MAP, getItemValue, universalSort } from '../utils';
import { 
  getColumnVisibility, 
  setColumnVisibility, 
  getFilterVisibility, 
  setFilterVisibility, 
  getItemsPerPage, 
  setItemsPerPage 
} from '../storage';
import { DEFAULTS } from '../constants';

export function useDatatable(props: {
  columns: IColumn[];
  filters: IFilter[];
  data: any[];
}) {
  // State
  const currentPage = ref(DEFAULTS.CURRENT_PAGE);
  const perPage = ref<number>(DEFAULTS.ITEMS_PER_PAGE);
  const sortColumn = ref<string | null>(null);
  const sortDirection = ref<SortDirection>(DEFAULTS.SORT_DIRECTION);
  const filtersCollapsed = ref(false);
  const showColumnSettings = ref(false);
  const showFiltersSettings = ref(false);
  const filterValues = ref<FilterValues>({});
  const columnVisibility = ref<VisibilityMap>({});
  const filterVisibility = ref<VisibilityMap>({});

  // Computed
  const visibleColumns = computed((): IColumn[] => 
    props.columns.map(col => ({
      ...col,
      visible: columnVisibility.value[col.id] !== undefined 
        ? columnVisibility.value[col.id] 
        : col.visible
    }))
  );

  const visibleFilters = computed((): IFilter[] => 
    props.filters.map(filter => ({
      ...filter,
      title: visibleColumns.value.find(col => col.id === filter.id)?.title || filter.id,
      visible: filterVisibility.value[filter.id] !== undefined 
        ? filterVisibility.value[filter.id] 
        : filter.visible
    }))
  );

  const filteredData = computed((): any[] =>
    props.data.filter((item: any) => {
      return Object.entries(filterValues.value).every(([filterId, value]) => {
        const filter = props.filters.find(filter => filter.id === filterId);
        if (filter && value) {
          const itemValue = getItemValue(item, filterId, props.columns);
          return FILTERS_MAP[filter.operator](itemValue, value);
        }
        return true;
      });
    })
  );

  const sortedData = computed((): any[] => {
    if (!sortColumn.value || sortDirection.value === '') return filteredData.value;

    const column = props.columns.find(col => col.id === sortColumn.value);
    if (!column?.sortable) return filteredData.value;

    const dataWithValues = filteredData.value.map((item: any) => ({
      ...item,
      _sortValue: getItemValue(item, sortColumn.value!, props.columns)
    }));

    const sorted = universalSort(dataWithValues, '_sortValue', sortDirection.value as 'asc' | 'desc');
    return sorted.map(({ _sortValue, ...item }: any) => item);
  });

  const paginatedData = computed((): any[] => {
    const start = (currentPage.value - 1) * perPage.value;
    const end = start + perPage.value;
    return sortedData.value.slice(start, end);
  });

  const totalPages = computed((): number => 
    Math.ceil(sortedData.value.length / perPage.value)
  );

  // Methods
  function handleSort(columnId: string): void {
    if (sortColumn.value === columnId) {
      if (sortDirection.value === 'asc') {
        sortDirection.value = 'desc';
      } else if (sortDirection.value === 'desc') {
        sortDirection.value = '';
        sortColumn.value = null;
      } else {
        sortDirection.value = 'asc';
      }
    } else {
      sortColumn.value = columnId;
      sortDirection.value = 'asc';
    }
  }

  function handleColumnVisibilityChange(columnId: string, visible: boolean): void {
    columnVisibility.value[columnId] = visible;
    setColumnVisibility(columnVisibility.value);
  }

  function handleFilterVisibilityChange(filterId: string, visible: boolean): void {
    filterVisibility.value[filterId] = visible;
    setFilterVisibility(filterVisibility.value);
  }

  function handleItemsPerPageChange(value: number): void {
    perPage.value = value;
    currentPage.value = 1;
    setItemsPerPage(value);
  }

  function clearFilters(): void {
    filterValues.value = {};
    currentPage.value = 1;
  }

  // Initialize
  onMounted(() => {
    perPage.value = getItemsPerPage();
    columnVisibility.value = getColumnVisibility();
    filterVisibility.value = getFilterVisibility();
  });

  return {
    // State
    currentPage,
    perPage,
    sortColumn,
    sortDirection,
    filtersCollapsed,
    showColumnSettings,
    showFiltersSettings,
    filterValues,
    columnVisibility,
    filterVisibility,
    
    // Computed
    visibleColumns,
    visibleFilters,
    filteredData,
    sortedData,
    paginatedData,
    totalPages,
    
    // Methods
    handleSort,
    handleColumnVisibilityChange,
    handleFilterVisibilityChange,
    handleItemsPerPageChange,
    clearFilters
  };
}

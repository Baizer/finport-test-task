<script setup lang="ts">
  import { type DatatableProps } from '../../form/schema';
  import { useDatatable } from './composables/useDatatable';

  import DatatableHeader from './DatatableHeader.vue';
  import FiltersSection from './FiltersSection.vue';
  import TableComponent from './TableComponent.vue';
  import Pagination from './Pagination.vue';

  const props = defineProps<DatatableProps>();

  const {
    // State
    currentPage,
    perPage,
    sortColumn,
    sortDirection,
    filtersCollapsed,
    showColumnSettings,
    showFiltersSettings,
    filterValues,
    
    // Computed
    visibleColumns,
    visibleFilters,
    paginatedData,
    totalPages,
    
    // Methods
    handleSort,
    handleColumnVisibilityChange,
    handleFilterVisibilityChange,
    handleItemsPerPageChange,
    clearFilters
  } = useDatatable(props);
</script>

<template>
  <DatatableHeader
    :visible-columns="visibleColumns"
    :visible-filters="visibleFilters"
    v-model:show-column-settings="showColumnSettings"
    v-model:show-filters-settings="showFiltersSettings"
    @column-visibility-change="handleColumnVisibilityChange"
    @filter-visibility-change="handleFilterVisibilityChange"
  />

  <FiltersSection
    :visible-columns="visibleColumns"
    :visible-filters="visibleFilters"
    v-model:filters-collapsed="filtersCollapsed"
    v-model:filter-values="filterValues"
    @clear-filters="clearFilters"
  />

  <TableComponent
    :visible-columns="visibleColumns"
    :paginated-data="paginatedData"
    :sort-column="sortColumn"
    :sort-direction="sortDirection"
    :columns="columns"
    @sort="handleSort"
  />

  <Pagination
    v-model:current-page="currentPage"
    :per-page="perPage"
    :total-pages="totalPages"
    @update:per-page="handleItemsPerPageChange"
  />
</template>

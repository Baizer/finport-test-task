<script setup lang="ts">
  import { type IColumn, type IFilter, type DatatableHeaderProps, type DatatableHeaderEmits } from '../../form/schema';
  import { useClickOutside } from './composables/useClickOutside';

  const props = defineProps<DatatableHeaderProps>();
  const emit = defineEmits<DatatableHeaderEmits>();

  function toggleColumnSettings(): void {
    emit('update:showColumnSettings', !props.showColumnSettings);
  }

  function toggleFiltersSettings(): void {
    emit('update:showFiltersSettings', !props.showFiltersSettings);
  }

  function handleColumnVisibilityChange(columnId: string, visible: boolean): void {
    emit('columnVisibilityChange', columnId, visible);
  }

  function handleFilterVisibilityChange(filterId: string, visible: boolean): void {
    emit('filterVisibilityChange', filterId, visible);
  }

  function handleClickOutside(): void {
    emit('update:showColumnSettings', false);
    emit('update:showFiltersSettings', false);
  }

  function handleFilterChange(filter: IFilter, event: Event): void {
    handleFilterVisibilityChange(
      filter.id,
      (event.target as HTMLInputElement).checked
    )
  }

  function handleColumnChange(column: IColumn, event: Event): void {
    handleColumnVisibilityChange(column.id, (event.target as HTMLInputElement).checked);
  }

  useClickOutside(handleClickOutside, ['.column-settings-dropdown', '.filters-settings-dropdown']);
</script>

<template>
  <div class="flex justify-between">
    <button class="flex items-center justify-between bg-green-800 rounded-lg p-3 font-medium text-white">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5 stroke-white">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
      </svg>
      Додати довідник</button>
    <div class="flex gap-2">
      <div class="relative filters-settings-dropdown">
        <button @click="toggleFiltersSettings" class="flex items-center gap-2 bg-gray-100 border rounded-lg border-gray-300 p-3 font-medium text-black">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5 stroke-green-800">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
          </svg>
          Фільтри
        </button>
        <div
          v-if="showFiltersSettings"
          class="absolute right-0 top-full bg-white rounded-lg shadow-lg border border-gray-300"
        >
          <div class="p-2">
            <div
              v-for="filter in visibleFilters"
              :key="filter.id"
              class="flex items-center p-2 hover:bg-gray-50 rounded cursor-pointer"
            >
              <input
                :id="'filter-' + filter.id"
                type="checkbox"
                :checked="filter.visible"
                @change="handleFilterChange(filter, $event)"
              />
              <label :for="'filter-' + filter.id" class="w-full ml-2 text-sm text-gray-700">
                {{
                visibleColumns.find(col => col.id === filter.id)?.title || filter.id
              }}</label>
            </div>
          </div>
        </div>
      </div>

      <div class="relative column-settings-dropdown">
        <button @click="toggleColumnSettings" class="flex items-center gap-2 bg-gray-100 border rounded-lg border-gray-300 p-3 font-medium text-black">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5 stroke-green-800">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
          </svg>
          Колонки
        </button>
        <div
          v-if="showColumnSettings"
          class="absolute right-0 top-full bg-white rounded-lg shadow-lg border border-gray-300"
        >
          <div class="p-2">
            <div
              v-for="column in visibleColumns"
              :key="column.id"
              class="flex items-center p-2 hover:bg-gray-50 rounded cursor-pointer"
            >
              <input
              :id="'column-' + column.id"
                type="checkbox"
                :checked="column.visible"
                @change="handleColumnChange(column, $event)"
              />
              <label :for="'column-' + column.id" class="w-full ml-2 text-sm text-gray-700">{{ column.title }}</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

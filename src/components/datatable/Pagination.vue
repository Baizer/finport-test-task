<script setup lang="ts">
  import { PAGINATION_OPTIONS } from './constants';
  import { type PaginationProps, type PaginationEmits } from '../../form/schema';

  const props = defineProps<PaginationProps>();
  const emit = defineEmits<PaginationEmits>();

  function handleItemsPerPageChange(value: number): void {
    emit('update:perPage', value);
    emit('update:currentPage', 1);
  }

  function goToPreviousPage(): void {
    emit('update:currentPage', Math.max(1, props.currentPage - 1));
  }

  function goToNextPage(): void {
    emit('update:currentPage', Math.min(props.totalPages, props.currentPage + 1));
  }

  function onSelectChange(event: Event): void {
    const value = parseInt((event.target as HTMLSelectElement).value);

    handleItemsPerPageChange(value);
  }
</script>

<template>
  <div class="flex items-center justify-between p-4 border-t border-gray-200 bg-gray-50">
    <div class="flex items-center gap-2">
      <span class="text-sm text-gray-700">Записів на сторінку:</span>
      <select
        :value="perPage"
        @change="onSelectChange"
        class="px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
      >
        <option v-for="option in PAGINATION_OPTIONS" :key="option" :value="option">
          {{ option }}
        </option>
      </select>
    </div>

    <div class="flex items-center gap-4">
      <span class="text-sm text-gray-700"> Сторінка {{ currentPage }} з {{ totalPages }} </span>

      <div class="flex items-center gap-1">
        <button
          @click="goToPreviousPage"
          :disabled="currentPage === 1"
          class="px-3 py-1 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 text-sm transition-colors"
        >
          Попередня
        </button>

        <button
          @click="goToNextPage"
          :disabled="currentPage === totalPages"
          class="px-3 py-1 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 text-sm transition-colors"
        >
          Наступна
        </button>
      </div>
    </div>
  </div>
</template>

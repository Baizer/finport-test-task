<script setup lang="ts">
  import { type TableComponentProps, type TableComponentEmits } from '../../form/schema';
  import { getItemValue } from './utils';

  defineProps<TableComponentProps>();
  const emit = defineEmits<TableComponentEmits>();

  function handleSort(columnId: string): void {
    emit('sort', columnId);
  }
</script>

<template>
  <div class="overflow-x-auto">
    <table class="w-full">
      <thead class="bg-gray-50">
        <tr>
          <th
            v-for="column in visibleColumns.filter(col => col.visible)"
            :key="column.id"
            class="px-4 py-3 text-left text-sm font-medium text-gray-700 border-b border-gray-200"
          >
            <div class="flex items-center justify-start">
              <span>{{ column.title }}</span>
              <button
                v-if="column.sortable"
                @click="handleSort(column.id)"
                class="bg-transparent text-green-800 font-semibold py-2 px-4 hover:text-green-600"
              >
                <span class="flex items-center justify-center">
                  <span v-if="sortColumn !== column.id || sortDirection === ''">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M3 7.5 7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5" />
                    </svg>
                  </span>
                  <span v-else-if="sortDirection === 'asc'">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18" />
                    </svg>
                  </span>
                  <span v-else><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3" />
                      </svg>
                    </span>
                </span>
              </button>
            </div>
          </th>
        </tr>
      </thead>
      <tbody class="bg-white">
        <tr
          v-for="(item, index) in paginatedData"
          :key="index"
          class="hover:bg-gray-50 border-b border-gray-100"
        >
          <td
            v-for="column in visibleColumns.filter(col => col.visible)"
            :key="column.id"
            class="px-4 py-3 text-sm text-gray-900"
          >
            <span>
              {{ getItemValue(item, column.id, columns) }}
            </span>
          </td>
        </tr>
        <tr v-if="paginatedData.length === 0">
          <td
            :colspan="visibleColumns.filter(col => col.visible).length"
            class="text-center py-8 text-gray-500"
          >
            Дані не знайдено
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

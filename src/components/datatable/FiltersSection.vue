<script setup lang="ts">
  import { IFilterType, type FiltersSectionProps, type FiltersSectionEmits } from '../../form/schema';

  const props = defineProps<FiltersSectionProps>();
  const emit = defineEmits<FiltersSectionEmits>();

  function toggleFilters(): void {
    emit('update:filtersCollapsed', !props.filtersCollapsed);
  }

  function clearFilters(): void {
    emit('clearFilters');
  }

</script>

<template>
  <div class="p-4 border-b border-gray-200 bg-gray-50">
    <div class="flex justify-end items-center mb-4">
      <div class="flex gap-2">
        <button @click="toggleFilters" class="flex items-center gap-2 bg-gray-100 border rounded-lg border-gray-300 p-3 font-medium text-black">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5 stroke-green-800">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z" />
          </svg>
          Фільтри
        </button>

        <button @click="clearFilters" class="flex items-center gap-2 bg-gray-100 border rounded-lg border-gray-300 p-3 font-medium text-black">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5 stroke-green-800">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9.75 14.25 12m0 0 2.25 2.25M14.25 12l2.25-2.25M14.25 12 12 14.25m-2.58 4.92-6.374-6.375a1.125 1.125 0 0 1 0-1.59L9.42 4.83c.21-.211.497-.33.795-.33H19.5a2.25 2.25 0 0 1 2.25 2.25v10.5a2.25 2.25 0 0 1-2.25 2.25h-9.284c-.298 0-.585-.119-.795-.33Z" />
          </svg>
          Очистити
        </button>
      </div>
    </div>

    <div v-if="!filtersCollapsed" class="grid grid-cols-4 gap-4">
      <div
        v-for="filter in visibleFilters.filter(f => f.visible)"
        :key="filter.id"
        class="space-y-1"
      >
        <label class="block text-sm font-medium text-gray-700">{{
          visibleColumns.find(col => col.id === filter.id)?.title || filter.id
        }}</label>

        <input
          v-if="filter.type === IFilterType.TEXT"
          v-model="filterValues[filter.id]"
          type="text"
          placeholder="Введіть значення"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />

        <input
          v-else-if="filter.type === IFilterType.DATE"
          v-model="filterValues[filter.id]"
          type="date"
          placeholder="Оберіть дату"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />

        <div v-else-if="filter.type === IFilterType.DATERANGE" class="flex items-center justify-center align-middle content-center space-y-2 gap-2">
          <input
            :value="filterValues[filter.id]?.from || ''"
            @input="
              $emit('update:filterValues', {
                ...filterValues,
                [filter.id]: {
                  ...filterValues[filter.id],
                  from: ($event.target as HTMLInputElement).value
                }
              })
            "
            type="date"
            placeholder="Від"
            class="m-0 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
          <input
            :value="filterValues[filter.id]?.to || ''"
            @input="
              $emit('update:filterValues', {
                ...filterValues,
                [filter.id]: {
                  ...filterValues[filter.id],
                  to: ($event.target as HTMLInputElement).value
                }
              })
            "
            type="date"
            placeholder="До"
            class="m-0 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>

        <select
          v-else-if="filter.type === IFilterType.BOOLEAN"
          v-model="filterValues[filter.id]"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
        >
          <option value="true">Так</option>
          <option value="false">Ні</option>
        </select>
      </div>
    </div>
  </div>
</template>

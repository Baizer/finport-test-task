<script setup lang="ts">

import { exampleData } from './form/data';
import { columns, filters } from './form/data';
import Datatable from './components/datatable/Datatable.vue';

</script>

<template>
  <div class="flex flex-col mx-auto bg-white max-w-[1200px] gap-2 mt-4 p-12 rounded-xl shadow-sm">
    <span class="text-center font-bold text-2xl text-gray-700">Datatable component</span>
    <Datatable :columns="columns" :filters="filters" :data="exampleData" />
  </div>
</template>

<style scoped>

</style>

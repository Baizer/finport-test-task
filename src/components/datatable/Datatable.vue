<script setup lang="ts">
import { type IColumn, type IFilter } from '../../form/schema';

const props = defineProps<{
  columns: IColumn[];
  filters: IFilter[];
  data: any[];
}>();   


</script>


<template>
  <div class="flex flex-col gap-2">
    <!-- REPLACE ALL CODE INSIDE ROOT DIV -->
    <div>
        <span>Current component props:</span>
        <pre class="text-xs">
            {{ JSON.stringify(props, null, 2) }}
        </pre>
    </div>
    <!-- -------------------------------- -->
  </div>
</template>
<script setup lang="ts">
import type { Table } from '@tanstack/vue-table';

import { computed } from 'vue';

import { Input, Button } from '@vben/common-ui';

import FacetedFilter from './faceted-filter.vue';
import { status } from './filter';
import ViewOptions from './view-options.vue';
import { router } from '#/router';

interface DataTableToolbarProps {
  table: Table<any>;
}

const props = defineProps<DataTableToolbarProps>();

const isFiltered = computed(
  () => props.table.getState().columnFilters.length > 0,
);

const addBug = () => {
  router.push(`/bug-edit`);
}
</script>

<template>
  <div class="flex items-center justify-between">
    <div class="flex flex-1 items-center space-x-2">
      <Input
        :model-value="
          (table.getColumn('name')?.getFilterValue() as string) ?? ''
        "
        class="h-8 w-[150px] lg:w-[250px]"
        placeholder="按照名称查找..."
        @input="table.getColumn('name')?.setFilterValue($event.target.value)"
      />
      <Button
        v-if="isFiltered"
        class="h-8 px-2 lg:px-3"
        variant="ghost"
        @click="table.resetColumnFilters()"
      >
        Reset
        <Cross2Icon class="ml-2 h-4 w-4" />
      </Button>

      <Button class="h-8 px-2 lg:px-3" @click="addBug">
        新增
      </Button>
    </div>
    <ViewOptions :table="table" />
  </div>
</template>

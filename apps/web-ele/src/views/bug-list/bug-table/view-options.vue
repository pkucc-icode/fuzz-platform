<script setup lang="ts">
import type { Table } from '@tanstack/vue-table';

import { computed } from 'vue';

import {
  Button,
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@vben/common-ui';

import { MixerHorizontalIcon } from '@radix-icons/vue';

import { type Payment } from './columns';

interface DataTableViewOptionsProps {
  table: Table<Payment>;
}

const props = defineProps<DataTableViewOptionsProps>();

const columns = computed(() =>
  props.table
    .getAllColumns()
    .filter(
      (column) =>
        typeof column.accessorFn !== 'undefined' && column.getCanHide(),
    ),
);
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button class="ml-auto hidden h-8 lg:flex" size="sm" variant="outline">
        <MixerHorizontalIcon class="mr-2 h-4 w-4" />
        View
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" class="w-[150px]">
      <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
      <DropdownMenuSeparator />

      <DropdownMenuCheckboxItem
        v-for="column in columns"
        :key="column.id"
        :checked="column.getIsVisible()"
        class="capitalize"
        @update:checked="(value) => column.toggleVisibility(!!value)"
      >
        {{ column.id }}
      </DropdownMenuCheckboxItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>

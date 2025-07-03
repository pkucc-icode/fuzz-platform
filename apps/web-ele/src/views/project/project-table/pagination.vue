<script setup lang="ts">
import {
  Button,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@vben/common-ui';

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from '@radix-icons/vue';
import { type Table } from '@tanstack/vue-table';

interface DataTablePaginationProps {
  table: Table<any>;
}
defineProps<DataTablePaginationProps>();
</script>

<template>
  <div class="flex items-center justify-between px-2">
    <div class="text-muted-foreground flex-1 text-sm">
      {{ table.getFilteredSelectedRowModel().rows.length }} of
      {{ table.getFilteredRowModel().rows.length }} row(s) selected.
    </div>
    <div class="flex items-center space-x-6 lg:space-x-8">
      <div class="flex items-center space-x-2">
        <p class="text-sm font-medium">每页显示</p>
        <Select
          :model-value="`${table.getState().pagination.pageSize}`"
          @update:model-value="table.setPageSize"
        >
          <SelectTrigger class="h-8 w-[70px]">
            <SelectValue
              :placeholder="`${table.getState().pagination.pageSize}`"
            />
          </SelectTrigger>
          <SelectContent side="top">
            <SelectItem
              v-for="pageSize in [5, 10, 13, 20, 25, 30, 40, 50]"
              :key="pageSize"
              :value="`${pageSize}`"
            >
              {{ pageSize }}
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div
        class="flex w-[100px] items-center justify-center text-sm font-medium"
      >
        页 {{ table.getState().pagination.pageIndex + 1 }} /
        {{ table.getPageCount() }}
      </div>
      <div class="flex items-center space-x-2">
        <Button
          :disabled="!table.getCanPreviousPage()"
          class="hidden h-8 w-8 p-0 lg:flex"
          variant="outline"
          @click="table.setPageIndex(0)"
        >
          <span class="sr-only">第一页</span>
          <DoubleArrowLeftIcon class="h-4 w-4" />
        </Button>
        <Button
          :disabled="!table.getCanPreviousPage()"
          class="h-8 w-8 p-0"
          variant="outline"
          @click="table.previousPage()"
        >
          <span class="sr-only">上一页</span>
          <ChevronLeftIcon class="h-4 w-4" />
        </Button>
        <Button
          :disabled="!table.getCanNextPage()"
          class="h-8 w-8 p-0"
          variant="outline"
          @click="table.nextPage()"
        >
          <span class="sr-only">下一页</span>
          <ChevronRightIcon class="h-4 w-4" />
        </Button>
        <Button
          :disabled="!table.getCanNextPage()"
          class="hidden h-8 w-8 p-0 lg:flex"
          variant="outline"
          @click="table.setPageIndex(table.getPageCount() - 1)"
        >
          <span class="sr-only">最后一页</span>
          <DoubleArrowRightIcon class="h-4 w-4" />
        </Button>
      </div>
    </div>
  </div>
</template>

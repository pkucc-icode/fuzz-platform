<script setup lang="ts">
import type { Column } from '@tanstack/vue-table';

import type { Component } from 'vue';
import { computed } from 'vue';

import {
  Badge,
  Button,
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Separator,
} from '@vben/common-ui';

import { CheckIcon, PlusCircledIcon } from '@radix-icons/vue';

interface DataTableFacetedFilter {
  column?: Column<any, any>;
  title?: string;
  options: {
    icon?: Component;
    label: string;
    value: string;
  }[];
}

const props = defineProps<DataTableFacetedFilter>();

const facets = computed(() => props.column?.getFacetedUniqueValues());
const selectedValues = computed(
  () => new Set(props.column?.getFilterValue() as string[]),
);
</script>

<template>
  <Popover>
    <PopoverTrigger as-child>
      <Button class="h-8 border-dashed" size="sm" variant="outline">
        <PlusCircledIcon class="mr-2 h-4 w-4" />
        {{ title }}
        <template v-if="selectedValues.size > 0">
          <Separator class="mx-2 h-4" orientation="vertical" />
          <Badge
            class="rounded-sm px-1 font-normal lg:hidden"
            variant="secondary"
          >
            {{ selectedValues.size }}
          </Badge>
          <div class="hidden space-x-1 lg:flex">
            <Badge
              v-if="selectedValues.size > 2"
              class="rounded-sm px-1 font-normal"
              variant="secondary"
            >
              {{ selectedValues.size }} selected
            </Badge>

            <template v-else>
              <Badge
                v-for="option in options.filter((option) =>
                  selectedValues.has(option.value),
                )"
                :key="option.value"
                class="rounded-sm px-1 font-normal"
                variant="secondary"
              >
                {{ option.label }}
              </Badge>
            </template>
          </div>
        </template>
      </Button>
    </PopoverTrigger>
    <PopoverContent align="start" class="w-[200px] p-0">
      <Command
        :filter-function="
          (list: DataTableFacetedFilter['options'], term) =>
            list.filter((i) => i.label.toLowerCase()?.includes(term))
        "
      >
        <CommandInput :placeholder="title" />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup>
            <CommandItem
              v-for="option in options"
              :key="option.value"
              :value="option"
              @select="
                (e) => {
                  const isSelected = selectedValues.has(option.value);
                  if (isSelected) {
                    selectedValues.delete(option.value);
                  } else {
                    selectedValues.add(option.value);
                  }
                  const filterValues = Array.from(selectedValues);
                  column?.setFilterValue(
                    filterValues.length ? filterValues : undefined,
                  );
                }
              "
            >
              <div
                :class="[
                  selectedValues.has(option.value)
                    ? 'bg-primary text-primary-foreground'
                    : 'opacity-50 [&_svg]:invisible',
                ]"
                class="border-primary mr-2 flex h-4 w-4 items-center justify-center rounded-sm border"
              >
                <CheckIcon class="h-4 w-4" />
              </div>
              <component
                :is="option.icon"
                v-if="option.icon"
                class="text-muted-foreground mr-2 h-4 w-4"
              />
              <span>{{ option.label }}</span>
              <span
                v-if="facets?.get(option.value)"
                class="ml-auto flex h-4 w-4 items-center justify-center font-mono text-xs"
              >
                {{ facets.get(option.value) }}
              </span>
            </CommandItem>
          </CommandGroup>

          <template v-if="selectedValues.size > 0">
            <CommandSeparator />
            <CommandGroup>
              <CommandItem
                :value="{ label: 'Clear filters' }"
                class="justify-center text-center"
                @select="column?.setFilterValue(undefined)"
              >
                Clear filters
              </CommandItem>
            </CommandGroup>
          </template>
        </CommandList>
      </Command>
    </PopoverContent>
  </Popover>
</template>

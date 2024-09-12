<script setup lang="ts">
import type { Project } from './columns';

import { onMounted, ref } from 'vue';

import { ElCard } from 'element-plus';

import { columns } from './columns';
import DataTable from './data-table.vue';
import { list } from '#/api';
import { useQuery } from '@tanstack/vue-query';


const { data } = useQuery({
    queryKey: ['projects'],
    queryFn: list,
  });
</script>

<template>
  <ElCard>
    <template #header>
      <div class="text-xl font-bold">
        <span>项目</span>
      </div>
    </template>
    <DataTable :columns="columns" :data="data || []" />
  </ElCard>
</template>

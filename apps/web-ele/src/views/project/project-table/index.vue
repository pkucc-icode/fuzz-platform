<script setup lang="ts">
import type { Project } from './columns';

import { onMounted, ref } from 'vue';

import { ElCard } from 'element-plus';

import { columns } from './columns';
import DataTable from './data-table.vue';
import { list } from '#/api';

const data = ref<Project[]>([]);

async function getData(): Promise<Project[]> {
  const res = await list();
  return res;
}

onMounted(async () => {
  data.value = await getData();
});
</script>

<template>
  <ElCard>
    <template #header>
      <div class="text-xl font-bold">
        <span>项目</span>
      </div>
    </template>
    <DataTable :columns="columns" :data="data" />
  </ElCard>
</template>

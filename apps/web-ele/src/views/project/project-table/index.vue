<script setup lang="ts">
import type { Project } from './columns';

import { onMounted, ref } from 'vue';

import { Card, CardContent } from '@vben/common-ui';

import { columns } from './columns';
import DataTable from './data-table.vue';
import { listProject } from '#/api';
import { useQuery } from '@tanstack/vue-query';


const { data } = useQuery({
    queryKey: ['projects'],
    queryFn: listProject,
  });
</script>

<template>
  <Card>
    <CardContent>
      <template #header>
        <div class="text-xl font-bold">
          <span>项目</span>
        </div>
      </template>
      <DataTable :columns="columns" :data="data || []" />
    </CardContent>
  </Card>
</template>

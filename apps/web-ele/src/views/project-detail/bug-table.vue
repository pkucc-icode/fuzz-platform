<script setup lang="ts">
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@vben/common-ui'

import { ElLink } from 'element-plus';

import { type ProjectApi } from '#/api/project';
import { router } from '#/router';

interface BugTableProps {
    data: ProjectApi.Bug[];
}

const props = defineProps<BugTableProps>();

function view(id: string) {
  router.push({
    name: "BugDetail",
    query: {
      id,
    },
  })
}

function linkType(risk: string) {
  if (risk === "高") return "danger";
  if (risk === "中") return "warning";
  return "success";
}
</script>

<template>
  <Table>
    <TableCaption>A list of your recent rows.</TableCaption>
    <TableHeader>
      <TableRow>
        <TableHead class="w-[100px]">
          名称
        </TableHead>
        <TableHead>类型</TableHead>
        <TableHead>风险等级</TableHead>
        <TableHead>首次发现时间</TableHead>
        <TableHead>总发现数</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow v-for="row in props.data" :key="row.id">
        <TableCell>
          <ElLink :type="linkType(row.risk)" @click="view(row.id)">{{ row.name }}</ElLink>
        </TableCell>
        <TableCell>{{ row.type }}</TableCell>
        <TableCell>{{ row.risk }}</TableCell>
        <TableCell>{{ row.firstTime }}</TableCell>
        <TableCell>{{ row.total }}</TableCell>
      </TableRow>
    </TableBody>
  </Table>
</template>
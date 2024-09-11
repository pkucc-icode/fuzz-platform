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

import { type FuzzApi } from '#/api/fuzz';
import { router } from '#/router';

// 定义 props 接口
interface BugTableProps {
    data: FuzzApi.Bug[];
}

const props = defineProps<BugTableProps>();

function view(id: string) {
  router.push({
    name: "BugDetail",
    query: {
      id: 1,
    },
  })
}
</script>

<template>
  <Table>
    <TableCaption>A list of your recent rows.</TableCaption>
    <TableHeader>
      <TableRow>
        <TableHead class="w-[100px]">
          ID
        </TableHead>
        <TableHead>Bug 类型</TableHead>
        <TableHead>风险等级</TableHead>
        <TableHead>首次发现时间</TableHead>
        <TableHead>总发现数</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow v-for="row in props.data" :key="row.bug_id">
        <TableCell>
          <ElLink type="warning" @click="view(row.bug_id)">{{ row.bug_id }}</ElLink>
        </TableCell>
        <TableCell>{{ row.bug_type }}</TableCell>
        <TableCell>{{ row.risk_level }}</TableCell>
        <TableCell>{{ row.first_discovery_time }}</TableCell>
        <TableCell>{{ row.total_discovery_count }}</TableCell>
      </TableRow>
    </TableBody>
  </Table>
</template>
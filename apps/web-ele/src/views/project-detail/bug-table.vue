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

import { type FuzzApi } from '#/api/fuzz';

// 定义 props 接口
interface BugTableProps {
    data: FuzzApi.Bug[];
}

const props = defineProps<BugTableProps>();

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
        <TableHead>代码文件</TableHead>
        <TableHead>报告</TableHead>
        <TableHead>crash file path</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow v-for="row in props.data" :key="row.bug_id">
        <TableCell>{{ row.bug_id }}</TableCell>
        <TableCell>{{ row.bug_type }}</TableCell>
        <TableCell>{{ row.risk_level }}</TableCell>
        <TableCell>{{ row.first_discovery_time }}</TableCell>
        <TableCell>{{ row.total_discovery_count }}</TableCell>
        <TableCell>{{ row.risk_code_display_file }}</TableCell>
        <TableCell>{{ row.asan_report_file }}</TableCell>
        <TableCell>{{ row.crash_file_path }}</TableCell>
      </TableRow>
    </TableBody>
  </Table>
</template>
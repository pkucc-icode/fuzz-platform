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
    data: ProjectApi.Scan[];
}

const props = defineProps<BugTableProps>();

</script>

<template>
  <Table>
    <TableCaption>A list of your recent rows.</TableCaption>
    <TableHeader>
      <TableRow>
        <TableHead>源码</TableHead>
        <TableHead>类型</TableHead>
        <TableHead>位置</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow v-for="row in props.data" :key="row.id">
        <TableCell><pre>{{ row.code}}</pre></TableCell>
        <TableCell>{{ row.type }}</TableCell>
        <TableCell>{{ row.codeLine }}</TableCell>
      </TableRow>
    </TableBody>
  </Table>
</template>
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
<<<<<<< HEAD
    type?: string;
=======
>>>>>>> 9327addec79cb6ad385a3fa1ef864cecd81b6694
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
<<<<<<< HEAD

</script>

<template>
  <Table v-if="type === 'openFuzz'">
=======
</script>

<template>
  <Table>
>>>>>>> 9327addec79cb6ad385a3fa1ef864cecd81b6694
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
<<<<<<< HEAD


  <Table v-if="type === 'webFuzz'">
    <TableCaption>A list of your recent rows.</TableCaption>
    <TableHeader>
      <TableRow>
        <TableHead>
          名称
        </TableHead>
        <TableHead>错误码</TableHead>
        <TableHead>是否可复现</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow v-for="row in props.data" :key="row.id">
        <TableCell>
          <ElLink :type="linkType(row.risk)" @click="view(row.id)">{{ row.name }}</ElLink>
        </TableCell>
        <TableCell>{{ row.detail["error_code"] }}</TableCell>
        <TableCell>{{ row.detail["reproducible"] }}</TableCell>
      </TableRow>
    </TableBody>
  </Table>
=======
>>>>>>> 9327addec79cb6ad385a3fa1ef864cecd81b6694
</template>
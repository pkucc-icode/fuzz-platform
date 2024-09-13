<script setup lang="ts">
import { router } from '#/router';
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@vben/common-ui';

import { MoreHorizontal } from 'lucide-vue-next';
import { ElMessage } from 'element-plus';
import { startProject, stopProject, deleteProject } from '#/api';
import { useQueryClient } from '@tanstack/vue-query';

defineProps<{
  project: {
    id: number;
  };
}>();

defineEmits<{
  (e: 'expand'): void;
}>();

const queryClient = useQueryClient();


function view(id: number) {
  router.push(`/project-detail?id=${id}`)
}

async function start(id: number) {
  try {
    await startProject(id);
    ElMessage.success('操作成功');
    queryClient.invalidateQueries({
      queryKey: ["projects"]
    });
  } catch {
    ElMessage.error('提交失败');
  }
  router.push(`/analytics`);
}

async function stop(id: number) {
  try {
    await stopProject(id);
    ElMessage.success('操作成功');
    queryClient.invalidateQueries({
      queryKey: ["projects"]
    });
  } catch {
    ElMessage.error('提交失败');
  }
}

async function remove(id: number) {
  try {
    await deleteProject(id);
    ElMessage.success('操作成功');
    queryClient.invalidateQueries({
      queryKey: ["projects"]
    });
  } catch {
    ElMessage.error('提交失败');
  }
}
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button class="h-8 w-8 p-0" variant="ghost">
        <span class="sr-only">Open menu</span>
        <MoreHorizontal class="h-4 w-4" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuItem @click="view(project.id)">
        查看
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem @click="stop(project.id)">
        暂停
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem @click="remove(project.id)">删除</DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem @click="start(project.id)">重新开始</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>

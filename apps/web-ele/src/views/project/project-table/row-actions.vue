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

defineProps<{
  project: {
    id: string;
  };
}>();

defineEmits<{
  (e: 'expand'): void;
}>();

function view(id: string) {
  router.push(`/project-detail?id=${id}`)
}

function stop(id: string) {
  navigator.clipboard.writeText(id);
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
        结束
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem>删除</DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem>重新开始</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>

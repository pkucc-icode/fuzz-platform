<script setup lang="ts">
import { FilePenLine, Trash } from 'lucide-vue-next';
import { ElMessage } from 'element-plus';
import { delBug } from '#/api';
import { inject } from 'vue';
import { router } from '#/router';

interface Props {
    id: string;
}

const props = defineProps<Props>();

const refetch = inject<Function>('refetch')


const edit = (e) => {
    e.preventDefault();
    router.push(`/bug-edit?id=${props.id}`);
}

const deleteBug = async (e) => {
    e.preventDefault();
    await delBug(props.id);
    ElMessage.success('操作成功');
    refetch?.();
}
</script>

<template>
    <div class="flex items-center space-x-2">
        <!-- ID: {{ props.id }} -->
        <FilePenLine class="font-medium cursor-pointer" @click="edit" />
        <Trash class="font-medium cursor-pointer" @click="deleteBug" />
    </div>
</template>
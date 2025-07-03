<script lang="ts" setup>
import { onMounted, ref } from 'vue';

import { ElButton, ElCard, ElTable, ElTableColumn } from 'element-plus';
import { CirclePower, Trash, RotateCcw } from 'lucide-vue-next';
import { listProject } from '#/api';

const tableData = ref([])

onMounted(async () => {
    const res = await listProject();
    tableData.value = res;
})
</script>


<template>
    <ElCard>
        <template #header>
            <div class="text-xl font-bold">
                <span>项目</span>
            </div>
        </template>
        <ElTable :data="tableData">
            <ElTableColumn prop="id" label="Id" />
            <ElTableColumn prop="name" label="项目名称" width="100" />
            <ElTableColumn prop="bug_n" label="Bug数量" />
            <ElTableColumn prop="start_time" label="开始时间" />
            <ElTableColumn prop="status" label="项目状态" />
            <ElTableColumn label="操作" width="180">
                <template #default="scope">
                    <ElButton size="small" :icon="CirclePower" />
                    <ElButton size="small" :icon="RotateCcw" />
                    <ElButton size="small" :icon="Trash" />
                </template>
            </ElTableColumn>
        </ElTable>
    </ElCard>

</template>
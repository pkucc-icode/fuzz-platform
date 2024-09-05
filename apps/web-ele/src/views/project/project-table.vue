<script lang="ts" setup>
import { reactive, ref } from 'vue';

import { ElButton, ElCard, ElTable, ElTableColumn } from 'element-plus';
import { Pencil, Trash, RotateCcw } from 'lucide-vue-next';

const tableData = [
    {
        id: 1,
        start_time: '2016-05-03',
        name: 'React',
        bug_n: 5,
        address: 'No. 189, Grove St, Los Angeles',
        status: 0,
    },
    {
        id: 2,
        start_time: '2016-05-02',
        name: 'Vue',
        bug_n: 5,
        address: 'No. 189, Grove St, Los Angeles',
        status: 0,
    },
    {
        id: 3,
        start_time: '2016-05-04',
        name: 'Es build',
        bug_n: 5,
        address: 'No. 189, Grove St, Los Angeles',
        status: 0,
    }
]
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
            <ElTableColumn prop="start_time" label="任务开始时间" />
            <ElTableColumn prop="status" label="项目状态" />
            <ElTableColumn label="操作" width="180">
                <template #default="scope">
                    <ElButton size="small" :icon="Pencil" />
                    <ElButton size="small" :icon="RotateCcw" />
                    <ElButton size="small" :icon="Trash" />
                </template>
            </ElTableColumn>
        </ElTable>
    </ElCard>

</template>
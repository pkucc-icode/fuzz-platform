<script lang="ts" setup>
import { onMounted, ref } from 'vue';

import { Page } from '@vben/common-ui';
import { ElCard, ElDescriptions, ElDescriptionsItem } from 'element-plus';
import { useRoute } from 'vue-router';
import { getProjectRes } from '#/api';
import { type FuzzApi } from '#/api/fuzz';
import BugTable from './bug-table.vue';


const res = ref<FuzzApi.FuzzingReport | null>(null)
const route = useRoute();
const { id } = route.query;

onMounted(async () => {
    const projectId = Number(id);
    try {
        const projectRes = await getProjectRes(projectId);
        res.value = projectRes;
    } catch (error) {
        console.error('获取项目资源失败:', error);
    }
})
</script>

<template>
    <Page description="" title="项目详情">
        <ElCard class="mb-4">
            <ElDescriptions title="基本信息" :column="2">
                <ElDescriptionsItem label="代码路径">{{ res?.code_path }}</ElDescriptionsItem>
                <ElDescriptionsItem label="覆盖率">{{ res?.code_coverage.bitmap_cvg }}</ElDescriptionsItem>
                <ElDescriptionsItem label="任务数量">{{ res?.fuzzing_task_count }}</ElDescriptionsItem>
                <ElDescriptionsItem label="Bug数量">{{ res?.total_bugs_found }}</ElDescriptionsItem>
            </ElDescriptions>
        </ElCard>
        <ElCard class="mb-4">
            <template #header>
                <div class="card-header">
                    <span class="font-bold">Bug 列表</span>
                </div>
            </template>
            <BugTable :data="res?.bugs_found || []"/>
        </ElCard>
    </Page>
</template>
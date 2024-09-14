<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from 'vue';

import { Page } from '@vben/common-ui';
import { ElCard, ElLink, ElDescriptions, ElDescriptionsItem } from 'element-plus';
import { useRoute } from 'vue-router';
import { getProject } from '#/api';
import { type ProjectApi } from '#/api/project';
import BugTable from './bug-table.vue';


const res = ref<ProjectApi.ProjectDetail | null>(null)
const route = useRoute();
const { id } = route.query;

const logContent = ref<string>(''); // 用于存储日志内容
let eventSource: EventSource | null = null; // SSE 连接


onMounted(async () => {
    const projectId = Number(id);
    try {
        const projectRes = await getProject(projectId);
        res.value = projectRes;
        
        eventSource = new EventSource(`/api/fuzz/log/${projectId}`);
        eventSource.onmessage = (event) => {
            logContent.value += `${event.data}\n`;
        };

        eventSource.onerror = (error) => {
            console.error('SSE 连接出错:', error);
            eventSource?.close();
        };

    } catch (error) {
        console.error('获取项目资源失败:', error);
    }
})

onUnmounted(() => {
    eventSource?.close();
});
</script>

<template>
    <Page description="" title="项目详情">
        <ElCard class="mb-4">
            <ElDescriptions title="项目参数" :column="2">
                <ElDescriptionsItem label="项目名">{{ res?.name }}</ElDescriptionsItem>
                <ElDescriptionsItem label="类型">{{ res?.type }}</ElDescriptionsItem>
                <ElDescriptionsItem label="项目源码">
                    <ElLink type="info">{{ res?.repoUrl }}</ElLink>
                </ElDescriptionsItem>
                <ElDescriptionsItem label="Bug总数">{{ res?.bugs }}</ElDescriptionsItem>
                <ElDescriptionsItem label="开始时间">{{ res?.startTime }}</ElDescriptionsItem>
                <ElDescriptionsItem label="状态">{{ res?.status }}</ElDescriptionsItem>
                <ElDescriptionsItem label="覆盖率">{{ res?.result.coverage }}</ElDescriptionsItem>
                <ElDescriptionsItem label="任务数量">{{ res?.result.fuzzing_task_count }}</ElDescriptionsItem>
            </ElDescriptions>
        </ElCard>
        <ElCard class="mb-4">
            <template #header>
                <div class="card-header">
                    <span class="font-bold">Bug 列表</span>
                </div>
            </template>
            <BugTable :data="res?.projectBugs || []"/>
        </ElCard>
        <ElCard class="mb-4">
            <template #header>
                <div class="card-header">
                    <span class="font-bold">日志</span>
                </div>
            </template>
            <pre class="h-80 overflow-y-auto whitespace-pre-wrap text-sm p-3 rounded">{{ logContent }}</pre> 
        </ElCard>
    </Page>
</template>
<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from 'vue';

import { Page } from '@vben/common-ui';
import { ElLink, ElDescriptions, ElDescriptionsItem } from 'element-plus';
import { useRoute } from 'vue-router';
import { getProject } from '#/api';
import { type ProjectApi } from '#/api/project';
import BugTable from './bug-table.vue';
import { nextTick } from 'vue';
import { Card, CardContent, CardHeader } from '@vben/common-ui';

const res = ref<ProjectApi.ProjectDetail | null>(null)
const route = useRoute();
const { id } = route.query;

const logContent = ref<string>(''); // 用于存储日志内容
let eventSource: EventSource | null = null; // SSE 连接

const sseURL = () => {
    let link = `/fuzz/log/${id}`;
    if (import.meta.env.VITE_GLOB_API_URL) {
        link = `${import.meta.env.VITE_GLOB_API_URL}/fuzz/log/${id}`;
    }
    return link
}

onMounted(async () => {
    try {
        const projectRes = await getProject(id as string);
        res.value = projectRes;
        
        eventSource = new EventSource(sseURL());
        eventSource.onmessage = async (event) => {
            logContent.value += `${event.data}\n`;
            await scrollToBottom();
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

const scrollArea = ref<HTMLElement | null>(null);

const scrollToBottom = async () => {
  await nextTick();
  if (scrollArea.value) {
    scrollArea.value.scrollTop = scrollArea.value.scrollHeight;
  }
};
</script>

<template>
    <Page description="" title="项目详情">
        <Card class="mb-4">
          <CardHeader class="font-bold">项目参数</CardHeader>
          <CardContent>
            <ElDescriptions :column="2">
                <ElDescriptionsItem label="项目名">{{ res?.name }}</ElDescriptionsItem>
                <ElDescriptionsItem label="类型">{{ res?.type }}</ElDescriptionsItem>
                <ElDescriptionsItem label="项目源码">
                    <ElLink type="info">{{ res?.repoUrl }}</ElLink>
                </ElDescriptionsItem>
                <template v-if="res?.type==='openFuzz'">
                  <ElDescriptionsItem label="编译器">{{ res?.param.compiler }}</ElDescriptionsItem>
                  <ElDescriptionsItem label="默认编译配置">{{ res?.param.compilerSettings }}</ElDescriptionsItem>
                  <ElDescriptionsItem label="模糊测试时间">{{ res?.param.fuzzTime }}</ElDescriptionsItem>
                  <ElDescriptionsItem label="模糊测试目标">{{ res?.param.fuzzTarget }}</ElDescriptionsItem>
                  <ElDescriptionsItem label="模糊测试命令">{{ res?.param.fuzzCommands }}</ElDescriptionsItem>
                </template>
            </ElDescriptions>
          </CardContent>
        </Card>
        <Card class="mb-4" v-if="res?.type==='openFuzz'">
          <CardHeader class="font-bold">FUZZ报告</CardHeader>
          <CardContent>
            <ElDescriptions :column="3">
                <ElDescriptionsItem label="Bug总数">{{ res?.bugs }}</ElDescriptionsItem>
                <ElDescriptionsItem label="开始时间">{{ res?.startTime }}</ElDescriptionsItem>
                <ElDescriptionsItem label="状态">{{ res?.status }}</ElDescriptionsItem>
                <ElDescriptionsItem label="覆盖率">{{ res?.coverage }}</ElDescriptionsItem>
                <ElDescriptionsItem label="任务数量">{{ res?.taskCount }}</ElDescriptionsItem>
            </ElDescriptions>
          </CardContent>
        </Card>
        <Card class="mb-4">
          <CardHeader class="font-bold">Bug列表</CardHeader>
          <CardContent>
            <BugTable :data="res?.projectBugs || []"/>
          </CardContent>
        </Card>
        <Card class="mb-4">
          <CardHeader class="font-bold">日志</CardHeader>
          <CardContent>
            <pre ref="scrollArea" class="h-80 overflow-y-auto whitespace-pre-wrap text-sm p-3 rounded">{{ logContent }}</pre> 
          </CardContent>
        </Card>
    </Page>
</template>

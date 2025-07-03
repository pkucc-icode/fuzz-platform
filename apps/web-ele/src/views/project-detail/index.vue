<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from 'vue';

import { Page } from '@vben/common-ui';
import { ElLink, ElDescriptions, ElDescriptionsItem } from 'element-plus';
import { useRoute } from 'vue-router';
import { getProject } from '#/api';
import { type ProjectApi } from '#/api/project';
import BugTable from './bug-table.vue';
<<<<<<< HEAD
import ScanCard from './scan-card.vue';
import { nextTick } from 'vue';
import { Card, CardContent, CardHeader } from '@vben/common-ui';
import { Download } from 'lucide-vue-next';

=======
import { nextTick } from 'vue';
import { Card, CardContent, CardHeader } from '@vben/common-ui';
>>>>>>> 9327addec79cb6ad385a3fa1ef864cecd81b6694

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
<<<<<<< HEAD


const getDownloadLink = () => {
    let link = `/download/pdf/${id}`;
    if (import.meta.env.VITE_GLOB_API_URL) {
        link = `${import.meta.env.VITE_GLOB_API_URL}/download/pdf/${id}`;
    }
    return link
}
=======
>>>>>>> 9327addec79cb6ad385a3fa1ef864cecd81b6694
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
<<<<<<< HEAD
          <CardHeader class="font-bold">源码FUZZ报告</CardHeader>
=======
          <CardHeader class="font-bold">FUZZ报告</CardHeader>
>>>>>>> 9327addec79cb6ad385a3fa1ef864cecd81b6694
          <CardContent>
            <ElDescriptions :column="3">
                <ElDescriptionsItem label="Bug总数">{{ res?.bugs }}</ElDescriptionsItem>
                <ElDescriptionsItem label="开始时间">{{ res?.startTime }}</ElDescriptionsItem>
                <ElDescriptionsItem label="状态">{{ res?.status }}</ElDescriptionsItem>
                <ElDescriptionsItem label="覆盖率">{{ res?.coverage }}</ElDescriptionsItem>
                <ElDescriptionsItem label="任务数量">{{ res?.taskCount }}</ElDescriptionsItem>
<<<<<<< HEAD
                <ElDescriptionsItem label="报告下载">
                  <ElLink :href=getDownloadLink()>
                    <Download/>
                  </ElLink>
                </ElDescriptionsItem>
            </ElDescriptions>
          </CardContent>
        </Card>
        <Card class="mb-4" v-if="res?.type==='webFuzz'">
          <CardHeader class="font-bold">WebFUZZ报告</CardHeader>
          <CardContent>
            <ElDescriptions :column="3">
                <ElDescriptionsItem label="总共发现的bug数">{{ res?.result?.summary.total_buckets }}</ElDescriptionsItem>
                <ElDescriptionsItem label="当前覆盖的api请求">{{ res?.result?.summary.coverage.current }}</ElDescriptionsItem>
                <ElDescriptionsItem label="api总数">{{ res?.result?.summary.coverage.total }}</ElDescriptionsItem>
                <ElDescriptionsItem label="当前回应的请求">{{ res?.result?.summary.requests.rendered.current }}</ElDescriptionsItem>
                <ElDescriptionsItem label="总请求">{{ res?.result?.summary.requests.rendered.total }}</ElDescriptionsItem>
                <ElDescriptionsItem label="完全有效请求数（无资源创建失败）">{{ res?.result?.summary.requests.fully_valid }}</ElDescriptionsItem>
                <ElDescriptionsItem label="因无效序列未渲染的请求数">{{ res?.result?.summary.requests.invalid_due_to_sequences }}</ElDescriptionsItem>
                <ElDescriptionsItem label="因资源创建失败导致无效的请求数">{{ res?.result?.summary.requests.invalid_due_to_failed_creations }}</ElDescriptionsItem>
                <ElDescriptionsItem label="动态对象的创建总数">{{ res?.result?.summary.total_dyn_objects }}</ElDescriptionsItem>
            </ElDescriptions>
          </CardContent>
        </Card>
        <Card class="mb-4" v-if="res?.type==='sourceScan'">
          <CardHeader class="font-bold">扫描结果</CardHeader>
          <CardContent class="flex flex-col flex-wrap gap-5">
            <ScanCard v-for="item in res?.projectScans" :key="item.id" :data="item"/>
          </CardContent>
        </Card>
        <Card class="mb-4" v-else>
          <CardHeader class="font-bold">漏洞</CardHeader>
          <CardContent>
            <BugTable :data="res?.projectBugs || []" :type="res?.type"/>
          </CardContent>
        </Card>
        <Card class="mb-4">
=======
            </ElDescriptions>
          </CardContent>
        </Card>
        <Card class="mb-4">
          <CardHeader class="font-bold">Bug列表</CardHeader>
          <CardContent>
            <BugTable :data="res?.projectBugs || []"/>
          </CardContent>
        </Card>
        <Card class="mb-4" v-if="res?.type==='openFuzz'">
>>>>>>> 9327addec79cb6ad385a3fa1ef864cecd81b6694
          <CardHeader class="font-bold">日志</CardHeader>
          <CardContent>
            <pre ref="scrollArea" class="h-80 overflow-y-auto whitespace-pre-wrap text-sm p-3 rounded">{{ logContent }}</pre> 
          </CardContent>
        </Card>
    </Page>
</template>

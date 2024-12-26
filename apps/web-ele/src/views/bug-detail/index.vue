<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { Page } from '@vben/common-ui';
import { ElButton, ElCard, ElLink } from 'element-plus';
import { useRoute } from 'vue-router';

import { getBugDetail, downloadCrash } from '#/api/bug/index';

interface BugDetail {
    type: string;
    desc: string;
    fix: string;
    codeText: string;
    report: string;
    crash: string;
    detail: Record<string, any>;
}

const route = useRoute();
const { id } = route.query;
const res = ref<BugDetail>({
    desc: "",
    fix: "",
    codeText:"",
    report:"",
    crash:"",
    type: "",
    detail: {

    },
})

onMounted(async () => {
    try {
        const bugRes = await getBugDetail(id as string);
        res.value = bugRes;
    } catch (error) {
        console.error('获取项目资源失败:', error);
    }
})

const getDownloadLink = () => {
    let link = `/download/crash/${id}`;
    if (import.meta.env.VITE_GLOB_API_URL) {
        link = `${import.meta.env.VITE_GLOB_API_URL}/download/crash/${id}`;
    }
    return link
}
</script>

<template>
    

    <Page description="" title="Bug详细信息" v-if="res.type === 'webfuzz'">
        <ElCard class="mb-4">
            <template #header>
                <div class="card-header">
                    <span class="font-bold">Bug报告文件</span>
                </div>
            </template>
            <pre>
                {{ res.report }}
            </pre>
        </ElCard>

        <ElCard class="mb-4">
            <template #header>
                <div class="card-header">
                    <span class="font-bold">Bug复现文件</span>
                </div>
            </template>
            <pre>
                {{ res.crash }}
            </pre>
        </ElCard>
    </Page>

    <Page description="" title="Bug详细信息" v-else>
        <ElCard class="mb-4">
            <template #header>
                <div class="card-header">
                    <span class="font-bold">描述</span>
                </div>
            </template>
            <span class="text-amber-300">
                问题：{{ res.desc }}
            </span>
            <div class="py-2">
                <p class="font-bold text-teal-500">
                    修复建议：{{ res.fix }}
                </p>
            </div>
        </ElCard>
        <ElCard class="mb-4">
            <template #header>
                <div class="card-header">
                    <span class="font-bold">源码</span>
                </div>
            </template>
            <pre>
                {{ res.codeText }}
            </pre>
        </ElCard>
        <ElCard class="mb-4">
            <template #header>
                <div class="card-header">
                    <span class="font-bold">报告</span>
                </div>
            </template>
            <pre>
                {{ res.report }}
            </pre>
        </ElCard>
        <ElCard class="mb-4">
            <template #header>
                <div class="card-header">
                    <span class="font-bold">Crash 文件下载</span>
                </div>
            </template>
            <ElLink :href=getDownloadLink()>下载</ElLink>
        </ElCard>
    </Page>
</template>
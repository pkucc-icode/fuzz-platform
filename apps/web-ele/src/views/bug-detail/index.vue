<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { Page } from '@vben/common-ui';
import { ElCard } from 'element-plus';
import { useRoute } from 'vue-router';

import { getBug } from '#/api';

interface BugDetail {
    codeText: string;
    report: string;
    crash: string;
}

const route = useRoute();
const { id } = route.query;
const res = ref<BugDetail>({
    codeText:"",
    report:"",
    crash:""
})

onMounted(async () => {
    const projectId = Number(id);
    try {
        const bugRes = await getBug(projectId);
        res.value = bugRes;
    } catch (error) {
        console.error('获取项目资源失败:', error);
    }
})
</script>

<template>
    <Page description="" title="Bug详情">
        <ElCard class="mb-4">
            <template #header>
                <div class="card-header">
                    <span class="font-bold">源码</span>
                </div>
            </template>
            <pre>
                <code>
                    {{ res.codeText }}
                </code>
            </pre>
        </ElCard>
        <ElCard class="mb-4">
            <template #header>
                <div class="card-header">
                    <span class="font-bold">报告</span>
                </div>
            </template>
            {{ res.report }}
        </ElCard>
        <ElCard class="mb-4">
            <template #header>
                <div class="card-header">
                    <span class="font-bold">Crash</span>
                </div>
            </template>
            {{ res.crash }}
        </ElCard>
    </Page>
</template>
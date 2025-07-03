<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { Page } from '@vben/common-ui';
import { ElButton, ElCard, ElLink } from 'element-plus';
import { useRoute } from 'vue-router';

import { getBugDetail, downloadCrash } from '#/api/bug/index';

interface BugDetail {
<<<<<<< HEAD
    type: string;
=======
>>>>>>> 9327addec79cb6ad385a3fa1ef864cecd81b6694
    desc: string;
    fix: string;
    codeText: string;
    report: string;
    crash: string;
<<<<<<< HEAD
    detail: Record<string, any>;
    stackList: string[];
=======
>>>>>>> 9327addec79cb6ad385a3fa1ef864cecd81b6694
}

const route = useRoute();
const { id } = route.query;
const res = ref<BugDetail>({
    desc: "",
    fix: "",
    codeText:"",
    report:"",
<<<<<<< HEAD
    crash:"",
    type: "",
    detail: {

    },
    stackList: [],
=======
    crash:""
>>>>>>> 9327addec79cb6ad385a3fa1ef864cecd81b6694
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
<<<<<<< HEAD

</script>

<template>
    <Page description="" title="漏洞详细信息" v-if="res.type === 'webfuzz'">
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

    <Page description="" title="漏洞详细信息" v-else>

=======
</script>

<template>
    <Page description="" title="Bug详细信息">
>>>>>>> 9327addec79cb6ad385a3fa1ef864cecd81b6694
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
<<<<<<< HEAD

=======
>>>>>>> 9327addec79cb6ad385a3fa1ef864cecd81b6694
        <ElCard class="mb-4">
            <template #header>
                <div class="card-header">
                    <span class="font-bold">源码</span>
                </div>
            </template>
<<<<<<< HEAD
            <!-- whitespace-pre-wrap 当文本宽度超出 pre 标签的容器宽度时，文本会自动换行显示，而不会被截断 -->
            <pre class="whitespace-pre-wrap">
                {{ res.codeText }}
            </pre>
        </ElCard>

        <ElCard class="mb-4" v-if="res.stackList && res.stackList.length > 0">
            <template #header>
                <div class="card-header">
                    <span class="font-bold">调用链</span>
                </div>
            </template>
            <div class="chain-container">
                <div v-for="(item, index) in res.stackList" :key="index" class="chain-row">
                    <!-- 调用链条目 -->
                    <div class="chain-box">
                        {{ item }}
                    </div>

                    <!-- 箭头 -->
                    <div v-if="index < res.stackList.length - 1" class="arrow-row">
                        <div class="arrow">
                            <span class="arrow-line"></span>
                        </div>
                    </div>
                </div>
            </div>
        </ElCard>
        
=======
            <pre>
                {{ res.codeText }}
            </pre>
        </ElCard>
>>>>>>> 9327addec79cb6ad385a3fa1ef864cecd81b6694
        <ElCard class="mb-4">
            <template #header>
                <div class="card-header">
                    <span class="font-bold">报告</span>
                </div>
            </template>
<<<<<<< HEAD
            <div class="scrollable-content">
                <pre class="whitespace-pre-wrap">
                    {{ res.report }}
                </pre>
            </div>
        </ElCard>
        
=======
            <pre>
                {{ res.report }}
            </pre>
        </ElCard>
>>>>>>> 9327addec79cb6ad385a3fa1ef864cecd81b6694
        <ElCard class="mb-4">
            <template #header>
                <div class="card-header">
                    <span class="font-bold">Crash 文件下载</span>
                </div>
            </template>
            <ElLink :href=getDownloadLink()>下载</ElLink>
        </ElCard>
    </Page>
<<<<<<< HEAD
</template>

<style scoped>
.chain-container {
    display: flex;
    flex-direction: column;
    gap: 24px;
    padding: 16px;
    background: linear-gradient(135deg, #1d1f27, #313642); /* 背景 */
    border-radius: 8px;
    color: #e0e0e0;
    font-family: 'Courier New', Courier, monospace;
    overflow-y: auto;
    max-height: 400px;
}

.chain-row {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative; /* Ensures positioning of arrows works correctly */
}

.chain-box {
    padding: 12px;
    background: #2a2e39;
    border-radius: 6px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    white-space: pre-wrap;
    word-break: break-word;
    width: 100%;
}

.arrow-row {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 48px; /* 箭头的行高 */
    position: absolute;
    top: 100%; /* Position the arrow directly below the previous box */
}

.arrow {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.arrow-line {
    width: 2px;
    height: 20px; /* Make the line shorter to connect boxes */
    background-color: #ff6363; /* 箭尾颜色 */
    position: relative;
    top: -14px; /* Adjust so the line fits perfectly between boxes */
    left: -160px; /* Shift the line slightly to the left */
}

.arrow-line::after {
    content: '';
    position: absolute;
    top: 6%; /* Arrow points down */
    left: 50%;
    transform: translateX(-50%) rotate(-135deg);
    border: 10px solid transparent;
    border-left: 6px solid #ff6363; /* 箭头尖端颜色 */
    border-top: 6px solid #ff6363;
}
</style>

<style scoped>
.scrollable-content {
    overflow-x: auto; 
    white-space: pre; 
}

pre {
    margin: 0;
}
</style>
=======
</template>
>>>>>>> 9327addec79cb6ad385a3fa1ef864cecd81b6694

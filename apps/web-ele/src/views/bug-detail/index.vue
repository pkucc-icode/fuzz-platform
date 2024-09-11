<script lang="ts" setup>

import { Page } from '@vben/common-ui';
import { ElCard } from 'element-plus';

const { code, crash, report } = window.history.state || {};

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
                    {{ code }}
                </code>
            </pre>
        </ElCard>
        <ElCard class="mb-4">
            <template #header>
                <div class="card-header">
                    <span class="font-bold">报告</span>
                </div>
            </template>
            {{ report }}
        </ElCard>
        <ElCard class="mb-4">
            <template #header>
                <div class="card-header">
                    <span class="font-bold">Crash</span>
                </div>
            </template>
            {{ crash }}
        </ElCard>
    </Page>
</template>
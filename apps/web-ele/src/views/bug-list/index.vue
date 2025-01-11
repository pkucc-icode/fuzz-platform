<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { Page } from '@vben/common-ui';
import { Card, CardHeader, CardContent } from '@vben/common-ui';
import { ElButton, ElCard, ElDescriptions, ElDescriptionsItem } from 'element-plus';
import BugTable from './bug-table/index.vue';
import { useRoute } from 'vue-router';
import { listProject } from '#/api';


const totalBugs = ref(0);
const totalProjects = ref(0);

onMounted(async () => {
    try {
        const projects = await listProject();
        const bugsNumber = projects.reduce((sum, project) => {
            return sum + (project.bugs || 0); // 如果 bugs 字段不存在，默认为 0
        }, 0);
        totalBugs.value = bugsNumber;
        totalProjects.value = projects.length;
    } catch (error) {
        console.error('获取项目资源失败:', error);
    }
})

const route = useRoute();

</script>

<template>
    <Page description="" title="漏洞清单">
        <Card class="mb-4">
          <CardHeader class="font-bold">漏洞清单</CardHeader>
          <CardContent>
            <ElDescriptions :column="2">
                <ElDescriptionsItem label="项目总数量">{{ totalProjects }}</ElDescriptionsItem>
                <ElDescriptionsItem label="发现bug数量">{{ totalBugs }}</ElDescriptionsItem>
                <ElDescriptionsItem label="发现bug类型">
                    {{ 12 }}
                </ElDescriptionsItem>
                <ElDescriptionsItem label="漏洞编号数量">{{ 12 }}</ElDescriptionsItem>
                <ElDescriptionsItem label="漏洞编号类型">{{ 54 }}</ElDescriptionsItem>
            </ElDescriptions>
          </CardContent>
        </Card>

        <div class="mt-5 flex flex-col">
            <div class="mb-4 w-full">
                <BugTable />
            </div>
        </div>

    </Page>

</template>
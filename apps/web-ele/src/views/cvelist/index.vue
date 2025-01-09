<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { Page } from '@vben/common-ui';
import { Card, CardHeader, CardContent } from '@vben/common-ui';
import { ElButton, ElCard, ElDescriptions, ElDescriptionsItem } from 'element-plus';
import CVETable from './cve-table/index.vue';
import { useRoute } from 'vue-router';

const route = useRoute();

</script>

<template>
    <Page description="" title="漏洞清单">
        <Card class="mb-4">
          <CardHeader class="font-bold">漏洞清单</CardHeader>
          <CardContent>
            <ElDescriptions :column="2">
                <ElDescriptionsItem label="项目总数量">{{ 33 }}</ElDescriptionsItem>
                <ElDescriptionsItem label="发现bug数量">{{ 23 }}</ElDescriptionsItem>
                <ElDescriptionsItem label="发现bug类型">
                    {{ 32 }}
                </ElDescriptionsItem>
                <ElDescriptionsItem label="漏洞编号数量">{{ 12 }}</ElDescriptionsItem>
                <ElDescriptionsItem label="漏洞编号类型">{{ 54 }}</ElDescriptionsItem>
            </ElDescriptions>
          </CardContent>
        </Card>

        <div class="mt-5 flex flex-col">
            <div class="mb-4 w-full">
                <CVETable />
            </div>
        </div>

    </Page>

</template>
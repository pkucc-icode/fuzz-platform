<script lang="ts" setup>

import {
  AnalysisChartCard,
  AnalysisOverview,
  type AnalysisOverviewItem,
} from '@vben/common-ui';

import {
  SvgBugIcon,
  SvgDoingIcon,
  SvgFinishIcon,
  SvgProjectIcon,
} from '@vben/icons';
import { ref, watchEffect } from 'vue';
import AnalyticsVisitsData from './analytics-visits-data.vue';
import AnalyticsVisitsSource from './analytics-visits-source.vue';
import ProjectTable from './project-table/index.vue'
import { listProject } from '#/api';
import { useQuery } from '@tanstack/vue-query';

const { data } = useQuery({
    queryKey: ['projects'],
    queryFn: listProject,
});
const overviewItems = ref<AnalysisOverviewItem[]>([]);
watchEffect(() => {
  const projects: Record<string, any>[] = data.value;
  if (projects) {
    const all = projects.length;
    const finished = projects.filter(p => p.status === 'SUCCESS').length;
    const running = projects.filter(p => p.status === 'RUNNING').length;
    // 使用 reduce 方法对 bugs 字段求和
    const totalBugs = projects.reduce((sum, project) => {
      return sum + (project.bugs || 0); // 如果 bugs 字段不存在，默认为 0
    }, 0);
    overviewItems.value = [
      {
        icon: SvgProjectIcon,
        title: '项目数量',
        totalTitle: '项目数量',
        totalValue: all,
        value: all,
      },
      {
        icon: SvgFinishIcon,
        title: '已完成任务',
        totalTitle: '已完成任务',
        totalValue: finished,
        value: finished,
      },
      {
        icon: SvgDoingIcon,
        title: '进行中任务',
        totalTitle: '进行中任务',
        totalValue: running,
        value: running,
      },
      {
        icon: SvgBugIcon,
        title: '总Bug数量',
        totalTitle: '总Bug数量',
        totalValue: totalBugs,
        value: totalBugs,
      },
    ];
  }
})

</script>

<template>
  <div class="p-5">
    <div class="mt-5 w-full md:flex">
        <AnalysisChartCard class="mt-5 md:mr-4 md:mt-0 md:w-1/2" title="漏洞类型分布">
          <AnalyticsVisitsSource />
        </AnalysisChartCard>
        <AnalysisChartCard class="mt-5 md:mr-4 md:mt-0 md:w-1/2" title="扫描汇总">
          <AnalyticsVisitsData />
        </AnalysisChartCard>
    </div>
    
    <AnalysisOverview :items="overviewItems" class="mt-5"/>

    <div class="mt-5 flex flex-col">
      <div class="mb-4 w-full">
        <ProjectTable />
      </div>
    </div>
  </div>
</template>

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

import AnalyticsVisitsSource from './analytics-visits-source.vue';
import ProjectTable from './project-table/index.vue'

const overviewItems: AnalysisOverviewItem[] = [
  {
    icon: SvgProjectIcon,
    title: '项目数量',
    totalTitle: '项目数量',
    totalValue: 120_000,
    value: 2000,
  },
  {
    icon: SvgFinishIcon,
    title: '已完成任务',
    totalTitle: '已完成任务',
    totalValue: 500_000,
    value: 20_000,
  },
  {
    icon: SvgDoingIcon,
    title: '进行中任务',
    totalTitle: '进行中任务',
    totalValue: 120_000,
    value: 8000,
  },
  {
    icon: SvgBugIcon,
    title: '总Bug数量',
    totalTitle: '总Bug数量',
    totalValue: 50_000,
    value: 5000,
  },
];

</script>

<template>
  <div class="p-5">
    <AnalysisOverview :items="overviewItems" />

    <div class="mt-5 flex flex-col">
      <div class="mb-4 w-full">
        <ProjectTable />
      </div>
      <div class="w-full">
        <AnalysisChartCard title="漏洞类型分布">
          <AnalyticsVisitsSource />
        </AnalysisChartCard>
      </div>
    </div>
  </div>
</template>

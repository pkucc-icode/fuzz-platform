<script lang="ts" setup>
import type {
  WorkbenchProjectItem,
  WorkbenchQuickNavItem,
  WorkbenchTodoItem,
  WorkbenchTrendItem,
} from '@vben/common-ui';

import { ref } from 'vue';

import {
  AnalysisChartCard,
  WorkbenchHeader,
  WorkbenchProject,
  WorkbenchQuickNav,
  WorkbenchTodo,
  WorkbenchTrends,
  AnalysisOverview,
} from '@vben/common-ui';

import {
  SvgBellIcon,
  SvgCakeIcon,
  SvgCardIcon,
  SvgDownloadIcon,
} from '@vben/icons';

import { preferences } from '@vben/preferences';
import { useUserStore } from '@vben/stores';

import AnalyticsVisitsSource from './analytics-visits-source.vue';
import ProjectTable from './project-table.vue'

const userStore = useUserStore();


const overviewItems: AnalysisOverviewItem[] = [
  {
    icon: SvgCardIcon,
    title: '项目数量',
    totalTitle: '项目数量',
    totalValue: 120_000,
    value: 2000,
  },
  {
    icon: SvgCakeIcon,
    title: '已完成任务',
    totalTitle: '已完成任务',
    totalValue: 500_000,
    value: 20_000,
  },
  {
    icon: SvgDownloadIcon,
    title: '进行中任务',
    totalTitle: '进行中任务',
    totalValue: 120_000,
    value: 8000,
  },
  {
    icon: SvgBellIcon,
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

    <div class="mt-5 flex flex-col lg:flex-row">
      <div class="mr-4 w-full lg:w-3/5">
        <ProjectTable />
      </div>
      <div class="w-full lg:w-2/5">
        <AnalysisChartCard title="漏洞类型分布">
          <AnalyticsVisitsSource />
        </AnalysisChartCard>
      </div>
    </div>
  </div>
</template>

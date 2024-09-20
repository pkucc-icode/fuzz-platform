import { h } from 'vue';

import {
  CircleIcon,
  QuestionMarkCircledIcon,
  StopwatchIcon,
} from '@radix-icons/vue';

export const status = [
  {
    icon: h(CircleIcon),
    label: '运行',
    value: 'RUNNING',
  },
  {
    icon: h(StopwatchIcon),
    label: '暂停',
    value: 'STOP',
  },
  {
    icon: h(QuestionMarkCircledIcon),
    label: '成功',
    value: 'SUCCESS',
  },
  {
    icon: h(StopwatchIcon),
    label: '失败',
    value: 'FAIL',
  },
];

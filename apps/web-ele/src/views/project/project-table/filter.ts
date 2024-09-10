import { h } from 'vue';

import {
  CircleIcon,
  QuestionMarkCircledIcon,
  StopwatchIcon,
} from '@radix-icons/vue';

export const status = [
  {
    icon: h(QuestionMarkCircledIcon),
    label: '成功',
    value: '2',
  },
  {
    icon: h(CircleIcon),
    label: '运行',
    value: '0',
  },
  {
    icon: h(StopwatchIcon),
    label: '失败',
    value: '3',
  },
];
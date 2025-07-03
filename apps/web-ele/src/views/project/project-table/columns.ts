import type { ColumnDef } from '@tanstack/vue-table';

import { h } from 'vue';

import { Checkbox } from '@vben/common-ui';
import { router } from '#/router';
import ColumnHeader from './column-header.vue';
import RowActions from './row-actions.vue';
import { Loader, CirclePause, Check, CircleX } from 'lucide-vue-next';
import { tableDateFormat } from '#/utils/date';
import { ElTag } from 'element-plus';

export interface Project {
  id: string;
  bugs: number;
  startTime: Date;
  status: string;
  name: string;
  type: string;
}

export const columns: ColumnDef<Project>[] = [
  {
    cell: ({ row }) =>
      h(Checkbox, {
        ariaLabel: 'Select row',
        checked: row.getIsSelected(),
        'onUpdate:checked': (value) => row.toggleSelected(!!value),
      }),
    enableHiding: false,
    enableSorting: false,
    header: ({ table }) =>
      h(Checkbox, {
        ariaLabel: 'Select all',
        checked:
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate'),
        'onUpdate:checked': (value) => table.toggleAllPageRowsSelected(!!value),
      }),
    id: 'select',
  },
  {
    accessorKey: 'name',
    cell: ({ row }) => {
      const id = row.original.id;
      return h('a', { 
        class: 'lowercase cursor-pointer hover:underline',
        onClick: (e) => {
          e.preventDefault();
          router.push(`/project-detail?id=${id}`);
        },
       }, row.getValue('name'));
    },
    header: ({ column }) =>
      h(ColumnHeader, {
        column,
        title: '项目名',
      }),
  },
  {
    accessorKey: 'type',
    cell: ({ row }) =>{
      return h(ElTag, { class: 'lowercase', type: 'info' }, row.getValue('type'))
    },
    header: ({ column }) =>
      h(ColumnHeader, {
        column,
        title: '项目类型',
      }),
  },
  {
    accessorKey: 'bugs',
    cell: ({ row }) => {
      return h('div', { class: 'font-medium' }, row.getValue('bugs'));
    },
    header: ({ column }) =>
      h(ColumnHeader, {
        column,
        title: 'Bug数量',
      }),
  },
  {
    accessorKey: 'startTime',
    cell: ({ row }) =>
      h('div', { class: 'capitalize' }, tableDateFormat(row.getValue('startTime'))),
    header: ({ column }) =>
      h(ColumnHeader, {
        column,
        title: '开始时间',
      }),
  },
  {
    accessorKey: 'status',
    cell: ({ row }) => {
      const status = row.original.status;
      if (status === 'RUNNING') {
        return h(Loader, { class: 'text-indigo-500 animate-spin' }, '运行中');
      } else if (status === 'STOP') {
        return h(CirclePause, { class: 'text-orange-500' }, '暂停');
      } else if (status === 'SUCCESS') {
        return h(Check, { class: 'text-green-500' }, '成功');
      } else {
        return h(CircleX, { class: 'text-red-500' }, '失败');
      }
    },
    header: ({ column }) =>
      h(ColumnHeader, {
        column,
        title: '状态',
      }),
  },
  {
    cell: ({ row }) => {
      const project = row.original;

      return h(
        'div',
        { class: 'relative text-right' },
        h(RowActions, {
          onExpand: row.toggleExpanded,
          project,
        }),
      );
    },
    enableHiding: false,
    header: () => h('div', { class: 'text-right' }, '操作'),
    id: 'actions',
  },
];

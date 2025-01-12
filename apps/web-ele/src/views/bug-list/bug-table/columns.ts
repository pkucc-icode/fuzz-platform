import type { ColumnDef } from '@tanstack/vue-table';

import { h } from 'vue';

import { Checkbox } from '@vben/common-ui';
import { router } from '#/router';
import ColumnHeader from './column-header.vue';
import RowActions from './row-actions.vue';
import { FilePenLine, Trash } from 'lucide-vue-next';
import { tableDateFormat } from '#/utils/date';
import { delBug } from '#/api';
import { ElTag } from 'element-plus';
import { ElMessage } from 'element-plus';



export interface Bug {
  id: string;
  cve: string;
  name: string;
  type: string;
  risk: string;
  publicReport: string;
  project: {
    id: string;
    name: string;
  };
}

export const columns: ColumnDef<Bug>[] = [
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
    accessorKey: 'cve',
    cell: ({ row }) =>{
      return h('div', { class: 'lowercase', type: 'info' }, row.getValue('cve') || "Unknown")
    },
    header: ({ column }) =>
      h(ColumnHeader, {
        column,
        title: 'CVE编号',
      }),
  },
  {
    accessorKey: 'name',
    cell: ({ row }) => {
      const id = row.original.id;
      return h('a', { 
        class: 'lowercase cursor-pointer hover:underline',
        onClick: (e) => {
          e.preventDefault();
          router.push(`/bug-detail?id=${id}`);
        },
       }, row.getValue('name'));
    },
    header: ({ column }) =>
      h(ColumnHeader, {
        column,
        title: '漏洞名',
      }),
  },
  {
    accessorKey: 'name',
    cell: ({ row }) => {
      const project = row.original.project;
      return h('a', { 
        class: 'lowercase cursor-pointer hover:underline',
        onClick: (e) => {
          e.preventDefault();
          router.push(`/project-detail?id=${project.id}`);
        },
       }, project?.name);
    },
    header: ({ column }) =>
      h(ColumnHeader, {
        column,
        title: '项目',
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
        title: '漏洞类型',
      }),
  },
  {
    accessorKey: 'risk',
    cell: ({ row }) => {
      return h('div', { class: 'font-medium' }, row.getValue('risk'));
    },
    header: ({ column }) =>
      h(ColumnHeader, {
        column,
        title: '风险等级',
      }),
  },
  {
    accessorKey: 'publicReport',
    cell: ({ row }) => {
      return h('a', { 
        class: 'font-medium',
        href: row.getValue('publicReport')
      }, row.getValue('publicReport'));
    },
    header: ({ column }) =>
      h(ColumnHeader, {
        column,
        title: '漏洞公告',
      }),
  },

  {
    accessorKey: 'actions',
    cell: ({ row }) => {
      const id = row.original.id;
      return h('div', 
        { 
          class: 'flex items-center space-x-2',
        }, 
        [
          // FilePenLine 图标
          h(FilePenLine, {
            class: 'font-medium cursor-pointer',
            onClick: (e) => {
              e.preventDefault();
              router.push(`/bug-edit?id=${id}`);
            },
          }, row.getValue('risk')),
  
          // Trash 图标
          h(Trash, {
            class: 'font-medium cursor-pointer', // 添加红色样式
            onClick: async (e) =>  {
              e.preventDefault();
              // 在这里添加删除逻辑
              console.log(`Delete item with id: ${id}`);
              await delBug(id);
              ElMessage.success('操作成功');
            },
          }),
        ]
      );
    },
    header: ({ column }) =>
      h(ColumnHeader, {
        column,
        title: '操作',
      }),
  },
  
];

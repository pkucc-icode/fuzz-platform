<script lang="ts" setup>
import { reactive, ref } from 'vue';

import { Page } from '@vben/common-ui';

import {
  ElButton,
  ElCard,
  ElForm,
  ElFormItem,
  ElInput,
  ElMessage,
  ElSpace,
  type FormInstance,
  type FormRules,
} from 'element-plus';
import { Plus, Trash } from 'lucide-vue-next';

import { closeFuzz } from '#/api';

interface FuzzCommand {
  key: number;
  value: string;
}

interface RuleForm {
  name: string;
  repoUrl: string;
  compiler: string;
  compilerSettings: string;
  fuzz: string;
  fuzzTime: string;
  fuzzTarget: string;
  fuzzCommands: FuzzCommand[];
}

const form = reactive<RuleForm>({
  compiler: '',
  compilerSettings: '',
  fuzz: '',
  fuzzCommands: [
    {
      key: Date.now(),
      value: '',
    },
  ],
  fuzzTarget: '',
  fuzzTime: '',
  name: '',
  repoUrl: '',
});

const rules = reactive<FormRules<RuleForm>>({
  name: [{ message: '请输入项目名', required: true, trigger: 'blur' }],
  repoUrl: [{ message: '请输入Git地址', required: true, trigger: 'blur' }],
});

const ruleFormRef = ref<FormInstance>();
const loading = ref<boolean>(false);

const onSubmit = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;

  await formEl.validate((valid, fields) => {
    if (valid) {
      console.warn('submit!', fields);
    } else {
      console.error('error submit!', fields);
    }
  });

  loading.value = true;
  try {
    await closeFuzz(form);
  } catch {
    ElMessage.error('提交失败');
  } finally {
    loading.value = false;
  }
  ElMessage.success('操作成功');
};

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};

const removeCommand = (item: FuzzCommand) => {
  const index = form.fuzzCommands.indexOf(item);
  if (index !== -1) {
    form.fuzzCommands.splice(index, 1);
  }
};

const addCommand = () => {
  form.fuzzCommands.push({
    key: Date.now(),
    value: '',
  });
};
</script>

<template>
  <Page description="支持多种编程语言" title="闭源 Fuzz">
    <ElCard class="mb-5">
      <ElForm
        ref="ruleFormRef"
        :model="form"
        :rules="rules"
        class="mx-auto max-w-[800px]"
        label-width="auto"
      >
        <ElFormItem label="项目名" prop="name">
          <ElInput v-model="form.name" />
        </ElFormItem>
        <ElFormItem label="项目代码" prop="repoUrl">
          <ElInput v-model="form.repoUrl" />
        </ElFormItem>
        <ElFormItem label="编译器">
          <ElInput v-model="form.compiler" />
        </ElFormItem>
        <ElFormItem label="默认编译配置">
          <ElInput v-model="form.compilerSettings" />
        </ElFormItem>
        <ElFormItem label="模糊器">
          <ElInput v-model="form.fuzz" />
        </ElFormItem>
        <ElFormItem label="模糊测试时间">
          <ElInput v-model="form.fuzzTime" />
        </ElFormItem>
        <ElFormItem label="模糊测试目标程序">
          <ElInput v-model="form.fuzzTarget" />
        </ElFormItem>
        <ElFormItem
          v-for="(item, index) in form.fuzzCommands"
          :key="item.key"
          label="模糊测试命令"
        >
          <ElSpace direction="horizontal">
            <ElInput v-model="item.value" />
            <ElButton
              v-if="index === 0"
              :icon="Plus"
              color="#626aef"
              type="primary"
              @click="addCommand"
            />
            <ElButton
              v-if="index !== 0"
              :icon="Trash"
              @click.prevent="removeCommand(item)"
            />
          </ElSpace>
        </ElFormItem>
        <ElFormItem class="mt-10">
          <ElButton
            color="#626aef"
            type="primary"
            @click="onSubmit(ruleFormRef)"
          >
            提交
          </ElButton>
          <ElButton plain @click="resetForm(ruleFormRef)">重置</ElButton>
        </ElFormItem>
      </ElForm>
    </ElCard>
  </Page>
</template>

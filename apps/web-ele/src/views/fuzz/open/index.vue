<script lang="ts" setup>
import { reactive, ref } from 'vue';

import { Page } from '@vben/common-ui';

import {
  ElButton,
  ElCard,
  ElCol,
  ElForm,
  ElFormItem,
  ElInput,
  ElMessage,
  ElRow,
  ElSpace,
  ElUpload,
  type FormInstance,
  type FormRules,
  type UploadUserFile,
} from 'element-plus';
import { Plus, Trash } from 'lucide-vue-next';

import { openFuzz } from '#/api';
import { router } from '#/router';

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
});

const ruleFormRef = ref<FormInstance>();
const loading = ref<boolean>(false);

const onSubmit = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;

  await formEl.validate(async (valid, fields) => {
    if (valid) {
      loading.value = true;
      try {
        await openFuzz(form);
      } catch {
        ElMessage.error('提交失败');
      } finally {
        loading.value = false;
      }
      ElMessage.success('操作成功');
      router.push("/analytics")
    } else {
      console.error('error submit!', fields);
      ElMessage.error('提交失败');
    }
  });
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

const fileList = ref<UploadUserFile[]>([]);
</script>

<template>
  <Page description="支持多种编程语言" title="源码 Fuzz">
    <ElCard class="mb-5">
      <ElForm
        ref="ruleFormRef"
        :model="form"
        :rules="rules"
        class="mx-auto mt-10 max-w-[900px]"
        label-width="auto"
      >
        <ElRow :gutter="50">
          <ElCol :span="12">
            <ElFormItem label="项目名" prop="name">
              <ElInput v-model="form.name" placeholder="请输入项目名" />
            </ElFormItem>
            <ElFormItem label="项目代码" prop="repoUrl">
              <ElInput
                v-model="form.repoUrl"
                placeholder="请输入代码仓库地址"
              />
            </ElFormItem>
            <ElFormItem label="or">
              <ElUpload
                v-model:file-list="fileList"
                action="/upload"
                class="upload-demo"
              >
                <ElButton color="#626aef" type="primary">点击上传代码</ElButton>
              </ElUpload>
            </ElFormItem>
            <ElFormItem label="编译器">
              <ElInput
                v-model="form.compiler"
                placeholder="Default llvm-clang"
              />
            </ElFormItem>
          </ElCol>

          <ElCol :span="12">
            <ElFormItem label="默认编译配置">
              <ElInput
                v-model="form.compilerSettings"
                placeholder="Default null"
              />
            </ElFormItem>
            <ElFormItem label="模糊器">
              <ElInput v-model="form.fuzz" placeholder="Default AFL++" />
            </ElFormItem>
            <ElFormItem label="模糊测试时间">
              <ElInput v-model="form.fuzzTime" placeholder="Default 1day" />
            </ElFormItem>
            <ElFormItem label="模糊测试目标程序">
              <ElInput v-model="form.fuzzTarget" placeholder="Default all" />
            </ElFormItem>
            <ElFormItem
              v-for="(item, index) in form.fuzzCommands"
              :key="item.key"
              label="模糊测试命令"
            >
              <ElSpace direction="horizontal">
                <ElInput v-model="item.value" placeholder="Default null" />
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
          </ElCol>
        </ElRow>
        <ElFormItem class="mt-10">
          <ElButton
            :loading="loading"
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

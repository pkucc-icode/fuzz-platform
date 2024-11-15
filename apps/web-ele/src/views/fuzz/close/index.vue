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
  ElUpload,
  type FormInstance,
  type FormRules,
  type UploadUserFile,
} from 'element-plus';

import { closeFuzz } from '#/api';
import { router } from '#/router';

interface FuzzCommand {
  key: number;
  value: string;
}

interface RuleForm {
  id: string | undefined;
  name: string;
  repoUrl: string;
}

const form = reactive<RuleForm>({
  id: undefined,
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
        await closeFuzz(form);
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

const fileList = ref<UploadUserFile[]>([]);
</script>

<template>
  <Page description="支持多种编程语言" title="闭源 Fuzz">
    <ElCard class="mb-5">
      <ElForm
        ref="ruleFormRef"
        :model="form"
        :rules="rules"
        class="mx-auto mt-10 max-w-[800px]"
        label-width="auto"
      >
        <ElRow :gutter="50">
          <ElCol :span="12">
            <ElFormItem label="项目名" prop="name">
              <ElInput v-model="form.name" placeholder="请输入项目名" />
            </ElFormItem>
            <ElFormItem label="项目文件">
              <ElUpload
                v-model:file-list="fileList"
                action="/upload"
                class="upload-demo"
              >
                <ElButton type="primary">点击上传</ElButton>
              </ElUpload>
            </ElFormItem>
          </ElCol>
        </ElRow>
        <ElFormItem class="mt-10">
          <ElButton
            :loading="loading"
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

<script lang="ts" setup>
import { reactive, ref } from 'vue';

import { Page } from '@vben/common-ui';
import { Card, CardContent } from '@vben/common-ui';
import {
  ElButton,
  // ElCard,
  ElCol,
  ElForm,
  ElFormItem,
  ElInput,
  ElMessage,
  ElRow,
  ElSwitch,
  ElUpload,
  type FormInstance,
  type FormRules,
  type UploadUserFile,
} from 'element-plus';

import { webFuzz } from '#/api';
import { router } from '#/router';

interface RuleForm {
  name: string;
  filePath: string;
  executionTime: string;
  tokenRefreshInterval: string;
  tokenRefreshCommand: string;
  useSSL: boolean;
  enableCheckers: string;
  disableCheckers: string;
  targetIp: string;
  domain: string;
  targetPort: string;
}

const form = reactive<RuleForm>({
  name: '',
  filePath: '',
  executionTime: '',
  tokenRefreshInterval: '',
  tokenRefreshCommand: '',
  useSSL: false,
  enableCheckers: '',
  disableCheckers: '',
  targetIp: '',
  domain: '',
  targetPort: '',
});

const fileList = ref<UploadUserFile[]>([]);

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
        await webFuzz(form);
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

const afterUpload = (response: any) => {
  form.filePath = response.data[0].filepath;
}

</script>

<template>
  <Page description="支持多种编程语言" title="Web Fuzz">
    <!-- <ElCard class="mb-5"> -->
    <Card>
      <CardContent>
        <ElForm
          ref="ruleFormRef"
          :model="form"
          :rules="rules"u
          class="mx-auto mt-10"
          label-width="auto"
        >
          <ElRow :gutter="24" justify="center">
            <ElCol :xs="18" :sm="16" :md="12" :lg="10" :xl="6">
              <ElFormItem label="项目名" prop="name" label-position="left">
                <ElInput v-model="form.name" placeholder="请输入项目名" />
              </ElFormItem>
              <ElFormItem label="测试时间" label-position="left">
                <ElInput v-model="form.executionTime" placeholder="" />
              </ElFormItem>
              <ElFormItem label="配置文件" label-position="left">
                <ElUpload
                  v-model:file-list="fileList"
                  action="/api/upload"
                  :on-success="afterUpload"
                  class="upload-demo"
                >
                  <ElButton type="primary">点击上传代码</ElButton>
                </ElUpload>
              </ElFormItem>
              <ElFormItem label="token刷新间隔" label-position="left">
                <ElInput v-model="form.tokenRefreshInterval" placeholder="" />
              </ElFormItem>
              <ElFormItem label="token刷新命令" label-position="left">
                <ElInput v-model="form.tokenRefreshCommand" placeholder="" />
              </ElFormItem>
            </ElCol>

            <ElCol :xs="18" :sm="16" :md="12" :lg="10" :xl="6">
              <ElFormItem label="是否使用SSL" label-position="left">
                <ElSwitch v-model="form.useSSL" placeholder="Example 122.33.33.2" />
              </ElFormItem>
              <ElFormItem label="开启漏洞类型检查" label-position="left">
                <ElInput v-model="form.enableCheckers" placeholder="多个用空格分隔" />
              </ElFormItem>
              <ElFormItem label="关闭漏洞类型检查" label-position="left">
                <ElInput v-model="form.disableCheckers" placeholder="多个用空格分隔" />
              </ElFormItem>
              <ElFormItem label="目标IP" label-position="left">
                <ElInput v-model="form.targetIp" placeholder="127.0.0.1" />
              </ElFormItem>
              <ElFormItem label="目标域名" label-position="left">
                <ElInput v-model="form.domain" placeholder="www.example.com" />
              </ElFormItem>
              <ElFormItem label="目标端口" label-position="left">
                <ElInput v-model="form.targetPort" placeholder="3000" />
              </ElFormItem>
              <div class="my-10">
                <ElButton
                  :loading="loading"
                  type="primary"
                  @click="onSubmit(ruleFormRef)"
                >
                  提交
                </ElButton>
                <ElButton plain @click="resetForm(ruleFormRef)">重置</ElButton>
              </div>
            </ElCol>
          </ElRow>
        </ElForm>
      </CardContent>
    </Card>
    <!-- </ElCard> -->
  </Page>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue';

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
  // ElSpace,
  ElUpload,
  type FormInstance,
  type FormRules,
  type UploadUserFile,
} from 'element-plus';
// import { Plus, Trash } from 'lucide-vue-next';

import { codeAudit, getProject } from '#/api';
import { router } from '#/router';
import { useRoute } from 'vue-router';

// interface FuzzCommand {
//   key: number;
//   value: string;
// }

interface RuleForm {
  id: string | undefined;
  name: string;
  repoUrl: string;
  filePath: string | undefined;
}

const form = reactive<RuleForm>({
  name: '',
  repoUrl: '',
  filePath: undefined,
  id: undefined,
});

const rules = reactive<FormRules<RuleForm>>({
  name: [{ message: '请输入项目名', required: true, trigger: 'blur' }],
});

const ruleFormRef = ref<FormInstance>();
const loading = ref<boolean>(false);
const fileList = ref<UploadUserFile[]>([]);

const route = useRoute();
const { id, command } = route.query;

onMounted(async () => {
  if (id) {
    const project = await getProject(id as string);
    if (project) {
      if (command === 'new'){ // 用原项目信息新开一个项目
        form.id = undefined;
      }
      else if (command === 'modify'){ // 修改原项目信息
        form.id = project.id;
      }
      form.name = project.name;
      form.repoUrl = project.repoUrl;
    }

  }
})

const onSubmit = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;

  await formEl.validate(async (valid, fields) => {
    if (valid) {
      loading.value = true;
      try {
        const res = await codeAudit(form);
        console.log(res);
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
  <Page description="支持多种编程语言" title="">
    <!-- <ElCard class="mb-5"> -->
    <Card>
      <CardContent>
        <ElForm
          ref="ruleFormRef"
          :model="form"
          :rules="rules"
          class="mx-auto mt-10"
          label-width="auto"
        >
          <ElRow :gutter="24" justify="center">
            <ElCol :xs="18" :sm="16" :md="12" :lg="10" :xl="6">
              <ElFormItem label="项目名" prop="name" label-position="left">
                <ElInput v-model="form.name" placeholder="请输入项目名" />
              </ElFormItem>
              <ElFormItem label="项目代码" prop="repoUrl" label-position="left">
                <ElInput
                  v-model="form.repoUrl"
                  placeholder="请输入代码仓库地址"
                />
              </ElFormItem>
              <ElFormItem label="or">
                <ElUpload
                  v-model:file-list="fileList"
                  action="/api/upload"
                  :on-success="afterUpload"
                  accept="application/zip"
                  class="upload-demo"
                >
                  <ElButton type="primary">点击上传代码</ElButton>
                </ElUpload>
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

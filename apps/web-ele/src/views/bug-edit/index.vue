<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue';
import { Page } from '@vben/common-ui';
import {
  ElButton,
  // ElCard,
  ElCol,
  ElForm,
  ElFormItem,
  ElInput,
  ElMessage,
  ElRow,
  ElSelect,
  ElOption,
  type FormInstance,
  type FormRules,
} from 'element-plus';
import { useRoute } from 'vue-router';
import { router } from '#/router';
import { getBugDetail, addBug, editBug } from '#/api/bug/index';
import { listProject } from '#/api/project/index';

const route = useRoute();
const { id } = route.query;

const options = ref([
    {
        value: "无", 
        label: "无",
    }
]);


interface RuleForm {
  id: string | undefined;
  name: string;
  cve: string;
  type: string;
  risk: string;
  projectId: string;
  publicReport: string;
  report: string;
  crash: string;
  desc: string;
  fix: string;
  codeText: string;
}

const form = reactive<RuleForm>({
  id: undefined,
  name: "",
  cve: '',
  type: '',
  risk: "",
  projectId: "",
  publicReport: "",
  report: "",
  crash: "",
  desc: "",
  fix: "",
  codeText: "",
});

onMounted(async () => {
    const projects = await listProject();
    options.value = projects.map(p => ({
        value: p.id,
        label: p.name,
    }))
    if (!id) {
        return
    }
    try {
        const bugRes = await getBugDetail(id as string);
        Object.keys(bugRes).forEach((key) => {
          // @ts-ignore
          form[key] = bugRes[key];
        });
    } catch (error) {
        console.error('获取项目资源失败:', error);
    }
})



const rules = reactive<FormRules<RuleForm>>({
    name: [{ message: '请输入名称', required: true, trigger: 'blur' }],
});

const ruleFormRef = ref<FormInstance>();
const loading = ref<boolean>(false);

const onSubmit = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;

  await formEl.validate(async (valid, fields) => {
    if (valid) {
      loading.value = true;
      try {
        if (form.id) {
          await editBug(form);
        } else {
          await addBug(form);
        }
      } catch {
        ElMessage.error('提交失败');
      } finally {
        loading.value = false;
      }
      ElMessage.success('操作成功');
      router.push("/buglist")
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

</script>

<template>
    <Page description="" title="编辑漏洞">
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
                <ElFormItem label="漏洞名称" prop="name" label-position="left">
                  <ElInput v-model="form.name" placeholder="请输入漏洞名称" />
                </ElFormItem>
                <ElFormItem label="漏洞编号" prop="name" label-position="left">
                  <ElInput v-model="form.cve" placeholder="请输入漏洞编号" />
                </ElFormItem>
                <ElFormItem label="漏洞类型" label-position="left">
                    <ElInput v-model="form.type" placeholder="请输入漏洞类型" />
                </ElFormItem>
                <ElFormItem label="风险等级" label-position="left">
                    <ElInput v-model="form.risk" placeholder="请输入风险等级" />
                </ElFormItem>
                <ElFormItem label="项目信息" label-position="left">
                    <ElSelect v-model="form.projectId" placeholder="请输入项目信息" >
                        <ElOption
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        />
                    </ElSelect>
                </ElFormItem>
                <ElFormItem label="报告" label-position="left">
                    <ElInput v-model="form.report" placeholder="报告" type="textarea"/>
                </ElFormItem>
                <ElFormItem label="Crash" label-position="left">
                    <ElInput v-model="form.crash" placeholder="Crash" type="textarea"/>
                </ElFormItem>
                <ElFormItem label="源代码" label-position="left">
                    <ElInput v-model="form.codeText" placeholder="源代码"  type="textarea"/>
                </ElFormItem>
                <ElFormItem label="描述" label-position="left">
                    <ElInput v-model="form.desc" placeholder="请输入漏洞描述"  type="textarea"/>
                </ElFormItem>
                <ElFormItem label="修复意见" label-position="left">
                    <ElInput v-model="form.fix" placeholder="请输入修复意见" type="textarea"/>
                </ElFormItem>
                <ElFormItem label="漏洞公告" label-position="left">
                    <ElInput v-model="form.publicReport" placeholder="请输入漏洞公告" />
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
    </Page>
</template>

<style scoped>
.chain-container {
    display: flex;
    flex-direction: column;
    gap: 24px;
    padding: 16px;
    background: linear-gradient(135deg, #1d1f27, #313642); /* 背景 */
    border-radius: 8px;
    color: #e0e0e0;
    font-family: 'Courier New', Courier, monospace;
    overflow-y: auto;
    max-height: 400px;
}

.chain-row {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative; /* Ensures positioning of arrows works correctly */
}

.chain-box {
    padding: 12px;
    background: #2a2e39;
    border-radius: 6px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    white-space: pre-wrap;
    word-break: break-word;
    width: 100%;
}

.arrow-row {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 48px; /* 箭头的行高 */
    position: absolute;
    top: 100%; /* Position the arrow directly below the previous box */
}

.arrow {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.arrow-line {
    width: 2px;
    height: 20px; /* Make the line shorter to connect boxes */
    background-color: #ff6363; /* 箭尾颜色 */
    position: relative;
    top: -14px; /* Adjust so the line fits perfectly between boxes */
    left: -160px; /* Shift the line slightly to the left */
}

.arrow-line::after {
    content: '';
    position: absolute;
    top: 6%; /* Arrow points down */
    left: 50%;
    transform: translateX(-50%) rotate(-135deg);
    border: 10px solid transparent;
    border-left: 6px solid #ff6363; /* 箭头尖端颜色 */
    border-top: 6px solid #ff6363;
}
</style>

<style scoped>
.scrollable-content {
    overflow-x: auto; 
    white-space: pre; 
}

pre {
    margin: 0;
}
</style>
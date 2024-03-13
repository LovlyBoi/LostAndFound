<template>
  <div class="container w-3/5 min-h-full m-auto">
    <NSteps class="pt-10 ml-16" :current="(currentRef as number)" :status="currentStatus">
      <NStep title="选择需求类型" description="Lost or Found" />
      <NStep title="填写基本信息" description="Basic Message" />
      <NStep title="预览发布信息" description="Preview the Message" />
    </NSteps>
    <div v-if="currentRef === 1" class="type-group text-center mt-20">
      <NRadioGroup class="type-btn" v-model:value="type" name="radiobuttongroup1">
        <NRadioButton class="text-2xl text-center h-8 mr-20" value="1">
          <SeekIcon font-size="120px" class="m-auto mt-5" />
          寻物
        </NRadioButton>
      </NRadioGroup>
      <NRadioGroup class="type-btn" v-if="currentRef === 1" v-model:value="type" name="radiobuttongroup1">
        <NRadioButton class="text-2xl text-center h-8 mr-20" value="2">
          <FoundIcon font-size="120px" class="m-auto mt-5" />
          招领
        </NRadioButton>
      </NRadioGroup>
    </div>
    <div v-if="currentRef === 2" class="flex items-center justify-center pt-10">
      <NForm class="w-full max-w-lg space-y-8" ref="formRef" :rules="rules" :model="modelRef" label-placement="left"
        label-width="auto" require-mark-placement="right-hanging">
        <div>
          <NFormItem path="title" label="标题">
            <NInput v-model:value="modelRef.title" @keydown.enter.prevent placeholder="请输入标题" />
          </NFormItem>
          <NFormItem path="contactName" label="联系人">
            <NInput v-model:value="modelRef.contactName" @keydown.enter.prevent placeholder="请输入联系人姓名" />
          </NFormItem>
          <NFormItem path="contactPhone" label="联系电话">
            <NInput v-model:value="modelRef.contactPhone" @keydown.enter.prevent placeholder="请输入联系电话" />
          </NFormItem>
          <NFormItem path="fileList" label="上传图片">
            <NUpload action="/" :max="3" @change="handleUploadChange" @finish="handleFinish" @preview="handlePreview"
              :default-file-list="modelRef.fileList" list-type="image-card">
              点击上传
            </NUpload>
            <NModal v-model:show="showModalRef" preset="card" style="width: 600px" title="一张很酷的图片">
              <img :src="previewImageUrlRef" style="width: 100%">
            </NModal>
          </NFormItem>
          <NFormItem path="content" label="描述">
            <NInput v-model:value="modelRef.content" type="textarea" placeholder="请输入描述信息" />
          </NFormItem>
        </div>

      </NForm>
    </div>
    <div v-if="currentRef === 3" class="overflow-auto" style="max-height: calc(100vh - 200px);">
      <h2 class="leading-3 text-2xl mt-8 mb-4">【{{ type === '1' ? '寻物' : '招领' }}】{{ modelRef?.title }}</h2>
      <section class="flex flex-col pl-4">

        <p class="text-gray-500">联系人：{{ modelRef?.contactName }}</p>
        <p class="text-gray-500">联系电话：{{ modelRef?.contactPhone }}</p>
      </section>
      <main class="my-8">
        {{ modelRef?.content }}
      </main>
      <div class="flex justify-center">
        <NImage v-for="item in modelRef?.photos" :key="item" :src="item" />
      </div>
    </div>
    <NButtonGroup class="absolute bottom-6 mr-20" style="left:45%">
      <NButton @click="prev" :disabled="currentRef === 1">
        上一步
      </NButton>
      <NButton @click="next" v-if="currentRef && currentRef < 3">
        下一步
      </NButton>
      <NButton @click="submit" v-if="currentRef === 3">
        提交
      </NButton>
    </NButtonGroup>
  </div>

</template>

<script setup lang="ts">
import { FormInst, FormItemRule, NButton, NButtonGroup, NForm, NFormItem, NImage, NInput, NModal, NRadioButton, NRadioGroup, NStep, NSteps, NUpload, StepsProps, UploadFileInfo, useMessage } from 'naive-ui';
import { ref } from 'vue'
import SeekIcon from '@/pages/publishLost/icons/SeekIcon.vue'
import FoundIcon from '@/pages/publishLost/icons/FoundIcon.vue'
import { ModelType } from './type';


const previewImageUrlRef = ref('')
const showModalRef = ref(false)
const formRef = ref<FormInst | null>(null)
const type = ref(null)
const currentRef = ref<number | null>(1)
const currentStatus = ref<StepsProps['status']>('process')
const message = useMessage()

const modelRef = ref<ModelType>({
  title: null,
  contactName: null,
  contactPhone: null,
  fileList: [],
  photos: [],
  content: null,
})

const rules = {
  title: {
    required: true,
    trigger: 'blur',
    message: '请输入标题',
  },
  contactName: {
    required: true,
    trigger: ['input'],
    validator: (rule: FormItemRule, value: string) => {
      if (!value) return Error('请输入联系人姓名')
      const pattern = /^([A-Za-z0-9_\u4e00-\u9fa5]{4,16})/
      if (!pattern.test(value)) {
        return Error('用户名格式错误(4~16位字母、汉字、数字、下划线)')
      }
      return true
    }
  },
  contactPhone: {
    required: true,
    trigger: ['input'],
    validator: (rule: FormItemRule, value: string) => {
      const pattern = /^1[3-9]\d{9}$/.test(value)
      if (!pattern) {
        return Error('请输入正确的手机号码')
      }
      return true
    }
  }
}

function handlePreview(file: UploadFileInfo) {
  const { url } = file
  previewImageUrlRef.value = url as string
  showModalRef.value = true
}
const handleUploadChange = async (data: { fileList: UploadFileInfo[] }) => {
  modelRef.value.photos = []
  modelRef.value.fileList = data?.fileList;
  const arr: any = [];
  data.fileList.forEach(async (item) => {
    const res = await fileToBase64(item?.file)
    arr.push(res)
  })
  modelRef.value.photos = arr;
}

function fileToBase64(file: any) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      const base64String = reader?.result?.toString();
      resolve(base64String);
    };
    reader.onerror = function () {
      reject(new Error("Failed to load file"));
    };
  });
}


const handleFinish = ({
  file,
  event
}: {
  file: UploadFileInfo
  event?: ProgressEvent
}) => {
  message.success((event?.target as XMLHttpRequest).response)
  const ext = file.name.split('.')[1]
  file.name = `更名.${ext}`
  file.url = '__HTTPS__://www.mocky.io/v2/5e4bafc63100007100d8b70f'
  return file
}

const next = () => {
  if (currentRef?.value === null) {
    currentRef.value = 1;
    return;
  }
  if (currentRef.value === 1) {
    if (!type.value) {
      message.info('请选择您想要发布的类型')
    }
    else currentRef.value++;
  }
  if (currentRef.value === 2) {
    formRef.value?.validate((errors) => {
      if (!errors && currentRef.value) {
        currentRef.value++
      }
    })
  }
}

const prev = () => {
  if (currentRef.value === 0) currentRef.value = null
  else if (currentRef.value === null) currentRef.value = 4
  else currentRef.value--
}

const submit = () => {
  console.log({ type: type.value, data: modelRef.value })
}

</script>

<style scoped>
.type-btn .n-radio-button {
  width: 200px;
  height: 200px;
  border: 1px solid var(--n-button-border-color);
}
</style>

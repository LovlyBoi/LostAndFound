<template>
  <div class="container w-3/5 min-h-full m-auto">
    <NSteps
      class="pt-10 ml-16"
      :current="currentRef as number"
      :status="currentStatus"
    >
      <NStep title="选择需求类型" description="Lost or Found" />
      <NStep title="填写基本信息" description="Basic Message" />
      <NStep title="预览发布信息" description="Preview the Message" />
    </NSteps>
    <div v-if="currentRef === 1" class="type-group text-center mt-20">
      <NRadioGroup
        class="type-btn"
        v-model:value="type"
        name="radiobuttongroup1"
      >
        <NRadioButton class="text-2xl text-center h-8 mr-20" value="1">
          <SeekIcon font-size="120px" class="m-auto mt-5" />
          寻物
        </NRadioButton>
      </NRadioGroup>
      <NRadioGroup
        class="type-btn"
        v-if="currentRef === 1"
        v-model:value="type"
        name="radiobuttongroup1"
      >
        <NRadioButton class="text-2xl text-center h-8 mr-20" value="2">
          <FoundIcon font-size="120px" class="m-auto mt-5" />
          招领
        </NRadioButton>
      </NRadioGroup>
    </div>
    <div v-if="currentRef === 2" class="flex items-center justify-center pt-10">
      <BasicMessage :modelRef="modelRef" ref="basicInfoRef" />
    </div>
    <div
      v-if="currentRef === 3"
      class="overflow-auto"
      style="max-height: calc(100vh - 200px)"
    >
      <Preview :modelRef="modelRef" :type="type" />
    </div>
    <NSpace class="absolute bottom-6 mr-20" style="left: 43%">
      <NButton @click="prev" :disabled="currentRef === 1"> 上一步 </NButton>
      <NButton @click="next" v-if="currentRef && currentRef < 3">
        下一步
      </NButton>
      <NButton @click="submit" v-if="currentRef === 3"> 提 交 </NButton>
    </NSpace>
  </div>
</template>

<script setup lang="ts">
import {
  NButton,
  NRadioButton,
  NRadioGroup,
  NSpace,
  NStep,
  NSteps,
  StepsProps,
  useMessage,
} from 'naive-ui'
import { ref } from 'vue'
import SeekIcon from '@/pages/publishLost/icons/SeekIcon.vue'
import FoundIcon from '@/pages/publishLost/icons/FoundIcon.vue'
import { ModelType } from './type'
import BasicMessage from './components/BasicMessage.vue'
import Preview from './components/Preview.vue'

const type = ref<string | null>(null)
const currentRef = ref<number | null>(1)
const currentStatus = ref<StepsProps['status']>('process')
const message = useMessage()
const basicInfoRef = ref()

const modelRef = ref<ModelType>({
  title: null,
  contactName: null,
  contactPhone: null,
  fileList: [],
  photos: [],
  content: null,
})

const next = () => {
  if (currentRef?.value === null) {
    currentRef.value = 1
    return
  }
  if (currentRef.value === 1) {
    if (!type.value) {
      message.info('请选择您想要发布的类型')
    } else currentRef.value++
  }
  if (currentRef.value === 2) {
    basicInfoRef.value?.formRef?.validate((errors: any) => {
      if (!errors && currentRef.value) {
        currentRef.value++
        modelRef.value = basicInfoRef.value?.modelRef
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
  message.success('提交成功')
}
</script>

<style scoped>
.type-btn .n-radio-button {
  width: 200px;
  height: 200px;
  border: 1px solid var(--n-button-border-color);
}
</style>

<template>
  <div class="max-w-[1140px] mx-auto mb-[30px]">
    <div class="flex flex-row-reverse my-4">
      <NButton @click="showThankModal = true">发表感谢</NButton>
    </div>
    <NGrid :cols="3" :x-gap="12" :y-gap="12" class="mt-4">
      <NGi v-for="thank in thanks" :key="thank.id">
        <NCard embedded hoverable class="cursor-pointer">
          <template #header>{{ thank.content }}</template>
          <template #footer>
            <span class="text-gray-400 text-xs">{{ thank.createTime }}</span>
          </template>
        </NCard>
      </NGi>
    </NGrid>
    <div class="flex justify-center mt-6">
      <NButton
        v-if="hasMore"
        strong
        secondary
        class="bg-[#2e3338]/5"
        icon-placement="left"
        :disabled="isLoading"
        @click="loadMore"
      >
        <template #icon>
          <NIcon>
            <ArrowDownOutline />
          </NIcon>
        </template>
        加载更多
      </NButton>
      <NDivider v-else dashed>
        <span class="font-normal text-sm">暂时就这么多了...</span>
      </NDivider>
    </div>
    <NModal
      class="w-[600px]"
      v-model:show="showThankModal"
      preset="dialog"
      positive-text="确认"
      negative-text="算了"
      title="发表感谢"
      @positive-click="publishThank"
      @negative-click="showThankModal = false"
    >
      <NInput
        class="mt-4"
        v-model:value="thankMessage"
        placeholder="感谢..."
      ></NInput>
    </NModal>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import {
  NGrid,
  NGi,
  NIcon,
  NButton,
  NDivider,
  NCard,
  NModal,
  NInput,
  useMessage,
} from 'naive-ui'
import { ArrowDownOutline } from '@vicons/ionicons5'
import type { Thanks } from '@/api/thanks'
import { qryThanks, publishThank as publishThankApi } from '@/api'

const message = useMessage()

const showThankModal = ref(false)

const thankMessage = ref('')

const pn = ref(1)
const ps = ref(6)
const total = ref(0)

const isLoading = ref(true)

const hasMore = ref(false)

const thanks = ref<Thanks[]>([])

function getThanks() {
  isLoading.value = true
  console.log(pn.value)
  qryThanks(pn.value, ps.value)
    .then(({ records: res, total: t }) => {
      console.log(res)
      thanks.value = [...thanks.value, ...res]
      total.value = t
      hasMore.value = ps.value * pn.value < t
      pn.value += 1
    })
    .catch((err) => {
      console.error(err)
    })
    .finally(() => {
      isLoading.value = false
    })
}

getThanks()

function loadMore() {
  getThanks()
}

function publishThank() {
  if (!thankMessage.value) return
  publishThankApi(thankMessage.value)
    .then(({ success }) => {
      if (!success) {
        return message.error('发表感谢失败')
      }
      thankMessage.value = ''
      pn.value = 1
      thanks.value = []
      getThanks()
    })
    .finally(() => {
      showThankModal.value = false
    })
}
</script>

<style scoped>
:deep(.n-button--primary-type) {
  background-color: green !important;
}
</style>

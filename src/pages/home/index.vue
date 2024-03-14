<template>
  <div class="max-w-[1140px] mx-auto mb-[30px]">
    <div class="w-full text-red-500 h-[30px] leading-[30px] my-4">
      <NIcon size="16">
        <SparklesOutline />
      </NIcon>
      公告：{{ '12312313' }}
    </div>
    <NGrid :cols="3" :x-gap="12" :y-gap="12" class="mt-4">
      <NGi v-for="(message, index) in messages" :key="message.id">
        <FoundCard v-if="index % 2 === 1" :message></FoundCard>
        <LostCard v-else :message></LostCard>
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
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { NGrid, NGi, NIcon, NButton, NDivider } from 'naive-ui'
import { SparklesOutline, ArrowDownOutline } from '@vicons/ionicons5'
import FoundCard from './components/FoundCard.vue'
import LostCard from './components/LostCard.vue'
import { getLostAndFoundMessages } from './data'
import { BaseMessageDTO } from '@/type'

const isLoading = ref(true)

const hasMore = ref(false)

const messages = ref<BaseMessageDTO[]>([])

getLostAndFoundMessages()
  .then((res) => {
    messages.value = res
  })
  .catch((err) => {
    console.error(err)
  })
  .finally(() => {
    isLoading.value = false
  })

function loadMore() {
  isLoading.value = true
  getLostAndFoundMessages()
    .then((res) => {
      messages.value = [...messages.value, ...res]
    })
    .catch((err) => {
      console.error(err)
    })
    .finally(() => {
      isLoading.value = false
    })
}
</script>
../../type
<template>
  <div class="max-w-[1140px] mx-auto mb-[30px]">
    <Announcement :announcements></Announcement>
    <NGrid :cols="3" :x-gap="12" :y-gap="12" class="mt-4">
      <NGi v-for="message in messageStore.messages" :key="message.id">
        <FoundCard v-if="message.type == 0" :message></FoundCard>
        <LostCard v-else :message></LostCard>
      </NGi>
    </NGrid>
    <div class="flex justify-center mt-6">
      <NButton
        v-if="messageStore.hasMore"
        strong
        secondary
        class="bg-[#2e3338]/5"
        icon-placement="left"
        :disabled="messageStore.isLoading"
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
import { ArrowDownOutline } from '@vicons/ionicons5'
import FoundCard from './components/FoundCard.vue'
import LostCard from './components/LostCard.vue'
import Announcement, {
  type Announcement as TAnnouncement,
} from '@/components/Announcement/index.vue'
import { useMessageStore } from '@/store/messageStore'
import { qryAnnouncements } from '@/api'

const messageStore = useMessageStore()

const announcements = ref<TAnnouncement[]>([])

function getAnnouncements() {
  qryAnnouncements()
    .then((res) => {
      announcements.value = res.records
    })
    .catch((err) => {
      console.error(err)
    })
}

getAnnouncements()

function loadMore() {
  messageStore.getMessages()
}

messageStore.getMessages()
</script>

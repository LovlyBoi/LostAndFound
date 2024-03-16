<template>
  <BaseCard type="found" @click="handleClick">
    <template #header>{{ props.message.title }}</template>
    <template #default>
      <div>
        <section class="h-[32px] text-[14px] leading-[16px] line-clamp-2">
          {{ props.message.content }}
        </section>
        <div class="mt-2 max-h-[200px] overflow-hidden">
          <img
            class="max-h-full max-w-full hover:scale-110 transition-all"
            :src="props.message.photos[0]"
          />
        </div>
      </div>
    </template>
  </BaseCard>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'
import BaseCard from './BaseCard.vue'
import type { MessageRecord } from '@/api/messages'

const props = defineProps<{
  message: MessageRecord
}>()

const router = useRouter()

function handleClick() {
  console.log('found clicked')
  router.push(`/detail/${props.message.id}`)
}
</script>../../../type

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
            :src="props.message.photo1"
          />
        </div>
      </div>
    </template>
  </BaseCard>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'
import BaseCard from './BaseCard.vue'
import { BaseMessageDTO } from '@/type'

const props = defineProps<{
  message: BaseMessageDTO
}>()

const router = useRouter()

function handleClick() {
  console.log('found clicked')
  router.push(`/detail/${props.message.id}`)
}
</script>../../../type

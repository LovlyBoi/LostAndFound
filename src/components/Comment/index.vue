<template>
  <div class="flex mb-4">
    <div class="mr-[12px]">
      <NAvatar
        round
        size="medium"
        src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
      />
    </div>
    <div class="flex flex-col max-w-[600px]">
      <p class="text-gray-500 text-sm mb-[4px]">
        <span class="mr-2">{{ name }}</span>
        <span class="font-thin">{{ dayjs(createTime).fromNow() }}</span>
      </p>
      <p class="mb-[12px]">
        {{ content }}
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { NAvatar } from 'naive-ui'
import { dayjs } from '@/utils/day'

defineProps<{
  name: string
  createTime: string
  content: string
}>()
</script>../../utils/day

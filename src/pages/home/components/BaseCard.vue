<template>
  <NCard embedded hoverable class="cursor-pointer">
    <template #header>
      <div
        class="text-sm font-thin inline-block px-2 rounded mr-2 relative -top-[1px]"
        :class="[type === 'lost' ? 'bg-yellow-200' : 'bg-green-200']"
      >
        {{ type === 'lost' ? '寻物' : '招领' }}
      </div>
      <slot name="header"></slot>
    </template>
    <template #default>
      <slot></slot>
    </template>
  </NCard>
</template>

<script lang="ts" setup>
import { NCard } from 'naive-ui'

defineProps<{
  type: 'lost' | 'found'
}>()
</script>

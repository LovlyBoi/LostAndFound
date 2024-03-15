<template>
  <div class="h-[30px] overflow-hidden my-4">
    <div class="announcement-wrapper" :data-count="announcements.length">
      <div
        class="announcement-item w-full text-red-500 h-[30px] leading-[30px]"
        v-for="(a, i) in announcements"
        :key="i"
        :data-index="i + 1"
        :data-count="announcements.length"
      >
        <NIcon size="16">
          <SparklesOutline />
        </NIcon>
        {{ a.title }}：{{ a.content }}
      </div>
      <div
        class="announcement-item w-full text-red-500 h-[30px] leading-[30px]"
        v-if="announcements.length > 1"
        :data-index="1"
        :data-count="announcements.length"
      >
        <NIcon size="16">
          <SparklesOutline />
        </NIcon>
        {{ announcements[0].title }}：{{ announcements[0].content }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { NIcon } from 'naive-ui'
import { SparklesOutline } from '@vicons/ionicons5'
import { Announcement } from './type'

const props = defineProps<{
  announcements: Announcement[]
}>()

const TRANSITION_DURTION = 500

const translateY = ref(0)
const translateYString = computed(() => `${translateY.value}px`)

const transition = ref(true)
const transitionString = computed(() =>
  transition.value
    ? `transform ${TRANSITION_DURTION}ms ease-in-out`
    : 'unset',
)

function next() {
  translateY.value -= 30
  if (translateY.value === -30 * props.announcements.length) {
    // 到了最后一个公告，回到第一个公告
    setTimeout(() => {
      translateY.value = 0
      transition.value = false
      setTimeout(() => {
        transition.value = true
      }, 10)
    }, TRANSITION_DURTION)
  }
}

setInterval(() => {
  next()
}, 5000)
</script>

<script lang="ts">
export type { Announcement } from './type'
</script>

<style>
.announcement-wrapper {
  transition: v-bind(transitionString);
  transform: translateY(v-bind(translateYString));
}
</style>

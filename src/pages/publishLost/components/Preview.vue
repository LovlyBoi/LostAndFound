<template>
  <h2 class="leading-3 text-2xl mt-8 mb-4">
    【{{ type === '1' ? '寻物' : '招领' }}】{{ modelRef?.title }}
  </h2>
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
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { ModelType } from '../type'
import { NImage } from 'naive-ui'

const props = defineProps<{
  modelRef: ModelType
  type: string | null
}>()

const modelRef = ref(props.modelRef)
const type = ref(props.type)
console.log(modelRef)
</script>

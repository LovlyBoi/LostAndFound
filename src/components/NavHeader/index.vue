<template>
  <header class="h-[44px] bg-teal-50">
    <div class="mx-[80px] h-full flex justify-between">
      <RouterLink to="/" class="h-full flex items-center px-2">
        <NIcon size="36" class="text-cyan-600">
          <Earth />
        </NIcon>
        <h2 class="text-lg font-semibold tracking-wide leading-[44px] ml-4">
          Where is my ... ???
        </h2>
      </RouterLink>
      <div
        class="flex items-center justify-center group transition-all"
        :class="[isFocused ? 'w-[240px]' : 'w-[88px]']"
      >
      <div v-if="!isLogin" class="flex">
        <RouterLink to="/login" class="w-12 underline px-2 tracking-wide">登录</RouterLink>
        <RouterLink to="/setup" class="w-12 underline px-2 tracking-wide">注册</RouterLink>
      </div>
        <NInput
          v-if="isHome"
          ref="inputRef"
          round
          placeholder="搜索"
          v-model:value="sreachInfo"
          :input-props="{
            class: 'whitespace-nowrap text-ellipsis overflow-hidden',
          }"
          @focus="isFocused = true"
          @blur="isFocused = false"
          @keydown.enter="handleSearch"
        >
          <template #prefix>
            <NIcon
              size="24"
              class="text-slate-500 group-hover:text-slate-700 cursor-pointer"
              @click="handleSearch"
            >
              <SearchOutline />
            </NIcon>
          </template>
        </NInput>
      </div>
    </div>
  </header>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { NIcon, NInput } from 'naive-ui'
import { Earth, SearchOutline } from '@vicons/ionicons5'
import { useUserStore } from '@/store/userStore'

const route = useRoute()

const isHome = computed(() => route.path === '/')

const userStore = useUserStore()

const isLogin = computed(() => !!userStore.token)

const isFocused = ref(false)

const sreachInfo = ref('')

const inputRef = ref<InstanceType<typeof NInput> | null>(null)

function handleSearch() {
  console.log(sreachInfo.value)
  inputRef.value?.blur()
}
</script>

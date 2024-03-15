<template>
  <div class="relative h-screen">
    <NDialogProvider>
      <NLayout position="absolute">
        <NLayoutHeader position="absolute">
          <NavHeader></NavHeader>
        </NLayoutHeader>
        <NLayoutContent position="absolute" style="top: 44px" has-sider>
          <NLayoutContent>
            <RouterView v-slot="{ Component }">
              <keep-alive>
                <component v-if="$route.meta.keepAlive" :is="Component" />
              </keep-alive>
              <component v-if="!$route.meta.keepAlive" :is="Component" />
            </RouterView>
          </NLayoutContent>
        </NLayoutContent>
      </NLayout>
    </NDialogProvider>
  </div>
</template>

<script setup lang="ts">
import {
  NLayout,
  NLayoutHeader,
  NLayoutContent,
  NDialogProvider,
  useMessage
} from 'naive-ui'
import NavHeader from '@/components/NavHeader/index.vue'

const message = useMessage()

window.$message = message
</script>

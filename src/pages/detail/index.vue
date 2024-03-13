<template>
  <div>
    <div class="w-[1140px] mx-auto p-8">
      <h2 class="leading-3 text-2xl mt-8 mb-4">{{ message?.title }}</h2>
      <section class="flex flex-col pl-4">
        <p class="text-gray-500">
          {{ dayjs(message?.createTime).format('YYYY 年 M 月 D 日 HH:mm:ss') }}
        </p>
        <p class="text-gray-500">联系人：{{ message?.contactName }}</p>
        <p class="text-gray-500">联系电话：{{ message?.contactPhone }}</p>
      </section>
      <main class="my-8">
        {{ message?.content }}
      </main>
      <div class="flex justify-center">
        <NImage :src="message?.photo1" />
      </div>
      <div class="flex flex-col">
        <p
          class="my-8 border-l-8 border-yellow-500 h-8 pl-2 text-xl leading-[32px]"
        >
          全部评论
        </p>
        <div class="px-8">
          <div class="mb-8 max-w-[600px]">
            <NInput
              class="bg-white"
              v-model:value="userComment"
              type="textarea"
              :autosize="{
                minRows: 4,
                maxRows: 4,
              }"
              placeholder="写下你的评论..."
              @focus="isCommentReplyShow = true"
            />
            <Transition name="slide-down">
              <section
                v-if="isCommentReplyShow"
                class="flex overflow-hidden my-2 flex-row-reverse"
              >
                <div class="flex gap-1">
                  <NButton round @click="isCommentReplyShow = false"
                    >取消</NButton
                  >
                  <NButton
                    :disabled="!userComment"
                    round
                    @click="handlePublishComment"
                    >发布</NButton
                  >
                </div>
              </section>
            </Transition>
          </div>
          <Comment
            v-for="c in comments"
            :key="c.id"
            :name="c.name"
            :create-time="c.time"
            :content="c.content"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { NImage, NInput, NButton } from 'naive-ui'
import { getMessageDetail } from './data'
import { BaseMessageDTO } from '@/type'
import { dayjs } from '@/utils/day'
import Comment from '@/components/Comment/index.vue'

const route = useRoute()

const userComment = ref('')

const message = ref<BaseMessageDTO>()

const isCommentReplyShow = ref(false)

getMessageDetail(route.params.id as string)
  .then((res) => {
    console.log(res)
    message.value = res
  })
  .catch((err) => {
    console.log(err)
  })

function handlePublishComment() {
  console.log(userComment.value)
  isCommentReplyShow.value = false
}

const comments = [
  {
    id: 1,
    name: '王二狗',
    time: '2023-04-12 12:30:00',
    content: '这是一条评论',
  },
  {
    id: 2,
    name: '王二狗',
    time: '2023-04-12 12:30:00',
    content:
      '这是一条评论 这是一条评论 这是一条评论 这是一条评论 这是一条评论 这是一条评论 这是一条评论 这是一条评论 这是一条评论 这是一条评论 这是一条评论 这是一条评论 这是一条评论 这是一条评论',
  },
  {
    id: 3,
    name: '王二狗',
    time: '2023-04-12 12:30:00',
    content: '这是一条评论',
  },
]
</script>

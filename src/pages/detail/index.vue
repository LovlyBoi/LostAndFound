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
        <NImage v-for="url in message?.photos" :src="url" />
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
                  <NButton round @click="isCommentReplyShow = false">
                    取消
                  </NButton>
                  <NButton
                    :disabled="!userComment"
                    round
                    @click="handlePublishComment"
                  >
                    发布
                  </NButton>
                </div>
              </section>
            </Transition>
          </div>
          <Comment
            v-for="c in comments"
            :key="c.id"
            :name="c.name"
            :create-time="c.createTime"
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
import { NImage, NInput, NButton, useMessage } from 'naive-ui'
import Comment from '@/components/Comment/index.vue'
import { dayjs } from '@/utils/day'
import { qryMessageById, qryComments, publishComment } from '@/api'
import type { MessageRecord } from '@/api/messages'

const route = useRoute()

const id = route.params.id as string

const userComment = ref('')

const m = useMessage()

const message = ref<MessageRecord>()

const isCommentReplyShow = ref(false)

qryMessageById(id)
  .then((res) => {
    console.log(res)
    message.value = res
  })
  .catch((err) => {
    console.log(err)
  })

function handlePublishComment() {
  console.log(userComment.value)
  publishComment({ content: userComment.value, foundMessageId: id })
    .then((res) => {
      if ((res as any).code !== 200) {
        m.error('评论失败')
        return
      }
      userComment.value = ''
      isCommentReplyShow.value = false
      getComments()
    })
    .catch((err) => {
      console.error(err)
    })
}

const comments = ref<
  {
    id: string
    name: string
    createTime: string
    content: string
  }[]
>([])

function getComments() {
  qryComments(id).then((res) => {
    console.log(res)
    comments.value = res.records.map((r) => ({
      id: r.id,
      name: r.user.loginName,
      createTime: r.createTime,
      content: r.content,
    }))
  })
}

getComments()
</script>

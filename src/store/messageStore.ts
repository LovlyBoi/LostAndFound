import { ref } from 'vue'
import { defineStore } from 'pinia'
import { qryMessage, searchMessage as searchMessageApi } from '@/api'
import type { MessageRecord } from '@/api/messages'

export const useMessageStore = defineStore('messageStore', () => {
  const messages = ref<MessageRecord[]>([])

  const pn = ref(1)
  const ps = ref(6)
  const total = ref(0)
  const hasMore = ref(false)
  const isLoading = ref(true)

  function getMessages() {
    isLoading.value = true
    qryMessage(pn.value, ps.value)
      .then(({ records: res, total: t }) => {
        console.log(res, t)
        messages.value = [...messages.value, ...res]
        total.value = t
        hasMore.value = ps.value * pn.value < t
        pn.value += 1
      })
      .catch((err) => {
        console.error(err)
      })
      .finally(() => {
        isLoading.value = false
      })
  }

  function searchMessage(query: string) {
    if (!query) {
      pn.value = 1
      messages.value = []
      getMessages()
    } else {
      searchMessageApi(query)
        .then((res) => {
          console.log(res)
          hasMore.value = false
          messages.value = res.records
        })
        .catch((err) => {
          console.error(err)
        })
    }
  }

  return {
    pn,
    ps,
    total,
    hasMore,
    isLoading,
    messages,
    getMessages,
    searchMessage,
  }
})

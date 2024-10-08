<script lang="ts" setup>
import { consoleApiClient } from '@halo-dev/api-client'
import {
  IconCheckboxFill,
  IconExternalLinkLine,
  Toast,
  VButton,
  VCard,
  VLoading
} from '@halo-dev/components'
import type { AttachmentLike } from '@halo-dev/console-shared'
import { useQuery } from '@tanstack/vue-query'
import { computed, ref, watch, watchEffect } from 'vue'
import { createClient, type FileStat, type WebDAVClient } from 'webdav'

const props = withDefaults(
  defineProps<{
    selected: AttachmentLike[]
    min?: number
    max?: number
  }>(),
  {
    selected: () => [],
    min: undefined,
    max: undefined
  }
)

const emit = defineEmits<{
  (event: 'update:selected', attachments: AttachmentLike[]): void
}>()
const selectedPhotos = ref<Set<FileStat>>(new Set())
const photos = ref<FileStat[]>([])
const topics = ref<FileStat[]>([])
const selectedTopic = ref<FileStat>()
const totalPhotos = ref<FileStat[]>([])
const page = ref(1)
const pageSize = ref(6)
const keyword = ref('')
const pluginDetailModal = ref(false)
let webDavClient: WebDAVClient | null = null
const { data: config } = useQuery({
  queryKey: ['base-config'],
  queryFn: async () => {
    const { data: configMap } = await consoleApiClient.plugin.plugin.fetchPluginConfig({
      name: 'plugin-webdav'
    })
    var result = JSON.parse(configMap.data?.basic || "{ url: '',path:'',username:'',password:'' }")
    result.domain = result.url.replace('dav/', 'd')
    result.link = result.url.replace('/dav/', '')
    return result
  },
  onSuccess(data) {
    if (!data) {
      Toast.error('未正确配置 WebDAV')
      pluginDetailModal.value = true
    }
  },
  onError() {
    Toast.error('未正确配置 WebDAV')
    pluginDetailModal.value = true
  }
})

function previewLink(filename: string) {
  return config.value.link + filename
}

function pageNext() {
  page.value++
  totalPhotos.value
    .filter((x) => x.filename.includes(keyword.value))
    .filter(
      (x, index) =>
        index < page.value * pageSize.value && index >= (page.value - 1) * pageSize.value
    )
    .forEach((item) => {
      item.thumbnail = thumbnailImg(item.filename)
      photos.value.push(item)
    })
}

function thumbnailImg(filename: string) {
  return (
    config.value.domain + config.value.thumbnails + filename.substring(config.value.path.length)
  )
}

const { isFetching } = useQuery({
  queryKey: ['dav-photos', selectedTopic],
  queryFn: async () => {
    if (webDavClient == null) {
      webDavClient = createClient(config.value.url, {
        username: config.value.username,
        password: config.value.password
      })
    }
    var searchFolder = config.value.path
    if (selectedTopic.value != undefined) {
      searchFolder = selectedTopic.value.filename
    }
    console.log(searchFolder)
    pageSize.value = config.value.pageSize
    const contents = await webDavClient.getDirectoryContents(searchFolder, {
      deep: true
    })
    var result = contents as FileStat[]
    if (topics.value.length == 0) {
      topics.value = result.filter((x) => x.type == 'directory')
    }
    return result
  },
  onSuccess(data) {
    totalPhotos.value = data.filter((x) => x.type == 'file')
    photos.value = []
    totalPhotos.value
      .filter((x, index) => index < page.value * pageSize.value)
      .forEach((item) => {
        item.thumbnail = thumbnailImg(item.filename)
        photos.value.push(item)
      })
  },
  keepPreviousData: true,
  enabled: computed(() => !!config.value)
})

watch(
  () => keyword.value,
  () => {
    photos.value = []
    selectedPhotos.value = new Set()
    page.value = 1
    totalPhotos.value
      .filter((x) => x.filename.includes(keyword.value))
      .filter(
        (x, index) =>
          index < page.value * pageSize.value && index >= (page.value - 1) * pageSize.value
      )
      .forEach((item) => {
        if (item.thumbnail == '') {
          item.thumbnail = thumbnailImg(item.filename)
        }
        photos.value.push(item)
      })
  }
)

const handleSelectTopic = (topic: FileStat) => {
  selectedTopic.value = topic
  selectedPhotos.value = new Set()
  photos.value = []
  page.value = 1
}

const handleSelect = async (photo: FileStat) => {
  if (selectedPhotos.value.has(photo)) {
    selectedPhotos.value.delete(photo)
    return
  }
  selectedPhotos.value.add(photo)
}

const isChecked = (photo: FileStat) => {
  return Array.from(selectedPhotos.value)
    .map((item) => item.etag)
    .includes(photo.etag)
}

const isDisabled = (photo: FileStat) => {
  if (props.max !== undefined && props.max <= selectedPhotos.value.size && !isChecked(photo)) {
    return true
  }
  return false
}

watchEffect(() => {
  const photos = Array.from(selectedPhotos.value).map((image) => {
    return {
      spec: {
        displayName: image.basename,
        mediaType: image.mime,
        size: image.size
      },
      status: {
        permalink: config.value.domain + image.filename
      }
    } as AttachmentLike
  })
  emit('update:selected', photos)
})
</script>
<template>
  <div>
    <SearchInput v-model="keyword" />
  </div>
  <div
    class="topics mt-2 flex gap-x-2 gap-y-3 overflow-x-scroll overflow-y-hidden scroll-smooth pb-1"
  >
    <div
      v-for="(topic, index) in topics"
      :key="index"
      :class="{
        '!text-gray-200 !bg-gray-900': topic.basename === selectedTopic?.basename
      }"
      class="flex cursor-pointer items-center rounded bg-gray-100 p-2 text-gray-500 transition-all hover:bg-gray-200 hover:text-gray-900 hover:shadow-sm"
      @click="handleSelectTopic(topic)"
    >
      <div class="flex flex-1 items-center truncate">
        <span class="truncate text-sm"> {{ topic.basename }} </span>
      </div>
    </div>
  </div>
  <VLoading v-if="isFetching && photos.length === 0" />

  <div v-else>
    <div class="grid grid-cols-3 mt-2 gap-x-2 gap-y-3 md:grid-cols-6 sm:grid-cols-3" role="list">
      <VCard
        v-for="(photo, index) in photos"
        :key="index"
        :body-class="['!p-0']"
        :class="{
          'ring-1 ring-black': isChecked(photo),
          'pointer-events-none !cursor-not-allowed opacity-50': isDisabled(photo)
        }"
        class="hover:shadow"
        @click.stop="handleSelect(photo)"
      >
        <div class="group relative bg-white">
          <div class="block aspect-10/8 h-full w-full cursor-pointer overflow-hidden bg-gray-100">
            <img
              class="pointer-events-none size-full object-cover group-hover:opacity-75"
              :src="photo.thumbnail"
            />
          </div>
          <div
            :class="{ '!flex': selectedPhotos.has(photo) }"
            class="absolute left-0 top-0 hidden h-1/3 w-full justify-between from-gray-300 to-transparent bg-gradient-to-b ease-in-out group-hover:flex"
          >
            <a :href="previewLink(photo.filename)" target="_blank" class="ml-1 mt-1">
              <IconExternalLinkLine
                class="h-6 w-6 cursor-pointer text-white transition-all hover:text-black"
              />
            </a>
            <IconCheckboxFill
              :class="{
                '!text-black': selectedPhotos.has(photo)
              }"
              class="mr-1 mt-1 h-6 w-6 cursor-pointer text-white transition-all hover:text-black"
            />
          </div>
          <div
            :class="{ '!flex': selectedPhotos.has(photo) }"
            class="absolute bottom-0 left-0 hidden w-full from-gray-600 to-transparent bg-gradient-to-t ease-in-out group-hover:flex"
          >
            <div class="w-full flex flex-row items-center gap-2 p-1">
              <div class="flex flex-1 flex-col truncate">
                <a
                  class="truncate text-xs text-white font-medium hover:underline"
                  :href="previewLink(photo.filename)"
                  target="_blank"
                >
                  {{ photo.basename }}
                </a>
              </div>
            </div>
          </div>
        </div>
      </VCard>
    </div>
    <div v-if="photos.length > 0" class="mt-4 flex items-center justify-center">
      <VButton :loading="isFetching" type="secondary" @click="pageNext">
        {{ isFetching ? '加载中...' : '加载更多' }}
      </VButton>
    </div>

    <PluginDetailModal
      v-if="pluginDetailModal"
      name="PluginWebDAV"
      @close="pluginDetailModal = false"
    />
  </div>
</template>
<style scoped>
.topics::-webkit-scrollbar-track-piece {
  background-color: #f8f8f8;
  -webkit-border-radius: 2em;
  -moz-border-radius: 2em;
  border-radius: 2em;
}

.topics::-webkit-scrollbar {
  width: 5px;
  height: 5px;
}

.topics::-webkit-scrollbar-thumb {
  background-color: #f2eaea;
  background-clip: padding-box;
  -webkit-border-radius: 2em;
  -moz-border-radius: 2em;
  border-radius: 2em;
}

.topics::-webkit-scrollbar-thumb:hover {
  background-color: #bbb;
}
</style>

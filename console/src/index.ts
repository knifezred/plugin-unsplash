import { definePlugin } from '@halo-dev/console-shared'
import { markRaw } from 'vue'
import WebdavSelectorProvider from './components/WebdavSelectorProvider.vue'
import './styles/tailwind.css'

export default definePlugin({
  components: {},
  routes: [],
  extensionPoints: {
    'attachment:selector:create': () => {
      return [
        {
          id: 'webdav',
          label: 'WebDAV',
          component: markRaw(WebdavSelectorProvider)
        }
      ]
    }
  }
})

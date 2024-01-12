/*
 * @Author: liy 747688491@qq.com
 * @Date: 2023-12-05 10:23:00
 * @LastEditors: liy 747688491@qq.com
 * @LastEditTime: 2023-12-05 10:23:35
 * @Description: 
 */
import { h, defineComponent } from 'vue'
import { Icon as IconifyIcon } from '@iconify/vue'

export default defineComponent({
  name: 'IconifyIconOnline',
  components: { IconifyIcon },
  props: {
    icon: {
      type: String,
      default: '',
    },
  },
  render() {
    const attrs = this.$attrs
    return h(
      IconifyIcon,
      {
        icon: `${this.icon}`,
        style: attrs?.style
          ? Object.assign(attrs.style, { outline: 'none' })
          : { outline: 'none' },
        ...attrs,
      },
      {
        default: () => [],
      },
    )
  },
})

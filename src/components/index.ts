import type { App, Component } from 'vue'

import { SvgIcon } from './SvgIcon'
import { DropUpload } from './DropUplode'
import { UploadImage } from './UploadImage'
import { IconifyIcon } from './IconifyIcon'

const Components: {
  [propName: string]: Component
} = {
  SvgIcon,
  DropUpload,
  UploadImage,
  IconifyIcon
}

export default {
  install: (app: App) => {
    Object.keys(Components).forEach((key) => {
      app.component(key, Components[key])
    })
  }
}
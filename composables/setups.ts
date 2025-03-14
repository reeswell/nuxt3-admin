import { useBuildInfo } from './about'
import { useAppHead } from './vue'

export function setupPageHeader() {
  const buildInfo = useBuildInfo()

  useAppHead({
    htmlAttrs: {
      lang: () => 'zh-CN',
      dir: () => 'ltr',
      class: () => [],
    },
    meta: [{
      name: 'viewport',
      content: () => `width=device-width,initial-scale=1${',maximum-scale=1,user-scalable=0'},viewport-fit=cover`,
    }],
    titleTemplate: (title?: string) => {
      let titleTemplate = title ?? ''

      if (titleTemplate.match(/&[a-z0-9#]+;/gi)) {
        titleTemplate = unescapeTitleTemplate(titleTemplate, [
          ['"', ['&#34;', '&quot;']],
          ['&', ['&#38;', '&amp;']],
          ['\'', ['&#39;', '&apos;']],
          ['\u003C', ['&#60;', '&lt;']],
          ['\u003E', ['&#62;', '&gt;']],
        ])
        if (titleTemplate.length > 60)
          titleTemplate = `${titleTemplate.slice(0, 60)}...${titleTemplate.endsWith('"') ? '"' : ''}`

        if (!titleTemplate.includes('"'))
          titleTemplate = `"${titleTemplate}"`
      }
      else if (titleTemplate.length > 60) {
        titleTemplate = `${titleTemplate.slice(0, 60)}...${titleTemplate.endsWith('"') ? '"' : ''}`
      }

      if (titleTemplate.length)
        titleTemplate += ' | '

      titleTemplate += 'nuxt3管理系统模版'
      if (buildInfo.env !== 'release')
        titleTemplate += ` (${buildInfo.env})`

      return titleTemplate
    },
    link: [],
  })
}

function unescapeTitleTemplate(titleTemplate: string, replacements: [string, string[]][]) {
  let result = titleTemplate
  for (const [replacement, entities] of replacements) {
    for (const e of entities)
      result = result.replaceAll(e, replacement)
  }
  return result.trim()
}

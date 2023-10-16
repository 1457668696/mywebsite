export const data = JSON.parse("{\"key\":\"v-6e0d8f34\",\"path\":\"/guide/1.html\",\"title\":\"\",\"lang\":\"zh-Ch\",\"frontmatter\":{},\"headers\":[],\"git\":{},\"filePathRelative\":\"guide/1.md\"}")

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updatePageData) {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ data }) => {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  })
}

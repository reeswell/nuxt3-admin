import type { SearchResult, SidebarRouteItem } from '~/types'
import { resolveUnref } from '@vueuse/core'
import routes from './sidebar/routes'

export function useSearch(query: MaybeRefOrGetter<string>) {
  const done = ref(false)
  const loading = ref(false)
  const results = ref<SearchResult[]>([])

  const q = computed(() => resolveUnref(query).trim().toLowerCase())

  // 扁平化路由数据
  function flattenRoutes(routes: SidebarRouteItem[], parentPath = ''): SearchResult[] {
    return routes.reduce((acc: SearchResult[], route) => {
      if (!route.name)
        return acc

      const currentPath = route.path.startsWith('/') ? route.path : `${parentPath}/${route.path}`

      const result: SearchResult = {
        type: 'menu',
        id: currentPath,
        name: route.name,
        path: currentPath,
        icon: route.icon,
      }

      acc.push(result)

      if (route.submenu?.length) {
        acc.push(...flattenRoutes(route.submenu, currentPath))
      }

      return acc
    }, [])
  }

  // 搜索函数
  function searchMenus(searchText: string, routes: SidebarRouteItem[]) {
    if (!searchText) {
      results.value = []
      return
    }

    const flattenedRoutes = flattenRoutes(routes)

    results.value = flattenedRoutes.filter(route =>
      route.name.toLowerCase().includes(searchText)
      || route.path.toLowerCase().includes(searchText),
    )
  }

  // 监听搜索词变化
  watch(() => q.value, (newQuery) => {
    loading.value = true
    searchMenus(newQuery, routes) // routes 是你的路由配置
    loading.value = false
  })

  return {
    results: readonly(results),
    loading: readonly(loading),
    done: readonly(done),
  }
}

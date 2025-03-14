export default [
  {
    isTitle: false,
    name: '首页',
    path: '/',
    icon: 'ElIconHomeFilled',
    submenu: [],
  },
  {
    isTitle: false,
    name: '销售',
    path: '/sales',
    icon: '销售',
    submenu: [
      {
        isTitle: false,
        name: '销售单',
        path: '/sales/order',
        icon: '',
        submenu: [],
      },
    ],
  },
  {
    isTitle: false,
    name: '用户',
    path: '/user',
    icon: 'ElIconUser',
    submenu: [
      {
        isTitle: false,
        name: '表单',
        path: '/eg/form',
        icon: '',
        submenu: [],
      },
      {
        isTitle: false,
        name: '表格',
        path: '/eg/user',
        icon: '',
        submenu: [],
      },
    ],
  },
]

# 趣用工具箱

综合多功能工具 App，基于 **HBuilderX** 创建的 **uni-app Vue3 + Vite + uni-ui** 项目。

整体风格简约清爽，浅色为主，支持浅色 / 深色 / 跟随系统三种主题模式。

## 功能特性

- **三 Tab 导航**：首页、工具分类、我的
- **工具宫格**：首页 4 列网格展示常用工具，支持搜索过滤
- **分类浏览**：按日常 / 效率 / 趣味等分类查看全部工具
- **子包打开**：App 端通过 `uni.openSubPackage` 打开本地或远程 upx 子包；开发期回退至内置分包页面
- **主题切换**：浅色、深色、跟随系统，持久化保存
- **全局能力**：请求封装、本地存储、Token 管理、版本更新检测

## 技术栈

| 项 | 说明 |
|---|---|
| 框架 | uni-app Vue3（v3 编译器） |
| UI | uni-ui（uni_modules） |
| 构建 | Vite（HBuilderX 内置） |
| 状态 | Vue3 `reactive` composable（无 Pinia 依赖） |
| 样式 | SCSS + CSS 变量（`rpx`） |

## 目录结构

```
FunToolBox/
├── api/                    # 接口模块（user、tool）
├── components/             # 公共组件
│   ├── page-shell/         # 页面容器（主题 class、安全区）
│   └── tool-grid-item/     # 工具宫格单元
├── config/                 # 应用配置（baseURL、版本号等）
├── data/                   # Mock 数据（工具列表、分类）
├── pages/                  # 主包页面
│   ├── index/              # 首页
│   ├── category/           # 工具分类
│   └── mine/               # 我的
├── stores/                 # 状态（theme、user）
├── styles/                 # 全局样式（theme.scss）
├── utils/                  # 工具函数
│   ├── request.js          # 网络请求
│   ├── storage.js          # 本地存储
│   ├── auth.js             # Token 读写
│   ├── update.js           # 版本更新
│   └── subpackage.js       # 子包打开入口
├── static/
│   ├── tabbar/             # 底部导航图标
│   ├── subpackages/        # 本地 upx 包（*.upx 已 gitignore）
│   └── cache/              # 远程 upx 下载缓存（已 gitignore）
├── subPackages/            # 内置 uni-app 分包（开发期占位）
│   └── demo-tool/
├── uni_modules/            # uni-ui 组件
├── App.vue
├── main.js
├── pages.json
└── manifest.json
```

## 快速开始

### 环境要求

- [HBuilderX](https://www.dcloud.io/hbuilderx.html) 3.1.0 及以上
- 微信开发者工具（编译到微信小程序时）

### 运行项目

1. 使用 HBuilderX 打开本项目根目录
2. 菜单 **运行 → 运行到浏览器 / 运行到手机或模拟器 / 运行到小程序模拟器**
3. 选择目标平台即可预览

### 配置 API 地址

编辑 [`config/index.js`](config/index.js)：

```javascript
export default {
  baseURL: 'https://your-api.example.com',
  // ...
}
```

## 新增工具

在 [`data/tools.js`](data/tools.js) 中添加工具配置项：

```javascript
{
  id: 'my-tool',
  name: '我的工具',
  icon: 'gear',              // uni-icons 图标名
  iconColor: '#2979ff',
  category: 'daily',         // 对应 categories 中的 id
  featured: true,            // 是否在首页展示
  openType: 'page',          // 'page' | 'upx' | 'webview'
  localPath: '',             // App 本地 upx 路径
  remoteUrl: '',             // 远程 upx 下载地址
  fallbackPage: '/subPackages/demo-tool/index'
}
```

### upx 子包（App）

1. 将 upx 包放入 `static/subpackages/`（该目录下的 `*.upx` 不会提交到 Git）
2. 配置工具的 `openType: 'upx'` 并填写 `localPath` 或 `remoteUrl`
3. 在 HBuilderX **manifest → App 模块配置** 中勾选内嵌小程序容器相关模块（以当前 HBuilderX 版本为准）
4. App 真机验证 `uni.openSubPackage` 打开效果

非 App 端会自动回退到 `fallbackPage` 指定的内置分包页面。

## 主题模式

在「我的 → 主题模式」中切换：

| 模式 | 说明 |
|---|---|
| 浅色 | 固定浅色主题 |
| 深色 | 固定深色主题 |
| 跟随系统 | 随系统外观自动切换 |

主题偏好保存在本地存储，重启后自动恢复。

## 全局 API 说明

### 打开工具

```javascript
import { openTool } from '@/utils/subpackage.js'
openTool(toolConfig)
```

或在任意页面通过全局方法：

```javascript
this.$openTool(toolConfig)
```

### 网络请求

```javascript
import { get, post } from '@/utils/request.js'

get('/api/tools/list')
post('/api/user/login', { username, password })
```

请求自动携带 `Authorization: Bearer <token>`，401 时清除登录态。

### 用户登录

```javascript
import { useUserStore } from '@/stores/user.js'

const { login, logout, mockLogin, isLoggedIn } = useUserStore()
```

## 分包说明

| 类型 | 路径 | 用途 |
|---|---|---|
| 内置分包 | `subPackages/demo-tool` | 开发期工具演示占位页 |
| 本地 upx | `static/subpackages/*.upx` | App 内嵌子包（不提交 Git） |
| 远程缓存 | `static/cache/` | 下载的 upx 缓存（不提交 Git） |

`pages.json` 与 `manifest.json` 已开启分包优化（`optimization.subPackages: true`）。

## 注意事项

- 本项目为 HBuilderX 工程，无 `package.json`，不依赖 npm 安装
- `uni.openSubPackage` 官方文档尚在完善，具体参数以 HBuilderX 版本为准；统一通过 `utils/subpackage.js` 封装调用
- TabBar 暗黑模式需通过 `uni.setTabBarStyle` 同步，已在 `stores/theme.js` 中处理
- 版本更新：App 端请求 `/api/app/version` 比对；微信小程序使用 `getUpdateManager` 热更新

## 许可证

私有项目，未经授权请勿分发。

# 汉诺塔动画展示应用 - 项目构造指南

## 📁 项目结构

```
hanoi_tower/
├── client/                          # 前端应用目录
│   ├── public/                      # 静态资源目录
│   │   └── images/                  # 图片资源（可选）
│   ├── src/
│   │   ├── components/              # React 组件
│   │   │   ├── HanoiVisualization.tsx    # 汉诺塔可视化组件
│   │   │   ├── HanoiControls.tsx         # 控制面板组件
│   │   │   ├── ErrorBoundary.tsx         # 错误边界组件
│   │   │   └── ui/                       # shadcn/ui 组件库
│   │   ├── hooks/                   # 自定义 React hooks
│   │   │   └── useHanoiTower.ts     # 汉诺塔核心逻辑 hook
│   │   ├── pages/                   # 页面组件
│   │   │   ├── Home.tsx             # 主页面
│   │   │   └── NotFound.tsx         # 404 页面
│   │   ├── contexts/                # React Context
│   │   ├── lib/                     # 工具函数库
│   │   ├── App.tsx                  # 应用入口和路由
│   │   ├── main.tsx                 # React 渲染入口
│   │   └── index.css                # 全局样式和设计令牌
│   └── index.html                   # HTML 模板
├── server/                          # 服务器目录（静态项目中为占位符）
├── shared/                          # 共享代码（占位符）
├── dist/                            # 构建输出目录
├── node_modules/                    # 依赖包目录
├── package.json                     # 项目配置和依赖
├── pnpm-lock.yaml                   # 依赖锁定文件
├── tsconfig.json                    # TypeScript 配置
├── vite.config.ts                   # Vite 构建配置
├── components.json                  # shadcn/ui 配置
├── .prettierrc                       # 代码格式化配置
├── .gitignore                        # Git 忽略文件
├── ideas.md                         # 设计理念文档
└── PROJECT_STRUCTURE.md             # 本文件

```

## 🏗️ 核心模块说明

### 1. **useHanoiTower Hook** (`client/src/hooks/useHanoiTower.ts`)
**职责：** 汉诺塔的核心业务逻辑

**主要功能：**
- `generateMoves()` - 递归生成所有移动步骤
- `initializeGame()` - 初始化游戏状态
- `playNextMove()` - 执行下一步移动
- `togglePlayback()` - 控制自动播放
- `previousMove()` / `nextMove()` - 手动前进/后退
- `changeDiskCount()` - 改变圆盘数量

**状态管理：**
```typescript
interface HanoiState {
  rods: number[][];        // 三个塔的圆盘数组
  moves: Move[];           // 所有移动步骤
  currentMoveIndex: number; // 当前步数
  isPlaying: boolean;      // 是否正在播放
  diskCount: number;       // 圆盘数量
  totalMoves: number;      // 总移动数
}
```

### 2. **HanoiVisualization 组件** (`client/src/components/HanoiVisualization.tsx`)
**职责：** 渲染汉诺塔的视觉表现

**特点：**
- 使用绝对定位实现圆盘穿过柱子
- 圆盘完美居中对齐
- 动态计算圆盘宽度和颜色
- 响应式设计适配各种屏幕

### 3. **HanoiControls 组件** (`client/src/components/HanoiControls.tsx`)
**职责：** 提供用户交互控制面板

**功能：**
- 圆盘数量选择（3-7 个）
- 播放/暂停控制
- 步进控制（上一步/下一步）
- 重置按钮
- 进度条显示
- 完成状态提示

### 4. **Home 页面** (`client/src/pages/Home.tsx`)
**职责：** 整合所有组件，提供完整的用户界面

**包含内容：**
- 标题和副标题
- 可视化区域
- 控制面板
- 算法说明文档

## 🎨 设计系统

### 颜色方案
- **主色调** - 深蓝色 (#1e3a8a)
- **强调色** - 紫色 (#8b5cf6)
- **背景** - 极浅灰蓝 (#f8fafc)
- **圆盘渐变** - 紫粉渐变

### 动画效果
- **圆盘移动** - 500-800ms，弹性缓动
- **按钮交互** - 150ms，缩放效果
- **页面加载** - 600-1000ms，淡入上升

## 📦 依赖关系

### 主要依赖
- **React 19** - UI 框架
- **TailwindCSS 4** - 样式框架
- **shadcn/ui** - UI 组件库
- **Wouter** - 轻量级路由
- **Lucide React** - 图标库
- **Framer Motion** - 动画库（预装）

### 开发工具
- **Vite** - 构建工具
- **TypeScript** - 类型系统
- **pnpm** - 包管理器
- **Prettier** - 代码格式化

## 🚀 如何上传到 GitHub

### 方式一：使用 Git 命令行（推荐）

#### 1. 在 GitHub 上创建新仓库
- 访问 https://github.com/new
- 输入仓库名称：`hanoi-tower`
- 选择 Public 或 Private
- 不要初始化 README、.gitignore 或 License（我们已有）
- 点击 "Create repository"

#### 2. 在本地推送代码
```bash
# 进入项目目录
cd /home/ubuntu/hanoi_tower

# 查看现有的 git 配置
git remote -v

# 如果已有 origin，先删除
git remote remove origin

# 添加新的远程仓库（替换 YOUR_USERNAME 和 YOUR_REPO）
git remote add origin https://github.com/YOUR_USERNAME/hanoi-tower.git

# 确保在 main 分支
git branch -M main

# 推送所有代码
git push -u origin main
```

#### 3. 验证上传
- 访问 `https://github.com/YOUR_USERNAME/hanoi-tower`
- 确认所有文件已上传

### 方式二：使用 GitHub Desktop（图形界面）

1. 下载并安装 GitHub Desktop
2. 在 GitHub Desktop 中选择 "File" → "Add Local Repository"
3. 选择 `/home/ubuntu/hanoi_tower` 目录
4. 点击 "Publish repository"
5. 选择 Public 或 Private
6. 点击 "Publish Repository"

### 方式三：使用 GitHub CLI

```bash
# 安装 GitHub CLI（如果未安装）
# 详见 https://cli.github.com

# 登录 GitHub
gh auth login

# 创建并推送仓库
cd /home/ubuntu/hanoi_tower
gh repo create hanoi-tower --source=. --remote=origin --push
```

## 📝 上传前的检查清单

```bash
# 1. 检查 .gitignore 是否正确配置
cat .gitignore

# 2. 确认 node_modules 和 dist 不会被上传
git status

# 3. 查看即将提交的文件
git log --oneline -5

# 4. 最后一次检查
git status
```

## 📄 建议添加的文件

### 1. README.md（项目说明）
```markdown
# 汉诺塔动画展示

一个使用 React + TailwindCSS 构建的交互式汉诺塔算法可视化应用。

## 功能特性
- 支持 3-7 个圆盘的汉诺塔演示
- 自动播放和手动控制
- 流畅的动画效果
- 完全响应式设计

## 快速开始

### 安装依赖
\`\`\`bash
pnpm install
\`\`\`

### 开发模式
\`\`\`bash
pnpm dev
\`\`\`

### 构建生产版本
\`\`\`bash
pnpm build
\`\`\`

## 技术栈
- React 19
- TailwindCSS 4
- TypeScript
- Vite

## 许可证
MIT
```

### 2. LICENSE（开源许可证）
```bash
# 添加 MIT 许可证
curl https://opensource.org/licenses/MIT > LICENSE
```

### 3. .env.example（环境变量示例）
```
# 如果有环境变量，创建示例文件
VITE_APP_TITLE=汉诺塔动画展示
```

## 🔧 常见问题

### Q: 如何更新已上传的代码？
```bash
# 修改文件后
git add .
git commit -m "更新描述"
git push origin main
```

### Q: 如何克隆这个项目？
```bash
git clone https://github.com/YOUR_USERNAME/hanoi-tower.git
cd hanoi-tower
pnpm install
pnpm dev
```

### Q: 如何添加协作者？
1. 在 GitHub 仓库页面
2. 点击 "Settings"
3. 选择 "Collaborators"
4. 输入协作者的 GitHub 用户名

### Q: 如何创建分支进行开发？
```bash
# 创建新分支
git checkout -b feature/new-feature

# 推送分支
git push origin feature/new-feature

# 在 GitHub 上创建 Pull Request
```

## 📚 推荐的 GitHub 配置

### 添加 GitHub Actions CI/CD
创建 `.github/workflows/deploy.yml`，自动构建和部署

### 添加 GitHub Pages
1. 在 Settings → Pages
2. 选择 "Deploy from a branch"
3. 选择 "main" 分支和 "/dist" 目录
4. 应用会自动部署到 `https://YOUR_USERNAME.github.io/hanoi-tower`

## 🎯 总结

这个项目是一个完整的、生产级别的 React 应用，具有：
- ✅ 清晰的代码结构
- ✅ 完整的类型定义
- ✅ 响应式设计
- ✅ 现代的开发工具链
- ✅ 易于扩展的架构

上传到 GitHub 后，你可以继续添加新功能、邀请协作者，或者部署到 GitHub Pages。

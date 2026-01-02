# 上传源码到 GitHub - 详细步骤指南

## 📋 前置准备

### 1. 注册 GitHub 账户
如果还没有 GitHub 账户，请访问 https://github.com 注册

### 2. 配置 Git（首次使用）
```bash
# 配置全局用户名
git config --global user.name "Your Name"

# 配置全局邮箱
git config --global user.email "your.email@example.com"

# 验证配置
git config --global --list
```

### 3. 生成 SSH 密钥（推荐）
```bash
# 生成 SSH 密钥
ssh-keygen -t ed25519 -C "your.email@example.com"

# 按 Enter 键接受默认位置
# 输入密码（可选，按 Enter 跳过）

# 复制公钥
cat ~/.ssh/id_ed25519.pub
```

然后在 GitHub 中添加 SSH 密钥：
1. 访问 https://github.com/settings/keys
2. 点击 "New SSH key"
3. 粘贴公钥内容
4. 点击 "Add SSH key"

## 🚀 上传步骤

### 方法一：使用 HTTPS（最简单）

#### 第 1 步：在 GitHub 创建仓库
1. 登录 GitHub
2. 点击右上角 "+" → "New repository"
3. 填写信息：
   - Repository name: `hanoi-tower`
   - Description: `A Tower of Hanoi animation visualization built with React and TailwindCSS`
   - Visibility: 选择 Public（公开）或 Private（私有）
   - ❌ 不要勾选 "Initialize this repository with a README"
   - ❌ 不要添加 .gitignore（我们已有）
4. 点击 "Create repository"

#### 第 2 步：在本地配置 Git
```bash
# 进入项目目录
cd /home/ubuntu/hanoi_tower

# 查看现有的 git 配置
git remote -v

# 如果已有 origin，先删除
git remote remove origin

# 添加新的远程仓库（替换 YOUR_USERNAME）
git remote add origin https://github.com/YOUR_USERNAME/hanoi-tower.git

# 验证添加成功
git remote -v
```

#### 第 3 步：推送代码
```bash
# 确保在 main 分支
git branch -M main

# 推送所有代码到 GitHub
git push -u origin main

# 如果提示输入用户名和密码，请输入：
# 用户名：你的 GitHub 用户名
# 密码：你的 GitHub 密码（或 Personal Access Token）
```

#### 第 4 步：验证上传
访问 `https://github.com/YOUR_USERNAME/hanoi-tower` 检查是否上传成功

---

### 方法二：使用 SSH（推荐，更安全）

#### 第 1 步：在 GitHub 创建仓库
同上（方法一的第 1 步）

#### 第 2 步：在本地配置 Git
```bash
# 进入项目目录
cd /home/ubuntu/hanoi_tower

# 查看现有的 git 配置
git remote -v

# 如果已有 origin，先删除
git remote remove origin

# 添加新的远程仓库（使用 SSH）
git remote add origin git@github.com:YOUR_USERNAME/hanoi-tower.git

# 验证添加成功
git remote -v
```

#### 第 3 步：推送代码
```bash
# 确保在 main 分支
git branch -M main

# 推送所有代码到 GitHub
git push -u origin main
```

#### 第 4 步：验证上传
访问 `https://github.com/YOUR_USERNAME/hanoi-tower` 检查是否上传成功

---

### 方法三：使用 GitHub CLI（最快）

#### 第 1 步：安装 GitHub CLI
```bash
# 在 Ubuntu/Debian 上
sudo apt-get install gh

# 或使用 Homebrew（macOS）
brew install gh
```

#### 第 2 步：登录 GitHub
```bash
gh auth login

# 选择 GitHub.com
# 选择 HTTPS 或 SSH
# 选择 Paste an authentication token
# 或自动在浏览器中授权
```

#### 第 3 步：创建并推送仓库
```bash
# 进入项目目录
cd /home/ubuntu/hanoi_tower

# 创建仓库并推送
gh repo create hanoi-tower \
  --source=. \
  --remote=origin \
  --push \
  --public \
  --description "A Tower of Hanoi animation visualization built with React and TailwindCSS"
```

---

## ✅ 上传前的检查清单

```bash
# 1. 检查 .gitignore 配置
cat .gitignore

# 2. 查看即将提交的文件
git status

# 3. 确认 node_modules 和 dist 不在列表中
git ls-files | grep node_modules    # 应该返回空
git ls-files | grep dist            # 应该返回空

# 4. 查看最近的提交记录
git log --oneline -5

# 5. 最后检查
git status
```

## 📝 上传后的操作

### 1. 添加 README 和其他文档
如果还没有添加，可以这样添加：

```bash
# 添加所有新文件
git add README.md PROJECT_STRUCTURE.md GITHUB_UPLOAD_GUIDE.md

# 提交
git commit -m "docs: add documentation"

# 推送
git push origin main
```

### 2. 创建 GitHub Pages（可选）
如果想部署到 GitHub Pages：

```bash
# 构建项目
pnpm build

# 推送 dist 目录到 gh-pages 分支
git subtree push --prefix dist origin gh-pages
```

然后在 GitHub 仓库设置中：
1. 进入 Settings → Pages
2. 选择 "Deploy from a branch"
3. 选择 "gh-pages" 分支
4. 点击 Save

应用会自动部署到 `https://YOUR_USERNAME.github.io/hanoi-tower`

### 3. 添加协作者
如果想邀请其他人一起开发：

1. 进入仓库页面
2. 点击 Settings
3. 选择 Collaborators
4. 点击 "Add people"
5. 输入协作者的 GitHub 用户名

### 4. 设置分支保护规则（可选）
1. 进入 Settings → Branches
2. 点击 "Add rule"
3. 输入分支名称（如 `main`）
4. 勾选 "Require a pull request before merging"
5. 点击 Create

## 🔄 日常工作流

### 提交新的更改
```bash
# 查看修改
git status

# 添加文件到暂存区
git add .

# 或只添加特定文件
git add client/src/components/NewComponent.tsx

# 提交更改
git commit -m "feat: add new feature"

# 推送到 GitHub
git push origin main
```

### 创建特性分支
```bash
# 创建新分支
git checkout -b feature/new-feature

# 进行开发...

# 推送分支
git push origin feature/new-feature

# 在 GitHub 上创建 Pull Request
# 1. 访问仓库页面
# 2. 点击 "Compare & pull request"
# 3. 填写 PR 描述
# 4. 点击 "Create pull request"
```

### 更新本地代码
```bash
# 从 GitHub 拉取最新代码
git pull origin main

# 或者
git fetch origin
git merge origin/main
```

## 🆘 常见问题

### Q: 推送时提示 "fatal: 'origin' does not appear to be a 'git' repository"
A: 确保你在项目目录中，并且已经初始化了 git：
```bash
cd /home/ubuntu/hanoi_tower
git remote -v
```

### Q: 推送时提示 "Permission denied (publickey)"
A: SSH 密钥配置有问题，使用 HTTPS 方法或重新配置 SSH：
```bash
# 测试 SSH 连接
ssh -T git@github.com

# 如果失败，重新生成 SSH 密钥
ssh-keygen -t ed25519 -C "your.email@example.com"
```

### Q: 推送时提示 "fatal: The current branch main has no upstream branch"
A: 使用 `-u` 参数设置上游分支：
```bash
git push -u origin main
```

### Q: 如何删除已推送的文件？
A: 
```bash
# 从 Git 中删除文件（但保留本地副本）
git rm --cached filename

# 或从 Git 和本地都删除
git rm filename

# 提交更改
git commit -m "remove file"

# 推送
git push origin main
```

### Q: 如何修改已推送的提交信息？
A:
```bash
# 修改最后一次提交
git commit --amend -m "new message"

# 强制推送（谨慎使用！）
git push origin main --force
```

### Q: 如何回滚到之前的版本？
A:
```bash
# 查看提交历史
git log --oneline

# 回滚到某个提交
git reset --hard <commit-hash>

# 强制推送（谨慎使用！）
git push origin main --force
```

## 📚 推荐的 Git 提交信息格式

```
feat: 添加新功能
fix: 修复 bug
docs: 更新文档
style: 代码风格调整（不影响功能）
refactor: 代码重构
perf: 性能优化
test: 添加测试
chore: 构建或依赖更新
```

示例：
```bash
git commit -m "feat: add dark mode support"
git commit -m "fix: resolve circular disk animation issue"
git commit -m "docs: update README with deployment instructions"
```

## 🎯 总结

1. **创建仓库** - 在 GitHub 上创建新仓库
2. **配置 Git** - 设置远程仓库地址
3. **推送代码** - 使用 `git push` 上传
4. **验证成功** - 访问 GitHub 仓库页面检查
5. **持续更新** - 使用 Git 工作流进行开发

现在你的代码已经在 GitHub 上了！🎉

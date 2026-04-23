# Qlume

Qlume 的品牌官网前端项目，基于 React + TypeScript + Vite。

这个仓库只负责官网展示层，不承载 `qs-server` 的后端代码。产品入口仍然可以指向现有的 `collect.fangcunmount.cn`、`qs.fangcunmount.cn` 和 `operating.fangcunmount.cn`。

## Tech Stack

- React
- TypeScript
- Vite
- GitHub Actions

## Project Structure

```text
qlume/
├── .github/workflows/cicd.yml
├── deploy/nginx/www.fangcunmount.cn.conf
├── public/
├── scripts/deploy_via_ssh.sh
├── src/
│   ├── components/
│   ├── App.tsx
│   ├── content.ts
│   ├── main.tsx
│   └── styles.css
├── index.html
├── package.json
├── tsconfig*.json
└── vite.config.ts
```

## Local Development

```bash
cd qlume
npm install
npm run dev
```

默认本地开发地址由 Vite 提供，通常是 `http://127.0.0.1:5173/`。

## Build

```bash
npm run build
npm run preview
```

构建产物输出到 `dist/`。

## Brand Assets

生成好的 logo 图片放在 `public/brand/`：

- `qlume-mark-primary.png`: 当前页面和 favicon 使用的主图标
- `qlume-lockup-primary.png`: 单张横版主 logo
- `qlume-logo-marks-board.png`: icon 方向探索板
- `qlume-logo-lockups-light-board.png`: 浅底横版探索板
- `qlume-logo-lockups-dark-board.png`: 深底横版探索板

按亮色 / 暗色逐张输出的正式素材放在 `public/brand/generated/`：

- `qlume-mark-light.png`: 亮色独立图标
- `qlume-lockup-light.png`: 亮色图标 + Title + Subtitle
- `qlume-mark-dark.png`: 暗色独立图标
- `qlume-lockup-dark.png`: 暗色图标 + Title + Subtitle
- `qlume-wordmark-light.png`: 亮色紧凑版图标 + Title
- `qlume-wordmark-dark.png`: 暗色紧凑版图标 + Title

补充资产：

- `transparent/qlume-mark-transparent.png`: 真透明背景独立图标
- `transparent/qlume-lockup-transparent.png`: 真透明背景横版 logo
- `monochrome/qlume-mark-black.png`: 黑色单色图标，带 alpha
- `monochrome/qlume-mark-white.png`: 白色单色图标，带 alpha
- `app/qlume-app-icon-light.png`: 亮色 app icon，`1024x1024`
- `app/qlume-app-icon-dark.png`: 暗色 app icon，`1024x1024`

## Deployment

- Nginx 示例配置在 [deploy/nginx/www.fangcunmount.cn.conf](deploy/nginx/www.fangcunmount.cn.conf)
- GitHub Actions 工作流在 [.github/workflows/cicd.yml](.github/workflows/cicd.yml)
- workflow 参考 `qs-operating-system` 的约定，统一使用 `SVRB_*` secrets 发布到 `serverB`
- `push` 到 `main/master/develop` 会执行构建校验
- 只有 `main/master` 的 `push` 或手动触发且勾选 `deploy` 时，才会发布到 ServerB

### Required GitHub Secrets

- `SVRB_HOST`: ServerB 地址
- `SVRB_USERNAME`: ServerB 登录用户
- `SVRB_SSH_KEY`: GitHub Actions 使用的私钥内容

### Optional GitHub Secrets

- `SVRB_SSH_PORT`: SSH 端口，可选，默认 `22`
- `DEPLOY_PATH_SERVERB`: 发布目录，默认 `/data/www/www.fangcunmount.cn`
- `SVRB_POST_DEPLOY_COMMAND`: 可选，发布后执行的命令，例如 `sudo systemctl reload nginx`

### Manual Deploy

如果本地需要复用同一套 ServerB 发布逻辑：

```bash
npm run build
SVRB_HOST=example.com \
SVRB_USERNAME=deploy \
DEPLOY_PATH_SERVERB=/data/www/www.fangcunmount.cn \
SVRB_SSH_KEY_FILE=$HOME/.ssh/id_ed25519 \
./scripts/deploy_via_ssh.sh
```

## Notes

- 当前 canonical URL 仍然指向 `https://www.fangcunmount.cn/`
- 如果后续品牌域名切到新的 `qlume` 域名，需要同步更新 [index.html](index.html) 里的 canonical 和业务链接

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

## Deployment

- Nginx 示例配置在 [deploy/nginx/www.fangcunmount.cn.conf](deploy/nginx/www.fangcunmount.cn.conf)
- GitHub Actions 工作流在 [.github/workflows/cicd.yml](.github/workflows/cicd.yml)
- Action 会在 `main` 分支 push 时自动构建并通过 SSH + `rsync` 发布 `dist/`

### Required GitHub Secrets

- `DEPLOY_HOST`: 目标服务器地址
- `DEPLOY_PORT`: SSH 端口，可选，默认 `22`
- `DEPLOY_USER`: 目标服务器用户
- `DEPLOY_PATH`: 发布目录，例如 `/data/www/www.fangcunmount.cn`
- `DEPLOY_SSH_KEY`: GitHub Actions 使用的私钥内容
- `DEPLOY_POST_COMMAND`: 可选，发布后执行的命令，例如 `sudo systemctl reload nginx`

### Manual Deploy

如果本地需要复用同一套发布逻辑：

```bash
npm run build
DEPLOY_HOST=example.com \
DEPLOY_USER=deploy \
DEPLOY_PATH=/data/www/www.fangcunmount.cn \
DEPLOY_SSH_KEY_FILE=$HOME/.ssh/id_ed25519 \
./scripts/deploy_via_ssh.sh
```

## Notes

- 当前 canonical URL 仍然指向 `https://www.fangcunmount.cn/`
- 如果后续品牌域名切到新的 `qlume` 域名，需要同步更新 [index.html](index.html) 里的 canonical 和业务链接

# Qlume

Qlume 的品牌官网前端项目，基于 React + TypeScript + Vite。

这个仓库只负责官网展示层，不承载 `qs-server` 的后端代码。产品入口仍然可以指向现有的 `collect.fangcunmount.cn`、`qs.fangcunmount.cn` 和 `operating.fangcunmount.cn`。

## Tech Stack

- React
- TypeScript
- Vite
- Docker
- GitHub Actions

## Project Structure

```text
qlume/
├── .github/workflows/cicd.yml
├── build/
│   ├── docker-compose.yml
│   ├── nginx/default.conf
│   └── Dockerfile
├── deploy/nginx/www.fangcunmount.cn.conf
├── public/
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

## Docker

本地可以直接构建并启动容器：

```bash
docker build -f build/Dockerfile -t qlume-local .
docker run --rm -p 3000:3000 qlume-local
```

容器内使用 `nginx` 托管构建后的静态资源，并在 `3000` 端口提供 SPA 路由回退。
如果你想按 `qs-operating-system` 的方式接入外部 Docker 网络，也可以直接用 [build/docker-compose.yml](/Users/yangshujie/workspace/typescript/github.com/fangcun-mount/qlume/build/docker-compose.yml:1)。

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
- workflow 参考 `qs-operating-system` 的约定，统一使用 `SVRB_*` secrets 构建镜像并发布到 `serverB`
- `push` 到 `main/master/develop` 会执行 lint 和前端构建校验
- `push` 到 `main/master`，或手动触发并勾选 `deploy` 时，会执行镜像构建、推送到 GHCR，并在 ServerB 上更新容器
- 容器会加入外部 Docker 网络 `infra-network`
- 同网络内的上游容器可以直接通过 `http://qlume:3000` 访问它
- 如果上游不是容器，而是宿主机上的 Nginx，则仍可通过宿主机端口访问，默认是 `9099`

### Required GitHub Secrets

- `SVRB_HOST`: ServerB 地址
- `SVRB_USERNAME`: ServerB 登录用户
- `SVRB_SSH_KEY`: 本仓库专用 deploy 私钥，不回退到 runner 私人 key
- `SVRB_HOST_FINGERPRINT`: serverB ED25519 SHA256 指纹，经已认证 SSH 通道核实

### Optional GitHub Secrets

- `SVRB_SSH_PORT`: SSH 端口，可选，默认 `22`
- `APP_PORT_SERVERB`: 宿主机暴露给 Nginx 反向代理的本地端口，默认 `9099`
- `DOCKERHUB_USERNAME`: 可选，配置后会额外镜像同步到 Docker Hub
- `DOCKERHUB_TOKEN`: 可选，Docker Hub access token

### ServerB Runtime

- 容器名：`qlume`
- Docker network：`infra-network`
- Docker network alias：`qlume`
- 容器内监听端口：`3000`
- 同网络容器访问地址：`http://qlume:3000`
- 宿主机默认绑定端口：`9099`
- 镜像地址：`ghcr.io/fangcunmount/qlume`

## Notes

- 当前 canonical URL 仍然指向 `https://www.fangcunmount.cn/`
- 如果后续品牌域名切到新的 `qlume` 域名，需要同步更新 [index.html](index.html) 里的 canonical 和业务链接

### serverB 发布与迁移约束

生产目录 `/opt/qlume` 由 deploy 管理，用户需能直接运行 Docker；发布先校验 `hostname -s = serverB`，使用服务器端 `.deploy.lock` 串行，保留原镜像作为健康检查失败时的回滚版本。Mac mini runner 继续拉取 `linux/amd64` 精确 SHA 镜像，再通过公网 SSH 传包；密钥和 GHCR 认证位于任务专用临时目录，任务结束清除，不执行全局镜像 prune。SSH 使用固定 ED25519 指纹和私有 known_hosts。

serverA 的官网 vhost 使用 Docker DNS resolver（10 秒刷新）访问 `qlume:3000`，容器重建后自动刷新 IP，无需每次发布重载入口。首次部署此 vhost 时需执行 `nginx -t` 并 reload。公网域名、TLS、业务入口链接保持原样。

官网是无持久化卷的静态服务，迁移先使用 serverD 的原镜像进行隔离预验证，再停旧端并在 serverB 启动正式服务名。serverD 原镜像与 inspect 归档保留用于受控回滚；不能让两台主机同时以 qlume alias 加入 overlay。Compose 手动入口必须显式提供 `QLUME_IMAGE=ghcr.io/fangcunmount/qlume:sha-<SHA>`，宿主机端口使用 `APP_PORT_SERVERB`，默认保持原生产端口 9099。

迁移验收分别核对原镜像/静态资源一致性、主干 CI/CD 的实际部署 SHA、容器健康和公网入口；不把官网部署等同于小程序或后端业务验收。

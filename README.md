# OpenClaw 统一登录门户

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

内部工具平台统一入口，提供 SSO 登录和平台导航能力。

## 功能

- **统一登录**：Token/密码认证，接入平台统一账号体系
- **平台导航**：登录后展示所有内部平台入口卡片
- **分组展示**：按工具类别分组（开发工具/效率工具/内容生产/数据工具）
- **状态标识**：运行中/维护中/已下线状态一目了然

## 技术栈

- React 18 + TypeScript
- Ant Design 5
- Vite 6
- React Router 6

## 开发

```bash
npm install
npm run dev    # 开发服务器 :5173
npm run build  # 生产构建
```

## 对接平台列表

| 平台 | 地址 | 状态 |
|------|------|------|
| AgentDev 开发中心 | http://<SERVER_IP> | ✅ |
| LLM Todo | http://<SERVER_IP>:8720 | ✅ |
| 技能商城 | http://<SERVER_IP>:3456 | ✅ |
| 播客制作控制台 | http://<SERVER_IP>:53821 | ✅ |
| 多平台数据看板 | http://<SERVER_IP>:3457 | ✅ |
| 商业探索者 | http://<SERVER_IP>:34567 | ✅ |
| 账号管理看板 | http://<SERVER_IP>:18890 | ✅ |
| 宝宝成长追踪 | http://<SERVER_IP>:3460 | ✅ |
| 深度研究需求管理 | # | 🟡 维护中 |

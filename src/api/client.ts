const API_BASE = '/api'

export interface LoginParams {
  email: string
  password: string
}

export interface LoginResult {
  accessToken: string
  refreshToken?: string
  user: {
    id: string
    email: string
    name: string
    role: string
  }
}

export interface PlatformEntry {
  id: string
  name: string
  description: string
  icon: string
  url: string
  color: string
  status: 'online' | 'maintenance' | 'offline'
  group: string
}

// Mock platform data — all internal tools managed by OpenClaw
const PLATFORMS: PlatformEntry[] = [
  {
    id: 'agent-dev-center',
    name: 'AgentDev 开发中心',
    description: '内部需求管理、任务看板、修订历史、验收报告',
    icon: '⚙️',
    url: 'http://<SERVER_IP>',
    color: '#1677ff',
    status: 'online',
    group: '开发工具',
  },
  {
    id: 'llm-todo',
    name: 'LLM Todo 任务管理',
    description: '待办事项、本周计划视图、技能树可视化、角色管理',
    icon: '📋',
    url: 'http://<SERVER_IP>:8720',
    color: '#722ed1',
    status: 'online',
    group: '效率工具',
  },
  {
    id: 'skill-marketplace',
    name: '技能商城 Marketplace',
    description: '内部技能浏览、安装、审核、发布管理',
    icon: '🏪',
    url: 'http://<SERVER_IP>:3456',
    color: '#52c41a',
    status: 'online',
    group: '开发工具',
  },
  {
    id: 'podcast-console',
    name: '播客制作控制台',
    description: '播客转录浏览、制作流水线看板、音频波形可视化',
    icon: '🎙️',
    url: 'http://<SERVER_IP>:53821',
    color: '#eb2f96',
    status: 'online',
    group: '内容生产',
  },
  {
    id: 'kpi-dashboard',
    name: '多平台数据看板',
    description: '粉丝数据统计、平台运营 KPI、趋势图表',
    icon: '📊',
    url: 'http://<SERVER_IP>:3457',
    color: '#fa8c16',
    status: 'online',
    group: '数据工具',
  },
  {
    id: 'biz-explorer',
    name: '商业探索者',
    description: '商业化案例库、人物档案、状态管理与反馈系统',
    icon: '🔍',
    url: 'http://<SERVER_IP>:34567',
    color: '#2f54eb',
    status: 'online',
    group: '内容生产',
  },
  {
    id: 'account-dashboard',
    name: '账号管理看板',
    description: '多平台账号管理、运营数据录入与分析',
    icon: '👤',
    url: 'http://<SERVER_IP>:18890',
    color: '#13c2c2',
    status: 'online',
    group: '数据工具',
  },
  {
    id: 'baby-growth',
    name: '宝宝成长追踪',
    description: '儿童发展能力评估、观察记录、成长报告',
    icon: '🍼',
    url: 'http://<SERVER_IP>:3460',
    color: '#ff85c0',
    status: 'online',
    group: '其他',
  },
  {
    id: 'research-management',
    name: '深度研究需求管理',
    description: '研究需求提报、评审、跟踪管理平台',
    icon: '📚',
    url: '#',
    color: '#fa541c',
    status: 'maintenance',
    group: '开发工具',
  },
]

export async function login(params: LoginParams): Promise<LoginResult> {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: '登录失败' }))
    throw new Error(err.message || '登录失败')
  }
  return res.json()
}

export function getPlatforms(): PlatformEntry[] {
  return PLATFORMS
}

export function getPlatformGroups(platforms: PlatformEntry[]): string[] {
  const groups = new Set(platforms.map(p => p.group))
  return Array.from(groups)
}

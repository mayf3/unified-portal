import React from 'react'
import { Card, Tag, Typography, Button, Space, Divider, Tooltip, message } from 'antd'
import { LogoutOutlined, SettingOutlined, LinkOutlined } from '@ant-design/icons'
import { useAuth } from '../contexts/AuthContext'
import { getPlatforms, getPlatformGroups } from '../api/client'

const { Title, Text } = Typography

const STATUS_CONFIG: Record<string, { label: string; className: string }> = {
  online: { label: '运行中', className: 'status-online' },
  maintenance: { label: '维护中', className: 'status-maintenance' },
  offline: { label: '已下线', className: 'status-offline' },
}

const DashboardPage: React.FC = () => {
  const { user, logout } = useAuth()
  const platforms = getPlatforms()
  const groups = getPlatformGroups(platforms)

  const handleCardClick = (url: string, name: string) => {
    if (!url || url === '#') {
      message.info(`${name} 尚未部署，敬请期待`)
      return
    }
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="dashboard-page">
      {/* Header */}
      <div className="dashboard-header">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <Title level={2} style={{ color: '#fff', margin: 0 }}>
              🚀 OpenClaw 统一门户
            </Title>
            <Text style={{ color: 'rgba(255,255,255,0.65)', marginTop: 8, display: 'block' }}>
              您好，{user?.name || user?.email} · {user?.role === 'admin' ? '管理员' : '成员'}
            </Text>
          </div>
        </div>
      </div>

      {/* Nav bar */}
      <div className="dashboard-nav">
        <Space>
          <span role="img" aria-label="total">📦</span>
          <span>共 {platforms.length} 个平台</span>
          <Divider type="vertical" />
          <span style={{ color: '#52c41a' }}>●</span>
          <span>{platforms.filter(p => p.status === 'online').length} 运行中</span>
          <span style={{ color: '#faad14', marginLeft: 8 }}>●</span>
          <span>{platforms.filter(p => p.status === 'maintenance').length} 维护中</span>
        </Space>
        <Space>
          <Tooltip title="设置">
            <Button type="text" icon={<SettingOutlined />} />
          </Tooltip>
          <Button
            type="text"
            icon={<LogoutOutlined />}
            onClick={logout}
            danger
          >
            退出登录
          </Button>
        </Space>
      </div>

      {/* Content */}
      <div className="dashboard-content">
        {groups.map((group) => {
          const groupPlatforms = platforms.filter(p => p.group === group)
          return (
            <div key={group} style={{ marginBottom: 32 }}>
              <Title level={4} style={{ marginBottom: 16, color: '#262626' }}>
                {group === '开发工具' && '🛠️ '}
                {group === '效率工具' && '⚡ '}
                {group === '内容生产' && '🎬 '}
                {group === '数据工具' && '📈 '}
                {group === '其他' && '📦 '}
                {group}
              </Title>

              <div className="platform-grid">
                {groupPlatforms.map((platform) => {
                  const statusCfg = STATUS_CONFIG[platform.status]
                  return (
                    <Card
                      key={platform.id}
                      className="platform-card"
                      hoverable
                      onClick={() => handleCardClick(platform.url, platform.name)}
                      bodyStyle={{ padding: 24 }}
                    >
                      <div
                        className="platform-card-icon"
                        style={{ background: `${platform.color}15` }}
                      >
                        {platform.icon}
                      </div>
                      <div className="platform-card-title">{platform.name}</div>
                      <div className="platform-card-desc">{platform.description}</div>
                      <div style={{ marginTop: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span className={`platform-card-status ${statusCfg.className}`}>
                          {statusCfg.label}
                        </span>
                        <LinkOutlined style={{ color: '#8c8c8c' }} />
                      </div>
                    </Card>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default DashboardPage

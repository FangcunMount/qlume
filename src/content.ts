export const navLinks = [
  { href: '#difference', label: '升级' },
  { href: '#workflow', label: '工作流' },
  { href: '#scenes', label: '场景' },
  { href: '#entry', label: '入口' },
] as const

export const heroMeta = ['AI drafting', 'scale logic', 'async evaluation', 'reports'] as const

export const heroQuestions = [
  {
    title: '基础信息段',
    description: '以最少字段完成身份与场景确认。',
  },
  {
    title: '风险识别段',
    description: '绑定 PHQ-9 题项与阈值规则，提交后自动评分。',
  },
  {
    title: '结果出口段',
    description: '沉淀为分层结果、解释与后续跟进建议。',
  },
] as const

export const heroScalePills = [
  { label: 'Scale', value: 'PHQ-9' },
  { label: 'Rule', value: 'Medium / High' },
  { label: 'Output', value: 'Freshman Report' },
] as const

export const heroReportItems = [
  { label: 'Scale', value: 'PHQ-9' },
  { label: 'Assessment', value: 'Medium' },
  { label: 'Output', value: 'Report Ready' },
] as const

export const traditionalItems = [
  {
    title: '手工搭题',
    description: '从空白表单开始，一题一题配置。',
  },
  {
    title: '回收答案',
    description: '重点是链接分发、填写和导出表格。',
  },
  {
    title: '人工分析',
    description: '真正的判断、报告和后续动作还在别处。',
  },
] as const

export const qlumeItems = [
  {
    title: '从目标生成结构',
    description: '先描述场景，再生成问卷、量表和结果出口。',
  },
  {
    title: '提交之后继续推进',
    description: '答案不是终点，系统继续评分、评估和解释。',
  },
  {
    title: '直接输出结果',
    description: '沉淀为报告、分层、统计视图和开放接口。',
  },
] as const

export const workflowSteps = [
  {
    index: '01',
    title: '定义目标',
    description: '先输入场景、对象和预期结果。',
  },
  {
    index: '02',
    title: '生成问卷',
    description: 'AI 协助起草结构、题项和段落。',
  },
  {
    index: '03',
    title: '收集答案',
    description: '通过清晰入口承载填写与提交。',
  },
  {
    index: '04',
    title: '自动评估',
    description: '评分、规则判断与异步推进同时发生。',
  },
  {
    index: '05',
    title: '输出报告',
    description: '结果进入报告、统计视图与后续动作。',
  },
] as const

export const featureTags = ['心理筛查', '组织调研', '教育评估'] as const

export const featureBars = [78, 64, 86] as const

export const assessmentItems = ['规则判断', '风险分层', '解释生成'] as const

export const outputItems = ['Report', 'Stats', 'API'] as const

export const entryHosts = [
  'collect.fangcunmount.cn',
  'qs.fangcunmount.cn',
  'operating.fangcunmount.cn',
  'OpenAPI',
] as const

export const scenes = [
  {
    index: '01',
    eyebrow: 'Mental Health',
    title: '心理与健康筛查',
    description: '围绕量表、风险识别和后续跟进组织完整链路。',
    delayClass: 'reveal-delay-2',
  },
  {
    index: '02',
    eyebrow: 'Education',
    title: '教育评估',
    description: '让测评结果进入教学、辅导与持续观察流程。',
    delayClass: 'reveal-delay-3',
  },
  {
    index: '03',
    eyebrow: 'Organization',
    title: '组织调研',
    description: '不仅看表格统计，也输出报告、分层和行动信号。',
    delayClass: 'reveal-delay-4',
  },
  {
    index: '04',
    eyebrow: 'Research',
    title: '客户研究',
    description: '适合需要持续收集、自动分析和长期沉淀视图的业务研究。',
    delayClass: '',
  },
] as const

export const entries = [
  {
    eyebrow: 'Collect',
    title: '收集端接口',
    description: '面向填写与提交流程的公开入口，适合前台收集场景接入。',
    href: 'https://collect.fangcunmount.cn/swagger-ui/',
    linkLabel: '打开 `collect.fangcunmount.cn`',
    delayClass: 'reveal-delay-1',
  },
  {
    eyebrow: 'Core API',
    title: '测评核心接口',
    description: '承接问卷、量表、测评与结果沉淀的核心 API 与文档入口。',
    href: 'https://qs.fangcunmount.cn/swagger-ui/',
    linkLabel: '打开 `qs.fangcunmount.cn`',
    delayClass: 'reveal-delay-2',
  },
  {
    eyebrow: 'Operating',
    title: '运营与后台系统',
    description: '适合内部流程、运营视图和后台动作，不和收集端混在一起。',
    href: 'https://operating.fangcunmount.cn/',
    linkLabel: '打开 `operating.fangcunmount.cn`',
    delayClass: 'reveal-delay-3',
  },
  {
    eyebrow: 'Docs',
    title: '源码与文档',
    description: '查看仓库、接口定义和工程文档，作为技术协作入口。',
    href: 'https://github.com/FangcunMount/qs-server',
    linkLabel: '打开 GitHub 仓库',
    delayClass: 'reveal-delay-4',
  },
] as const

export const footerLinks = [
  { href: 'https://collect.fangcunmount.cn/swagger-ui/', label: 'Collect', external: true },
  { href: 'https://qs.fangcunmount.cn/swagger-ui/', label: 'API Docs', external: true },
  { href: 'https://github.com/FangcunMount/qs-server', label: 'GitHub', external: true },
  { href: '#top', label: 'Back to top', external: false },
] as const

import { useEffect } from 'react'
import { SectionHeader } from './components/SectionHeader'
import {
  assessmentItems,
  entries,
  entryHosts,
  featureBars,
  featureTags,
  footerLinks,
  heroMeta,
  heroQuestions,
  heroReportItems,
  heroScalePills,
  navLinks,
  outputItems,
  qlumeItems,
  scenes,
  traditionalItems,
  workflowSteps,
} from './content'

function joinClasses(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ')
}

function ControlDots() {
  return (
    <span className="dots" aria-hidden="true">
      <i>•</i>
      <i>•</i>
      <i>•</i>
    </span>
  )
}

export default function App() {
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>('.reveal'))
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')

    if (prefersReducedMotion.matches) {
      nodes.forEach((node) => {
        node.classList.add('is-visible')
      })

      return undefined
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.14 },
    )

    nodes.forEach((node) => {
      if (!node.classList.contains('is-visible')) {
        observer.observe(node)
      }
    })

    return () => {
      observer.disconnect()
    }
  }, [])

  const year = new Date().getFullYear()

  return (
    <div className="page">
      <header className="site-header">
        <div className="container">
          <a className="brand" href="#top" aria-label="Qlume 首页">
            <div className="brand-mark" aria-hidden="true"></div>
            <div className="brand-copy">
              <p className="brand-title">Qlume</p>
              <p className="brand-subtitle">AI Questionnaire &amp; Assessment Platform</p>
            </div>
          </a>

          <nav className="nav" aria-label="主导航">
            {navLinks.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
            <a
              className="nav-button"
              href="https://qs.fangcunmount.cn/swagger-ui/"
              target="_blank"
              rel="noreferrer"
            >
              API Docs
            </a>
          </nav>
        </div>
      </header>

      <main id="top">
        <section className="hero">
          <div className="container">
            <div className="hero-grid">
              <div className="hero-copy reveal is-visible">
                <div className="eyebrow">AI-native Questionnaire &amp; Assessment</div>
                <h1>AI 测评时代</h1>
                <p>
                  不止回收答案。<strong>Qlume</strong>{' '}
                  把问卷生成、量表规则、自动评估和报告输出放进同一套产品里。
                </p>

                <div className="hero-actions">
                  <a className="button button-primary" href="#entry">
                    查看产品入口
                  </a>
                  <a
                    className="button button-secondary"
                    href="https://github.com/FangcunMount/qs-server"
                    target="_blank"
                    rel="noreferrer"
                  >
                    GitHub
                  </a>
                </div>

                <div className="hero-meta" aria-label="产品关键词">
                  {heroMeta.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </div>

              <div className="stage reveal reveal-delay-2" aria-label="产品能力示意">
                <div className="stage-base" aria-hidden="true"></div>
                <div className="stage-flow" aria-hidden="true"></div>

                <div className="floating-card card-brief">
                  <div className="card-head">
                    <span>AI Brief</span>
                    <ControlDots />
                  </div>
                  <div className="brief-prompt">
                    <strong>为高校新生做心理健康筛查</strong>
                    5 分钟内完成，覆盖基础信息、风险识别、量表评分与后续跟进建议。
                  </div>
                </div>

                <div className="floating-card card-composer">
                  <div className="card-head">
                    <span>Questionnaire Composer</span>
                    <ControlDots />
                  </div>
                  <div className="composer-title">
                    <div>
                      <h2>从目标生成问卷与测评结构</h2>
                      <p>输入目标后，系统同步生成题目、量表与结果出口。</p>
                    </div>
                  </div>
                  <div className="composer-grid">
                    <div className="question-stack">
                      {heroQuestions.map((item) => (
                        <div key={item.title} className="question-card">
                          <strong>{item.title}</strong>
                          <span>{item.description}</span>
                        </div>
                      ))}
                    </div>

                    <div className="scale-rail">
                      {heroScalePills.map((item) => (
                        <div key={item.label} className="scale-pill">
                          <small>{item.label}</small>
                          <strong>{item.value}</strong>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="floating-card card-report">
                  <div className="card-head">
                    <span>Result Layer</span>
                    <ControlDots />
                  </div>
                  <div className="report-layout">
                    <div className="report-ring" aria-hidden="true"></div>
                    <div className="report-list">
                      {heroReportItems.map((item) => (
                        <div key={item.label} className="report-item">
                          <span>{item.label}</span>
                          <strong>{item.value}</strong>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="difference">
          <div className="container">
            <SectionHeader
              kicker="Category Shift"
              title="不再停在“发出去、收回来”"
              description="真正的升级不是多一个统计图，而是把问卷从数据入口，变成结果引擎。"
            />

            <div className="difference-board">
              <div className="panel difference-column reveal reveal-delay-1">
                <small>Traditional Tools</small>
                <h3>传统问卷工具</h3>
                <div className="mini-stack">
                  {traditionalItems.map((item) => (
                    <div key={item.title} className="mini-card">
                      <strong>{item.title}</strong>
                      <p>{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="difference-middle reveal reveal-delay-2">
                <div className="difference-arrow">
                  <span>Shift</span>
                </div>
              </div>

              <div className="difference-column is-dark reveal reveal-delay-3">
                <small>Qlume</small>
                <h3>AI 原生测评工具</h3>
                <div className="mini-stack">
                  {qlumeItems.map((item) => (
                    <div key={item.title} className="mini-card">
                      <strong>{item.title}</strong>
                      <p>{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="workflow">
          <div className="container">
            <SectionHeader
              kicker="Workflow"
              title="一条完整链路，而不是几块孤立功能"
              description="页面不需要解释太多，只要让人看懂：它如何从目标走到结果。"
            />

            <div className="panel workflow-shell reveal reveal-delay-1">
              <div className="workflow-line"></div>
              <div className="workflow-grid">
                {workflowSteps.map((step) => (
                  <article key={step.index} className="workflow-node">
                    <small>{step.index}</small>
                    <h3>{step.title}</h3>
                    <p>{step.description}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="container">
            <SectionHeader
              kicker="Core Capabilities"
              title="少一点功能堆砌，多一点产品表面"
              description="这类首页不该变成文章墙。三块视觉化能力面，已经足够把核心讲清楚。"
            />

            <div className="feature-grid">
              <article className="feature-card reveal reveal-delay-1">
                <small>Compose</small>
                <h3>AI 起草问卷与量表结构</h3>
                <div className="feature-visual">
                  <div className="brief-tags">
                    {featureTags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                  <div className="mini-chart">
                    {featureBars.map((value) => (
                      <div key={value} className="bar">
                        <i style={{ width: `${value}%` }}>.</i>
                      </div>
                    ))}
                  </div>
                </div>
                <p>不从空白开始，而是从目标、结构和结果出口开始组织问卷。</p>
              </article>

              <article className="feature-card reveal reveal-delay-2">
                <small>Evaluate</small>
                <h3>自动评分、评估与报告输出</h3>
                <div className="feature-visual">
                  <div className="split-surface">
                    <div className="pane">
                      <strong>Assessment</strong>
                      <ul>
                        {assessmentItems.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="pane">
                      <strong>Output</strong>
                      <ul>
                        {outputItems.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                <p>提交之后系统继续工作，把答案转成真正可使用的结果。</p>
              </article>

              <article className="feature-card reveal reveal-delay-3">
                <small>Platform</small>
                <h3>独立入口与开放接口</h3>
                <div className="feature-visual">
                  <div className="entry-lines">
                    {entryHosts.map((item) => (
                      <span key={item}>{item}</span>
                    ))}
                  </div>
                </div>
                <p>根域首页、收集端、核心 API 与后台入口彼此解耦，更像平台产品而不是单体页面。</p>
              </article>
            </div>
          </div>
        </section>

        <section id="scenes">
          <div className="container">
            <SectionHeader
              kicker="Use Cases"
              title="适合那些需要“结果”的问卷场景"
              description="不是所有问卷都需要 Qlume。但需要评估、分层和报告输出的场景，天然适合它。"
            />

            <div className="scene-band">
              <article className="scene-anchor reveal reveal-delay-1">
                <small>Scenes</small>
                <h3>
                  Survey
                  <br />
                  with outcomes
                </h3>
                <p>从收集走向理解与执行。</p>
              </article>

              {scenes.map((scene) => (
                <article key={scene.index} className={joinClasses('scene-card', 'reveal', scene.delayClass)}>
                  <div className="scene-mark">{scene.index}</div>
                  <small>{scene.eyebrow}</small>
                  <h3>{scene.title}</h3>
                  <p>{scene.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="entry">
          <div className="container">
            <SectionHeader
              kicker="Entry Points"
              title="首页负责定位，具体能力由独立入口承接"
              description="这是更干净的产品组织方式：品牌页是品牌页，业务入口是业务入口。"
            />

            <div className="entry-grid">
              {entries.map((entry) => (
                <article key={entry.href} className={joinClasses('entry-card', 'reveal', entry.delayClass)}>
                  <small>{entry.eyebrow}</small>
                  <h3>{entry.title}</h3>
                  <p>{entry.description}</p>
                  <a className="entry-link" href={entry.href} target="_blank" rel="noreferrer">
                    {entry.linkLabel}
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container">
          <div className="footer-card panel">
            <div>© {year} Qlume. AI-native questionnaire and assessment platform.</div>
            <div className="footer-links">
              {footerLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  {...(link.external ? { target: '_blank', rel: 'noreferrer' } : {})}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

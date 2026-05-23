import { useState, useEffect, useRef, useCallback } from 'react'
import fieldMap from './data/fieldMap'
import type { Intuition } from './data/fieldMap'
import './App.css'

function App() {
  const allIntuitions = new Map<string, Intuition>()
  for (const r of fieldMap.regions) {
    for (const i of r.intuitions) {
      allIntuitions.set(i.id, i)
    }
  }

  const [expanded, setExpanded] = useState<Set<string>>(new Set())
  const [activeSection, setActiveSection] = useState<string>('')
  const [showBackTop, setShowBackTop] = useState(false)
  const observerRef = useRef<IntersectionObserver | null>(null)
  const sectionRefs = useRef<Map<string, HTMLElement>>(new Map())

  const toggleRegion = (id: string) => {
    setExpanded((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  useEffect(() => {
    const handleScroll = () => setShowBackTop(window.scrollY > 400)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        }
      },
      { rootMargin: '-60px 0px -70% 0px' }
    )

    const ids = [...fieldMap.regions.map((r) => r.id), 'tensions', 'reading-path']
    for (const id of ids) {
      const el = document.getElementById(id)
      if (el) {
        observerRef.current.observe(el)
        sectionRefs.current.set(id, el)
      }
    }

    return () => observerRef.current?.disconnect()
  }, [])

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })
  const isExpanded = useCallback((id: string) => expanded.has(id), [expanded])

  const renderIntuition = (int: Intuition, regionIdx?: number) => {
    const articles = regionIdx !== undefined ? fieldMap.regions[regionIdx].articles : []
    return (
      <div key={int.id} className="intuition">
        <span className={`badge ${int.type === 'fact' ? 'badge-fact' : 'badge-opinion'}`}>
          {int.type === 'fact' ? '事实' : '观点'}
        </span>
        {int.text}
        {int.sources.length > 0 && regionIdx !== undefined && (
          <span className="source-ref">
            来源：{int.sources.map((si) => articles[si]?.title.split(' —')[0]).join('、')}
          </span>
        )}
      </div>
    )
  }

  return (
    <div className="app">
      <header className="header">
        <h1>{fieldMap.field}</h1>
        <p className="overview">{fieldMap.overview}</p>
        <p className="meta">最后更新：{fieldMap.lastUpdated}</p>
      </header>

      <nav className="nav">
        <div className="nav-inner">
          {fieldMap.regions.map((r) => (
            <a
              key={r.id}
              href={`#${r.id}`}
              className={activeSection === r.id ? 'nav-active' : ''}
            >
              {r.title}
            </a>
          ))}
          <a
            href="#tensions"
            className={`nav-tension${activeSection === 'tensions' ? ' nav-active' : ''}`}
          >
            争论
          </a>
          <a
            href="#reading-path"
            className={activeSection === 'reading-path' ? 'nav-active' : ''}
          >
            阅读路线
          </a>
        </div>
      </nav>

      {fieldMap.regions.map((region, ri) => (
        <section key={region.id} id={region.id} className="region">
          <div
            className="region-header"
            onClick={() => toggleRegion(region.id)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter') toggleRegion(region.id) }}
          >
            <div className="region-title-row">
              <h2 className="region-title">{region.title}</h2>
              <span className={`expand-icon${isExpanded(region.id) ? ' expanded' : ''}`}>
                {isExpanded(region.id) ? '−' : '+'}
              </span>
            </div>
            <p className="region-thesis">{region.thesis}</p>
            {!isExpanded(region.id) && region.intuitions.length > 0 && (
              <div className="region-preview">
                {renderIntuition(region.intuitions[0], ri)}
                {region.intuitions.length > 1 && (
                  <p className="more-hint">还有 {region.intuitions.length - 1} 条直觉，点击展开</p>
                )}
              </div>
            )}
          </div>

          {isExpanded(region.id) && (
            <div className="region-body">
              <div className="intuitions">
                {region.intuitions.map((int) => renderIntuition(int, ri))}
              </div>

              <div className="pros-cons">
                <div className="pros">
                  <h4>优势</h4>
                  <ul>
                    {region.pros.map((p, i) => <li key={i}>{p}</li>)}
                  </ul>
                </div>
                <div className="cons">
                  <h4>局限</h4>
                  <ul>
                    {region.cons.map((c, i) => <li key={i}>{c}</li>)}
                  </ul>
                </div>
              </div>

              <div className="articles">
                <h4>参考文章</h4>
                {region.articles.map((a, i) => (
                  <div key={i} className="article-ref">
                    <span className={`tier tier-${a.tier}`}>
                      {a.tier === 'primary' ? '首选' : a.tier === 'counterpoint' ? '反方' : '辅助'}
                    </span>
                    <div>
                      <a href={a.translatedUrl || a.url} target="_blank" rel="noopener">
                        {a.title}{a.translatedUrl ? '（中译）' : ''}
                      </a>
                      {a.translatedUrl && (
                        <> · <a href={a.url} target="_blank" rel="noopener" className="original-link">原文</a></>
                      )}
                      <span className="relevance">{a.relevance}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      ))}

      <section id="tensions" className="tensions">
        <h2>核心争论</h2>
        {fieldMap.tensions.map((t) => (
          <div key={t.id} className="tension">
            <div className="question">
              {t.question}
              <span className={`status status-${t.status}`}>
                {t.status === 'active' ? '活跃争论' : t.status === 'emerging' ? '新兴' : '已有结论'}
              </span>
            </div>
            <div className="positions">
              {t.positions.map((p, i) => (
                <div key={i} className="position">
                  <div className="side">{p.side}</div>
                  <div>{p.argument}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      <section id="reading-path" className="reading-path">
        <h2>阅读路线</h2>
        <div className="path-group">
          <div className="path-label">如果你只有 5 分钟</div>
          {fieldMap.readingPath.ifYouHave5Min.map((id) => {
            const int = allIntuitions.get(id)
            return int ? (
              <div key={id} className="path-intuition">
                <span className="path-badge">{int.type === 'fact' ? '事实' : '观点'}</span>
                {int.text}
              </div>
            ) : null
          })}
        </div>
        <div className="path-group">
          <div className="path-label">如果你有 30 分钟</div>
          {fieldMap.readingPath.ifYouHave30Min.map((id) => {
            const int = allIntuitions.get(id)
            return int ? (
              <div key={id} className="path-intuition">
                <span className="path-badge">{int.type === 'fact' ? '事实' : '观点'}</span>
                {int.text}
              </div>
            ) : null
          })}
        </div>
      </section>

      <footer className="footer">
        <p>由 AI 辅助生成，基于 <a href="https://github.com/grapeot/context-infrastructure" target="_blank" rel="noopener">Context Infrastructure</a> 构建。</p>
      </footer>

      {showBackTop && (
        <button className="back-to-top" onClick={scrollToTop} aria-label="回到顶部">
          ↑
        </button>
      )}
    </div>
  )
}

export default App

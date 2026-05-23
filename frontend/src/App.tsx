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
            <a key={r.id} href={`#${r.id}`}>{r.title}</a>
          ))}
          <a href="#tensions" className="nav-tension">争论</a>
          <a href="#reading-path">阅读路线</a>
        </div>
      </nav>

      {fieldMap.regions.map((region) => (
        <section key={region.id} id={region.id} className="region">
          <div className="region-header">
            <h2 className="region-title">{region.title}</h2>
            <p className="region-thesis">{region.thesis}</p>
          </div>

          <ul className="intuitions">
            {region.intuitions.map((int) => (
              <li key={int.id} className="intuition">
                <span className={`badge ${int.type === 'fact' ? 'badge-fact' : 'badge-opinion'}`}>
                  {int.type === 'fact' ? '事实' : '观点'}
                </span>
                {int.text}
                {int.sources.length > 0 && (
                  <span className="source-ref">
                    来源：{int.sources.map((si) => region.articles[si]?.title.split(' —')[0]).join('、')}
                  </span>
                )}
              </li>
            ))}
          </ul>

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
                  <a href={a.url} target="_blank" rel="noopener">{a.title}</a>
                  <span className="relevance">{a.relevance}</span>
                </div>
              </div>
            ))}
          </div>
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
                <span className={`path-badge`}>{int.type === 'fact' ? '事实' : '观点'}</span>
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
                <span className={`path-badge`}>{int.type === 'fact' ? '事实' : '观点'}</span>
                {int.text}
              </div>
            ) : null
          })}
        </div>
      </section>

      <footer className="footer">
        <p>由 AI 辅助生成，基于 <a href="https://github.com/grapeot/context-infrastructure" target="_blank" rel="noopener">Context Infrastructure</a> 构建。</p>
      </footer>
    </div>
  )
}

export default App

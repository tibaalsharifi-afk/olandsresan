import { useEffect, useState } from 'react'
import {
  TRIP,
  TRAVELLERS,
  ITINERARY,
  VICTORIA,
  HISTORY,
  CRAFTS,
  FLEAMARKETS,
  PLAYGROUNDS,
  FOOD,
  DIET_NOTE,
  DIET_TAGS,
  GUYS,
  HOME,
  CAFES,
  BEACHES,
  PACKING,
  SOURCES,
} from './data.js'

// Liten hook för localStorage så packlista & matsedel överlever omladdning
function useLocalStorage(key, initial) {
  const [value, setValue] = useState(() => {
    try {
      const raw = localStorage.getItem(key)
      return raw ? JSON.parse(raw) : initial
    } catch {
      return initial
    }
  })
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch {
      /* ignore */
    }
  }, [key, value])
  return [value, setValue]
}

const NAV = [
  ['schema', 'Schema'],
  ['karta', 'Karta'],
  ['victoria', 'Victoriadagen'],
  ['historia', 'Historia'],
  ['boende', 'Nära boendet'],
  ['killarna', 'För killarna'],
  ['keramik', 'Keramik & loppis'],
  ['lek', 'Lekparker'],
  ['mat', 'Mat'],
  ['packlista', 'Packlista'],
]

function Countdown() {
  const [now, setNow] = useState(() => Date.now())
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(id)
  }, [])
  const target = new Date(`${TRIP.start}T00:00:00`).getTime()
  const diff = Math.max(0, target - now)
  const d = Math.floor(diff / 86400000)
  const h = Math.floor((diff % 86400000) / 3600000)
  const m = Math.floor((diff % 3600000) / 60000)
  const s = Math.floor((diff % 60000) / 1000)
  const arrived = diff === 0
  return (
    <div className="countdown">
      {arrived ? (
        <p className="countdown-arrived">Nu är vi på Öland! 🌷</p>
      ) : (
        [
          [d, 'dagar'],
          [h, 'tim'],
          [m, 'min'],
          [s, 'sek'],
        ].map(([val, label]) => (
          <div className="cd-box" key={label}>
            <span className="cd-num">{String(val).padStart(2, '0')}</span>
            <span className="cd-label">{label}</span>
          </div>
        ))
      )}
    </div>
  )
}

function Scallop() {
  return <div className="scallop" aria-hidden="true" />
}

function MapLink({ href, isLink }) {
  return (
    <a className="map-link" href={href} target="_blank" rel="noreferrer">
      {isLink ? '🔗 Läs mer' : '📍 Öppna karta'}
    </a>
  )
}

function PlaceCard({ name, blurb, travel, map, isLink }) {
  return (
    <div className="card">
      <h3>{name}</h3>
      <p>{blurb}</p>
      {travel && <p className="travel">🚗 {travel}</p>}
      <MapLink href={map} isLink={isLink} />
    </div>
  )
}

function Section({ id, eyebrow, title, children }) {
  return (
    <section id={id} className="section">
      <div className="section-head">
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h2>{title}</h2>
      </div>
      {children}
    </section>
  )
}

function DietTag({ tag }) {
  const t = DIET_TAGS[tag]
  if (!t) return null
  return (
    <span className={`diet-tag diet-${tag}`}>
      {t.icon} {t.label}
    </span>
  )
}

function MealIdeas() {
  return (
    <div className="grid">
      {FOOD.ideas.map((m) => (
        <div className="card meal-card" key={m.name}>
          <h3>{m.name}</h3>
          <p>{m.desc}</p>
          <div className="diet-tags">
            {m.tags.map((tag) => (
              <DietTag key={tag} tag={tag} />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

function Packing() {
  const [checked, setChecked] = useLocalStorage('oland-packlista', {})
  const toggle = (item) => setChecked({ ...checked, [item]: !checked[item] })
  const total = Object.values(PACKING).flat().length
  const done = Object.values(PACKING)
    .flat()
    .filter((i) => checked[i]).length
  return (
    <>
      <div className="packing-progress">
        <span>
          {done} av {total} ipackat
        </span>
        <button className="btn-ghost" onClick={() => setChecked({})}>
          Rensa
        </button>
      </div>
      <div className="grid">
        {Object.entries(PACKING).map(([group, items]) => (
          <div className="card" key={group}>
            <h3>{group}</h3>
            <ul className="check-list">
              {items.map((item) => (
                <li key={item}>
                  <label className={checked[item] ? 'checked' : ''}>
                    <input
                      type="checkbox"
                      checked={!!checked[item]}
                      onChange={() => toggle(item)}
                    />
                    <span>{item}</span>
                  </label>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </>
  )
}

export default function App() {
  return (
    <div className="page">
      <header className="topbar">
        <a href="#top" className="brand">
          🌸 Öland 2026
        </a>
        <nav className="nav">
          {NAV.map(([id, label]) => (
            <a key={id} href={`#${id}`}>
              {label}
            </a>
          ))}
        </nav>
      </header>

      {/* HERO */}
      <section id="top" className="hero">
        <div className="hero-decor hero-decor-l" aria-hidden="true">🌷</div>
        <div className="hero-decor hero-decor-r" aria-hidden="true">🌼</div>
        <span className="eyebrow">Vår lilla utflykt</span>
        <h1>
          Öland
          <span className="hero-dates">13–17 juli 2026</span>
        </h1>
        <p className="hero-sub">
          Bas i {TRIP.base} · keramik, kungligheter, fornlämningar & glass
        </p>
        <Countdown />
        <div className="travellers">
          {TRAVELLERS.map((t) => (
            <div className="traveller" key={t.name}>
              <strong>{t.name}</strong>
              <span>{t.note}</span>
            </div>
          ))}
        </div>
      </section>

      <Scallop />

      {/* SCHEMA */}
      <Section id="schema" eyebrow="Dag för dag" title="Vårt schema">
        <p className="lead">Ett förslag — flytta runt som ni vill! 🌿</p>
        <div className="grid">
          {ITINERARY.map((d) => (
            <div
              className={`card day-card${d.highlight ? ' day-highlight' : ''}`}
              key={d.day}
            >
              <span className="day-icon">{d.icon}</span>
              <span className="day-label">{d.day}</span>
              <h3>{d.title}</h3>
              <ul className="flower-list">
                {d.items.map((it, i) => (
                  <li key={i}>{it}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      {/* KARTA */}
      <Section id="karta" eyebrow="Hitta rätt" title="Karta 🗺️">
        <p className="lead">
          Vår bas är {TRIP.base}. Klicka i kartan för att zooma och utforska området.
        </p>
        <div className="map-embed">
          <iframe
            title="Karta över Öland"
            src="https://maps.google.com/maps?q=Borgholm,%20%C3%96land&z=10&output=embed"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
        <p className="map-hint">
          📍 Varje plats längre ner har en egen <strong>“Öppna karta”</strong>-knapp som tar dig direkt dit.
        </p>
      </Section>

      <Scallop />

      {/* VICTORIADAGEN */}
      <section id="victoria" className="section section-pink">
        <div className="section-head">
          <span className="eyebrow">14 juli</span>
          <h2>Victoriadagen 👑</h2>
        </div>
        <p className="lead">{VICTORIA.note}</p>
        <div className="timeline">
          {VICTORIA.schedule.map((e) => (
            <div className="timeline-item" key={e.time}>
              <div className="timeline-time">{e.time}</div>
              <div className="timeline-body card">
                <h3>{e.what}</h3>
                <p>{e.desc}</p>
                <span className="travel">📍 {e.place}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="link-row">
          {VICTORIA.links.map((l) => (
            <a key={l.url} className="btn-ghost" href={l.url} target="_blank" rel="noreferrer">
              {l.label}
            </a>
          ))}
        </div>
      </section>

      <Scallop />

      {/* HISTORIA */}
      <Section id="historia" eyebrow="För historieälskaren" title="Historia i norr 🪨">
        <p className="lead">
          Skeppssättningar och fornborgar. Källa ödekyrka ligger granne med Löttorp — resten en tur söderut.
        </p>
        <div className="grid">
          {HISTORY.map((p) => (
            <PlaceCard key={p.name} {...p} />
          ))}
        </div>
      </Section>

      <Scallop />

      {/* NÄRA BOENDET */}
      <Section id="boende" eyebrow="Nära boendet" title="Fika, bröd & bad 🏡">
        <p className="lead">
          Vi bor på {HOME.address}. Här är fik & bageri för bröd hem, plus två badplatser nära.{' '}
          <a className="inline-link" href={HOME.map} target="_blank" rel="noreferrer">
            📍 Boendet på kartan
          </a>
        </p>
        <h3 className="subhead">Café & bageri 🥐</h3>
        <div className="grid">
          {CAFES.map((p) => (
            <PlaceCard key={p.name} {...p} />
          ))}
        </div>
        <h3 className="subhead">Badplatser 🏖️</h3>
        <div className="grid">
          {BEACHES.map((p) => (
            <PlaceCard key={p.name} {...p} />
          ))}
        </div>
      </Section>

      {/* FÖR KILLARNA */}
      <section id="killarna" className="section section-pink">
        <div className="section-head">
          <span className="eyebrow">För killarna</span>
          <h2>Öl & lokal mat 🍺</h2>
        </div>
        <p className="lead">{GUYS.intro}</p>
        <div className="grid">
          {GUYS.spots.map((p) => (
            <PlaceCard key={p.name} {...p} />
          ))}
        </div>
      </section>

      <Scallop />

      {/* KERAMIK & LOPPIS */}
      <section id="keramik" className="section">
        <div className="section-head">
          <span className="eyebrow">För vännerna</span>
          <h2>Keramik & loppis 🏺</h2>
        </div>
        <div className="grid">
          {CRAFTS.map((p) => (
            <PlaceCard key={p.name} {...p} />
          ))}
        </div>
        <div className="card flea-card">
          <h3>Loppis 🛍️</h3>
          <p>{FLEAMARKETS.blurb}</p>
          <ul className="flower-list">
            {FLEAMARKETS.tips.map((t, i) => (
              <li key={i}>{t}</li>
            ))}
          </ul>
          <a className="map-link" href={FLEAMARKETS.link.url} target="_blank" rel="noreferrer">
            🔗 {FLEAMARKETS.link.label}
          </a>
        </div>
      </section>

      <Scallop />

      {/* LEKPARKER */}
      <Section id="lek" eyebrow="För minstingen (1 år)" title="Lekparker & barn 🧸">
        <div className="grid">
          {PLAYGROUNDS.map((p) => (
            <PlaceCard key={p.name} {...p} />
          ))}
        </div>
      </Section>

      {/* MAT */}
      <section id="mat" className="section section-pink">
        <div className="section-head">
          <span className="eyebrow">Mat & fika</span>
          <h2>Mat 🍓</h2>
        </div>
        <p className="diet-note">{DIET_NOTE}</p>
        <h3 className="subhead">Maträttsförslag</h3>
        <MealIdeas />
        <div className="card" style={{ marginTop: 18 }}>
          <h3>Ute i Borgholm</h3>
          <ul className="flower-list">
            {FOOD.restaurants.map((r, i) => (
              <li key={i}>{r}</li>
            ))}
          </ul>
        </div>
      </section>

      <Scallop />

      {/* PACKLISTA */}
      <Section id="packlista" eyebrow="Glöm inget" title="Packlista 🧳">
        <Packing />
      </Section>

      <footer className="footer">
        <p>Gjord med 🌸 inför vår Ölandsresa · 13–17 juli 2026</p>
        <div className="link-row">
          {SOURCES.map((s) => (
            <a key={s.url} href={s.url} target="_blank" rel="noreferrer">
              {s.label}
            </a>
          ))}
        </div>
        <p className="footnote">Tips & tider kan ändras — kolla länkarna inför besöket.</p>
      </footer>
    </div>
  )
}

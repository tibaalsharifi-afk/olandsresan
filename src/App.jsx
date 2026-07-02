import { useEffect, useRef, useState } from 'react'
import {
  TRIP,
  TRAVELLERS,
  ITINERARY,
  ROADSTOP,
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
  CHORE_PEOPLE,
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

// Alla flikar. Ordning = ordning i menyn + på startsidan.
const SECTIONS = [
  { id: 'schema', icon: '📅', label: 'Aktiviteter', blurb: 'Dag-för-dag-förslag på vad vi gör.' },
  { id: 'karta', icon: '🗺️', label: 'Karta', blurb: 'Vår bas och området runt Borgholm.' },
  { id: 'victoria', icon: '👑', label: 'Victoriadagen', blurb: 'Program för 14 juli i Borgholm.' },
  { id: 'historia', icon: '🪨', label: 'Historia', blurb: 'Skeppssättningar och fornborgar.' },
  { id: 'boende', icon: '🏡', label: 'Nära boendet', blurb: 'Fik, bageri och badplatser nära huset.' },
  { id: 'killarna', icon: '🍺', label: 'För killarna', blurb: 'Öl och lokal mat.' },
  { id: 'keramik', icon: '🏺', label: 'Keramik & loppis', blurb: 'Krukmakerier och loppisfynd.' },
  { id: 'lek', icon: '🧸', label: 'Lekparker', blurb: 'För minstingen (1 år).' },
  { id: 'mat', icon: '🍓', label: 'Mat', blurb: 'Matidéer och restauranger.' },
  { id: 'hjul', icon: '🎡', label: 'Lyckohjul', blurb: 'Vem lagar och vem diskar?' },
  { id: 'packlista', icon: '🧳', label: 'Packlista', blurb: 'Bocka av inför avfärd.' },
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

const WHEEL_COLORS = ['#C0392B', '#E0A54F', '#6F8B5B', '#B13A4E', '#5E86A3', '#CC7A54']

function Wheel() {
  const [rotation, setRotation] = useState(0)
  const [spinning, setSpinning] = useState(false)
  const [cook, setCook] = useState(null)
  const [dishes, setDishes] = useState(null)
  const pending = useRef(null)

  const people = CHORE_PEOPLE
  const R = 130
  const C = 130
  const seg = 360 / people.length
  const polar = (deg, radius) => {
    const a = (deg * Math.PI) / 180
    return [C + radius * Math.sin(a), C - radius * Math.cos(a)]
  }
  const slices = people.map((name, i) => {
    const [x1, y1] = polar(i * seg, R)
    const [x2, y2] = polar((i + 1) * seg, R)
    const [lx, ly] = polar(i * seg + seg / 2, R * 0.62)
    const large = seg > 180 ? 1 : 0
    return {
      name,
      color: WHEEL_COLORS[i % WHEEL_COLORS.length],
      d: `M ${C} ${C} L ${x1.toFixed(2)} ${y1.toFixed(2)} A ${R} ${R} 0 ${large} 1 ${x2.toFixed(2)} ${y2.toFixed(2)} Z`,
      lx,
      ly,
    }
  })

  const spin = (mode) => {
    if (spinning) return
    const exclude = mode === 'cook' ? dishes : cook
    const pool = people.filter((n) => n !== exclude)
    const chosen = pool[Math.floor(Math.random() * pool.length)]
    const idx = people.indexOf(chosen)
    const centerAngle = idx * seg + seg / 2
    const desiredMod = (360 - centerAngle + 360) % 360
    const currentMod = ((rotation % 360) + 360) % 360
    const delta = (desiredMod - currentMod + 360) % 360
    pending.current = { mode, chosen }
    setSpinning(true)
    setRotation(rotation + 360 * 5 + delta)
  }

  const onDone = () => {
    if (!pending.current) return
    const { mode, chosen } = pending.current
    if (mode === 'cook') setCook(chosen)
    else setDishes(chosen)
    pending.current = null
    setSpinning(false)
  }

  return (
    <div className="wheel-block">
      <div className="wheel-wrap">
        <div className="wheel-pointer" aria-hidden="true" />
        <div
          className="wheel-spin"
          style={{
            transform: `rotate(${rotation}deg)`,
            transition: spinning
              ? 'transform 4.2s cubic-bezier(0.17, 0.67, 0.21, 1)'
              : 'none',
          }}
          onTransitionEnd={onDone}
        >
          <svg viewBox="0 0 260 260">
            {slices.map((s) => (
              <path key={s.name} d={s.d} fill={s.color} stroke="#fffdf8" strokeWidth="2" />
            ))}
            {slices.map((s) => (
              <text
                key={`t-${s.name}`}
                x={s.lx}
                y={s.ly}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="15"
                fontWeight="800"
                fill="#fffdf8"
              >
                {s.name}
              </text>
            ))}
            <circle cx={C} cy={C} r="128" fill="none" stroke="#9c2b20" strokeWidth="3" />
            <circle cx={C} cy={C} r="11" fill="#fffdf8" stroke="#9c2b20" strokeWidth="2" />
          </svg>
        </div>
      </div>

      <div className="wheel-buttons">
        <button className="wheel-btn" onClick={() => spin('cook')} disabled={spinning}>
          🍳 Vem lagar maten?
        </button>
        <button
          className="wheel-btn wheel-btn-alt"
          onClick={() => spin('dishes')}
          disabled={spinning}
        >
          🧽 Vem diskar?
        </button>
      </div>

      <div className="wheel-results">
        <div className="wheel-result">
          <span>🍳 Lagar maten</span>
          <strong>{cook || '—'}</strong>
        </div>
        <div className="wheel-result">
          <span>🧽 Diskar</span>
          <strong>{dishes || '—'}</strong>
        </div>
      </div>
    </div>
  )
}

/* ---------- Kartan (delas av startsidan & Karta-fliken) ---------- */
function MapEmbed() {
  return (
    <div className="map-embed">
      <iframe
        title="Karta över Öland"
        src="https://maps.google.com/maps?q=Borgholm,%20%C3%96land&z=10&output=embed"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
    </div>
  )
}

/* ---------- Startsidan ---------- */
function HomeView({ go }) {
  return (
    <>
      <section id="top" className="hero">
        <div className="hero-decor hero-decor-l" aria-hidden="true">
          🌷
        </div>
        <div className="hero-decor hero-decor-r" aria-hidden="true">
          🌼
        </div>
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

      {/* Var ska vi vara? */}
      <section className="section">
        <div className="section-head">
          <span className="eyebrow">Var ska vi vara?</span>
          <h2>Vår bas: {TRIP.base} 📍</h2>
        </div>
        <p className="lead">
          Vi bor på {HOME.address}. Härifrån når vi keramik i norr, Borgholm och slottet, badvikar och
          fornlämningar. Klicka i kartan för att zooma och utforska.
        </p>
        <MapEmbed />
        <div className="link-row">
          <a className="btn-ghost" href={HOME.map} target="_blank" rel="noreferrer">
            📍 Boendet på kartan
          </a>
          <button className="btn-ghost" onClick={() => go('karta')}>
            🗺️ Öppna kartfliken
          </button>
        </div>
      </section>

      <Scallop />

      {/* Sammanfattning – klicka vidare */}
      <section className="section">
        <div className="section-head">
          <span className="eyebrow">Allt på ett ställe</span>
          <h2>Utforska resan 🌸</h2>
        </div>
        <p className="lead">Tryck på en ruta för att läsa mer — eller använd menyn uppe till höger.</p>
        <div className="grid home-grid">
          {SECTIONS.map((s) => (
            <button className="card home-card" key={s.id} onClick={() => go(s.id)}>
              <span className="home-card-icon">{s.icon}</span>
              <h3>{s.label}</h3>
              <p>{s.blurb}</p>
              <span className="home-card-cta">Öppna →</span>
            </button>
          ))}
        </div>
      </section>
    </>
  )
}

/* ---------- Enskilda flikar ---------- */
function SchemaView() {
  return (
    <Section id="schema" eyebrow="Dag för dag" title="Förslag på aktiviteter">
      <p className="lead">Ett förslag — flytta runt som ni vill! 🌿</p>
      <div className="card day-highlight roadstop-card">
        <span className="day-icon">🚗</span>
        <span className="day-label">På vägen ner</span>
        <h3>{ROADSTOP.name}</h3>
        <p>{ROADSTOP.blurb}</p>
        <p className="travel">📍 {ROADSTOP.travel}</p>
        <MapLink href={ROADSTOP.map} />
      </div>
      <div className="grid">
        {ITINERARY.map((d) => (
          <div className={`card day-card${d.highlight ? ' day-highlight' : ''}`} key={d.day}>
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
  )
}

function KartaView() {
  return (
    <Section id="karta" eyebrow="Hitta rätt" title="Karta 🗺️">
      <p className="lead">
        Vår bas är {TRIP.base}. Klicka i kartan för att zooma och utforska området.
      </p>
      <MapEmbed />
      <p className="map-hint">
        📍 Varje plats har en egen <strong>“Öppna karta”</strong>-knapp som tar dig direkt dit.
      </p>
    </Section>
  )
}

function VictoriaView() {
  return (
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
  )
}

function HistoriaView() {
  return (
    <Section id="historia" eyebrow="För historieälskaren" title="Historia i norr 🪨">
      <p className="lead">
        Skeppssättningar och fornborgar. Källa ödekyrka ligger granne med Löttorp — resten en tur
        söderut.
      </p>
      <div className="grid">
        {HISTORY.map((p) => (
          <PlaceCard key={p.name} {...p} />
        ))}
      </div>
    </Section>
  )
}

function BoendeView() {
  return (
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
  )
}

function KillarnaView() {
  return (
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
  )
}

function KeramikView() {
  return (
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
  )
}

function LekView() {
  return (
    <Section id="lek" eyebrow="För minstingen (1 år)" title="Lekparker & barn 🧸">
      <div className="grid">
        {PLAYGROUNDS.map((p) => (
          <PlaceCard key={p.name} {...p} />
        ))}
      </div>
    </Section>
  )
}

function MatView() {
  return (
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
  )
}

function HjulView() {
  return (
    <Section id="hjul" eyebrow="Vem gör vad?" title="Lyckohjulet 🎡">
      <p className="lead">
        Snurra för att bestämma vem som lagar maten och vem som diskar! Floris slipper — han är för
        liten. 👶
      </p>
      <Wheel />
    </Section>
  )
}

function PacklistaView() {
  return (
    <Section id="packlista" eyebrow="Glöm inget" title="Packlista 🧳">
      <Packing />
    </Section>
  )
}

const VIEWS = {
  schema: SchemaView,
  karta: KartaView,
  victoria: VictoriaView,
  historia: HistoriaView,
  boende: BoendeView,
  killarna: KillarnaView,
  keramik: KeramikView,
  lek: LekView,
  mat: MatView,
  hjul: HjulView,
  packlista: PacklistaView,
}

export default function App() {
  const [view, setView] = useState('home')
  const [menuOpen, setMenuOpen] = useState(false)

  const go = (id) => {
    setView(id)
    setMenuOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const ActiveView = view === 'home' ? null : VIEWS[view]

  return (
    <div className="page">
      <header className="topbar">
        <button className="brand" onClick={() => go('home')}>
          🌸 Öland 2026
        </button>
        <button
          className="hamburger"
          aria-label="Öppna meny"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((o) => !o)}
        >
          <span className="hamburger-icon">{menuOpen ? '✕' : '☰'}</span>
          <span className="hamburger-text">Meny</span>
        </button>
      </header>

      {menuOpen && (
        <>
          <div className="menu-backdrop" onClick={() => setMenuOpen(false)} />
          <nav className="menu-panel">
            <button
              className={`menu-item${view === 'home' ? ' active' : ''}`}
              onClick={() => go('home')}
            >
              🏠 Start
            </button>
            {SECTIONS.map((s) => (
              <button
                key={s.id}
                className={`menu-item${view === s.id ? ' active' : ''}`}
                onClick={() => go(s.id)}
              >
                {s.icon} {s.label}
              </button>
            ))}
          </nav>
        </>
      )}

      {view === 'home' ? (
        <HomeView go={go} />
      ) : (
        <main className="subpage">
          <button className="back-btn" onClick={() => go('home')}>
            ← Tillbaka till start
          </button>
          <ActiveView />
        </main>
      )}

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

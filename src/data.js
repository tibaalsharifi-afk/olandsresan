// All platsdata är research-verifierad (juni 2026). Inga påhittade platser.
// Öppettider/priser ändras säsongsvis — därför länkar vi till källan i stället för att hårdkoda.

const maps = (q) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`

// Resans datum — används av nedräkningen och hero
export const TRIP = {
  start: '2026-07-13',
  end: '2026-07-17',
  base: 'Löttorp, norra Öland',
}

export const TRAVELLERS = [
  { name: 'Tiba & Oa', note: 'historieintresse 🏛️' },
  { name: 'Elin, Dilom & Floris (1 år)', note: 'familjen 👶' },
  { name: 'Dilan', note: 'keramik & loppis 🏺' },
]

// Vuxna som kan laga mat/diska (Floris, 1 år, slipper) — till lyckohjulet
export const CHORE_PEOPLE = ['Tiba', 'Oa', 'Elin', 'Dilom', 'Dilan']

// Dag-för-dag — markerat som förslag, justerbart
export const ITINERARY = [
  {
    day: 'Måndag 13 juli',
    title: 'Ankomst & incheckning',
    icon: '🚗',
    items: [
      'Resa över Ölandsbron & incheckning',
      'Handla mat till stugan',
      'Första lekparksbesök för minstingen + en lugn kväll',
    ],
  },
  {
    day: 'Tisdag 14 juli',
    title: 'Victoriadagen',
    icon: '👑',
    highlight: true,
    items: [
      'Lugn förmiddag, lunch i Borgholm',
      'Eftermiddag: Victoriadagen — allsång vid Solliden, hästkortegen & Victoriakonserten (se egen sektion)',
    ],
  },
  {
    day: 'Onsdag 15 juli',
    title: 'Historiedag i norr',
    icon: '🪨',
    items: [
      'Karums alvar – skeppssättningen "Noaks ark" + gravfältet',
      'Gråborg (Ölands största fornborg) & S:t Knuts kapell',
      'Köpingsvik – vikingatida handelsplats & runstenar',
      'Picknick på alvaret',
    ],
  },
  {
    day: 'Torsdag 16 juli',
    title: 'Keramik & loppis',
    icon: '🏺',
    items: [
      'Keramikrundan / verkstäder norr om Borgholm (Källa Keramik m.fl.)',
      'Loppisbummel i Borgholm (störst utbud på ön)',
      'Lekparkspaus för barnet mitt på dagen',
    ],
  },
  {
    day: 'Fredag 17 juli',
    title: 'Solliden & avresa',
    icon: '🌷',
    items: [
      'Sollidens slottsträdgård – barnaktiviteter, ponnyridning, café',
      'Sista glassen och hemfärd',
    ],
  },
]

// Halvvägs-stopp på väg ner till Öland (E22)
export const ROADSTOP = {
  name: 'Tindered Trädgård & Café',
  blurb:
    'Mysigt växthuscafé vid E22 i Edsbruk — fika, stenugnsbakad pizza, sallad & smörgås, plus blommor och en lekplats för barnen. Perfekt bensträckare och halvvägs-fika på väg ner.',
  travel: 'E22, Edsbruk · öppet 11–18',
  map: maps('Tindered Trädgård Café Edsbruk E22'),
}

// Verifierat schema för Victoriadagen 14 juli (kungahuset.se / victoriadagarna.se)
export const VICTORIA = {
  note: 'Victoriadagarna (festivalen) pågår 12–15 juli. Själva födelsedagen firas 14 juli.',
  schedule: [
    {
      time: 'ca 15.50',
      what: 'Allsång vid Sollidens slott',
      desc: 'Kungafamiljen kommer ut till rundeln framför slottet och allmänheten sjunger tillsammans med Borgholms kulturskolas barnkör.',
      place: 'Sollidens slott',
    },
    {
      time: '16.00',
      what: 'Hästkortege genom Borgholm',
      desc: 'Kortegen går från Solliden via Prinsessan Estelles promenad genom stan fram till Borgholms slott.',
      place: 'Borgholm centrum',
    },
    {
      time: '17.00',
      what: 'Victoriakonserten i slottsruinen',
      desc: 'Konsert i Borgholms slottsruin med bl.a. The Ark, Petra Marklund, Fanny Avonne & Mira Ray. Victoriapriset delas ut.',
      place: 'Borgholms slottsruin',
    },
  ],
  links: [
    { label: 'Victoriadagarna – program', url: 'https://victoriadagarna.se/' },
    { label: 'oland.se – Victoriadagarna', url: 'https://www.oland.se/victoriadagarna' },
  ],
}

export const HISTORY = [
  {
    name: 'Källa ödekyrka',
    blurb:
      'Medeltida försvarskyrka i sten — atmosfärisk ruin med tjocka murar. Ligger granne med Löttorp, så börja gärna här.',
    travel: '~10 min söderut (Källa)',
    map: maps('Källa ödekyrka Öland'),
  },
  {
    name: 'Karums alvar – "Noaks ark"',
    blurb:
      '26 meter lång skeppssättning och ett järnåldersgravfält med ca 70 synliga fornlämningar. Mäktigast i kvällsljus.',
    travel: '~35 min söderut (nära Köping)',
    map: maps('Karums alvar Noaks ark skeppssättning Öland'),
  },
  {
    name: 'Köpingsvik',
    blurb:
      'Vikingatida handelsplats med lång historia, kyrka och runstenar. Trevlig promenad och historia på nära håll.',
    travel: '~30 min söderut',
    map: maps('Köpingsvik Öland'),
  },
  {
    name: 'Gråborg & S:t Knuts kapell',
    blurb:
      'Ölands största fornborg, strategiskt placerad i inlandet. Intill ligger den medeltida ödekyrkan S:t Knuts kapell.',
    travel: '~40 min söderut',
    map: maps('Gråborg fornborg Öland'),
  },
  {
    name: 'Ismantorps borg',
    blurb:
      'En av Sveriges bäst bevarade fornborgar (ca 200–600 e.Kr.) med 95 synliga husgrunder och hela nio portar. Ligger mystiskt mitt i Mittlandsskogen.',
    travel: '~45 min söderut',
    map: maps('Ismantorps borg Öland'),
  },
  {
    name: 'Borgholms slottsruin',
    blurb:
      'Norra Europas största slottsruin. Guidningar, utställningar och barnaktiviteter innanför murarna. Kombinera med Victoriadagen!',
    travel: '~30 min söderut (Borgholm)',
    map: maps('Borgholms slott slottsruin'),
  },
]

export const CRAFTS = [
  {
    name: 'Keramikrundan',
    blurb: 'En rutt mellan flera keramikverkstäder på ön — perfekt för en hel keramikdag.',
    map: 'https://www.oland.se/keramikrundan',
    isLink: true,
  },
  {
    name: 'Källa Keramik',
    blurb: 'Tre keramiker längs väg 136, nära Källa. Brukskeramik och skulptur — närmast boendet.',
    travel: '~10–15 min söderut',
    map: maps('Källa Keramik Öland'),
  },
  {
    name: 'Alséns',
    blurb: 'Svensk keramik & design vid Landborgen med utsikt mot Kalmarsund. Se hantverket på plats.',
    travel: '~30 min söderut',
    map: maps('Alséns keramik Öland'),
  },
  {
    name: 'Kookoon (Borgholm)',
    blurb: 'Egendesignad brukskeramik på Storgatan, mitt i Borgholm.',
    travel: '~30 min söderut (Borgholm)',
    map: maps('Kookoon keramik Storgatan Borgholm'),
  },
  {
    name: 'Paradisverkstaden',
    blurb: 'Handgjord öländsk keramik för dukning och hem/trädgård.',
    map: maps('Paradisverkstaden keramik Öland'),
  },
  {
    name: 'Capellagårdens hantverksbutik',
    blurb:
      'Hantverksskolans butik i Vickleby — unika alster i keramik, textil & möbler av elever och lärare, plus böcker om hantverk. Öppet helger i juni och hela sommaren.',
    travel: '~1 tim 10 söderut (Vickleby, södra Öland)',
    map: maps('Capellagården Vickleby bygata 25 Öland'),
  },
]

export const FLEAMARKETS = {
  blurb:
    'Öland är ett loppisparadis — nästan varje by har sin loppis. Borgholm har störst utbud och räcker till en hel dag.',
  tips: [
    'Bästa loppisdagen: Borgholm med omnejd.',
    'Kolla dagsaktuella loppisar i evenemangskalendern på oland.com.',
    'Bonus om ni stannar längre: Södviks loppis 18–19 juli (norra Öland, precis efter er hemresa).',
  ],
  link: { label: 'Loppiskalender – oland.com', url: 'https://www.oland.com/kategori/dagsevenemang/evenemangskategorier/loppis-marknad/' },
}

export const PLAYGROUNDS = [
  {
    name: 'Kotteparken, Löttorp',
    blurb: 'Linbana, klätterställningar och flera gungor (inkl. kompisgunga). Renoverad våren 2026. I Löttorp — närmast!',
    travel: 'I Löttorp',
    map: maps('Kotteparken Sandvägen 1 Löttorp'),
  },
  {
    name: 'Lådbilslandet, Löttorp',
    blurb: 'Miniatyrvärld där de mindre barnen kör runt i egna lådbilar. Perfekt för de små.',
    travel: 'I Löttorp',
    map: maps('Lådbilslandet Löttorp Öland'),
  },
  {
    name: 'Källa Glassgård',
    blurb: 'Familjeägd glassrestaurang på norra Öland med stort lekland — glass + lek i ett.',
    travel: '~10 min söderut',
    map: maps('Källa Glassgård Öland'),
  },
  {
    name: 'Sollidens lekpark',
    blurb: 'Fin lekpark precis utanför grindarna till Sollidens slott. Smidigt att kombinera med trädgårdsbesöket.',
    travel: '~30 min söderut (Borgholm)',
    map: maps('Sollidens slott lekpark Borgholm'),
  },
]

// Kosten i gruppen: 3 vegetarianer (varav 1 äter fisk) + 1 köttätare.
// Idén: laga en vegetarisk bas som alla kan äta, med fisk- och kött-tillval.
export const DIET_NOTE =
  'Vi är 3 vegetarianer (varav en äter fisk) och en köttätare. Förslagen har en vegetarisk bas — lägg bara till 🐟 fisk eller 🥩 kött som tillval så blir alla nöjda.'

export const FOOD = {
  restaurants: [
    'Borgholm är fullt av restauranger, caféer och fiskrestauranger — särskilt under sommaren.',
    'Café & glasskiosk finns vid Sollidens slott och innanför Borgholms slott.',
    'Tips: boka bord i förväg under Victoriadagarna (12–15 juli) — det är högsäsong.',
  ],
  // Maträttsförslag att laga i stugan. tags: veg = vegetariskt, fisk, kött
  ideas: [
    {
      name: 'Halloumi- & grönsaksspett från grillen',
      desc: 'Grillad halloumi, paprika, zucchini & lök. Tillval: 🐟 laxspett, 🥩 fläsk-/kycklingspett.',
      tags: ['veg', 'fisk', 'kött'],
    },
    {
      name: 'Ölandstomatsallad med picknickbröd',
      desc: 'Soltomater, basilika, olivolja & bröd — perfekt picknick på alvaret. Toppa med 🐟 inlagd sill för fiskätaren.',
      tags: ['veg', 'fisk'],
    },
    {
      name: 'Krämig svamp- & spenatpasta',
      desc: 'Snabb stug-middag som alla kan äta. Tillval: stekt 🐟 lax eller 🥩 bacon vid sidan.',
      tags: ['veg', 'fisk', 'kött'],
    },
    {
      name: 'Tacobuffé med många tillbehör',
      desc: 'Bönröra + grönsaker som bas, så väljer var och en: 🐟 stekt fisk eller 🥩 köttfärs i sin egen taco.',
      tags: ['veg', 'fisk', 'kött'],
    },
    {
      name: 'Öländska kroppkakor',
      desc: 'Lokal klassiker — finns både vegetariska och med 🥩 fläsk. Köp färdiga på gårdsbutik eller ät på krog.',
      tags: ['veg', 'kött'],
    },
    {
      name: 'Stekt strömming / fisk & potatis',
      desc: 'Färsk fisk från kusten åt 🐟 fiskätaren, med kokt nypotatis & dillsmör som alla delar.',
      tags: ['fisk'],
    },
    {
      name: 'Frukost: ägg, yoghurt, bär & bröd',
      desc: 'Lokala jordgubbar i juli! Enkel buffé som passar alla i sällskapet.',
      tags: ['veg'],
    },
  ],
}

export const DIET_TAGS = {
  veg: { label: 'Vegetariskt', icon: '🥗' },
  fisk: { label: 'Fisk', icon: '🐟' },
  kött: { label: 'Kött', icon: '🥩' },
}

// Vårt boende (Löttorp, norra Öland) + närliggande fika/bröd & bad
export const HOME = {
  address: 'Ivans väg 16, Löttorp',
  map: maps('Ivans väg 16 Löttorp Öland'),
}

export const CAFES = [
  {
    name: 'Löttorps Konditori',
    blurb:
      'Traditionellt konditori & bageri mitt i Löttorp — tårtor, smörgåsar och färskt surdegsbröd. Närmast boendet.',
    travel: 'I Löttorp',
    map: maps('Löttorps Konditori Öland'),
  },
  {
    name: 'Kaffestugan i Böda',
    blurb:
      'Älskat hantverksbageri nära Böda hamn — långjäst stenugnsbakat surdegsbröd, vetebröd och fina bakverk. Perfekt fika + bröd hem.',
    travel: '~10 min mot Böda',
    map: maps('Kaffestugan i Böda Öland'),
  },
  {
    name: 'Bageriet vid Böda Sand',
    blurb:
      'Bageri där allt bröd bakas från grunden med smör (Bödasandsallén). Doften av nybakat ligger som dimma på morgonen.',
    travel: '~12 min (Böda Sand)',
    map: maps('Bageriet Böda Sand Löttorp'),
  },
]

export const BEACHES = [
  {
    name: 'Böda Sand',
    blurb:
      'En av Sveriges finaste stränder — flera kilometer mjuk sand och långgrunt vatten. Toaletter, aktiviteter och barnvänligt. Närmast boendet.',
    travel: '~12 min (Böda)',
    map: maps('Böda Sand strand Öland'),
  },
  {
    name: 'Lyckesand',
    blurb:
      'Långgrund, barnvänlig sandstrand strax norr om Böda sand. Träramper ner till sanden gör det lätt med barnvagn — toppen för 1-åringen.',
    travel: '~15 min (Böda)',
    map: maps('Lyckesand strand Böda Öland'),
  },
]

// För killarna: ett mysigt ölställe med mat (+ de gillar historia, se historiesektionen)
export const GUYS = {
  intro:
    'Ingen i gänget dricker särskilt mycket — men ett mysigt ölställe med riktigt god mat är värt ett besök. Ligger en bit söderut, så kombinera gärna med en dag i Borgholm/historian.',
  spots: [
    {
      name: 'Fireside Brewery (Rälla)',
      blurb: 'Eget hantverksbryggeri med craft beer, beer garden och riktigt god mat — lika trevligt för en öl som för en bit mat.',
      travel: '~45 min söderut (Rälla)',
      map: maps('Fireside Brewery Rälla Öland'),
    },
  ],
}

export const PACKING = {
  Allmänt: [
    'Solkräm & solglasögon',
    'Vindjacka (det blåser på alvaret)',
    'Bekväma skor för fornlämningar',
    'Vattenflaskor',
    'Laddare & powerbank',
    'Kontanter till loppisar',
  ],
  'Barn (1 år)': [
    'Blöjor & våtservetter',
    'Solhatt & barnsolkräm',
    'Barnvagn / bärsele',
    'Extra ombyte',
    'Snacks & matlåda',
    'Gosedjur för sovstunder',
  ],
  Victoriadagen: [
    'Picknickfilt',
    'Något festligt att ha på sig',
    'Liten flagga 🇸🇪',
    'Regnplagg (för säkerhets skull)',
  ],
  Strand: [
    'Badkläder & handduk',
    'Strandleksaker till barnet',
    'Solskydd / parasoll',
  ],
}

export const SOURCES = [
  { label: 'oland.se', url: 'https://www.oland.se/' },
  { label: 'victoriadagarna.se', url: 'https://victoriadagarna.se/' },
  { label: 'borgholm.se (lekplatser)', url: 'https://www.borgholm.se/lekplatser/' },
  { label: 'kungahuset.se', url: 'https://www.kungahuset.se/' },
]

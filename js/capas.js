// ============================================================
//  capas.js — Simulación de capas de abstracción
// ============================================================

const PYRAMID_LAYERS = [
  { name: 'Aplicación',                  sub: 'WhatsApp, YouTube…',          bg: '#0d2b1f', tc: '#5dcaa5', sc: '#2a7a58' },
  { name: 'Lenguaje de programación',    sub: 'Python, Java, C…',            bg: '#0d1f35', tc: '#7ab3f5', sc: '#3a6aa0' },
  { name: 'Sistema operativo',           sub: 'Windows, Linux, macOS…',      bg: '#2a1f08', tc: '#f5c060', sc: '#8a6020' },
  { name: 'Lenguaje máquina (bits)',      sub: '01001000 01101111…',          bg: '#2a1008', tc: '#f09575', sc: '#8a4020' },
  { name: 'Transistores / Hardware',     sub: '10 000 millones en un chip',  bg: '#1a1235', tc: '#afa9ec', sc: '#5a50a0' },
];

const PILL_DESCS = [
  'Las apps usan lenguajes de programación para darle órdenes al sistema operativo.',
  'Código cercano al español. Un compilador lo traduce a instrucciones de máquina.',
  'El árbitro: reparte CPU y memoria entre todas las apps sin que se peleen.',
  '8 bits = 1 byte = 1 carácter. Todo lo que ves en pantalla son 0s y 1s.',
  'Hardware físico: transistores del tamaño de átomos que se encienden y apagan miles de millones de veces por segundo.',
];

const HINT_MSGS = [
  { text: 'Capa 4 — El código convierte el texto a datos…',      done: false },
  { text: 'Capa 3 — El SO lo envía al módulo de red…',           done: false },
  { text: 'Capa 2 — Se convierte en miles de 0s y 1s…',         done: false },
  { text: 'Capa 1 — Los transistores transmiten la señal…',      done: false },
  { text: '✓ ¡Entregado al destinatario!',                       done: true  },
];

const STAGES = [
  {
    num: 'Inicio',
    title: 'El viaje completo',
    sub: 'Desde un transistor hasta tu app favorita',
    render(el) {
      el.innerHTML = `
        <div class="pyramid-wrap" id="pyramid">
          ${PYRAMID_LAYERS.map((l, i) => `
            <div class="layer-pill ${i === 0 ? '' : 'inactive'}" id="pl-${i}"
                 style="width:${100 - i * 11}%; background:${l.bg}"
                 onclick="clickPill(${i})">
              <div class="pill-name" style="color:${l.tc}">${l.name}</div>
              <div class="pill-sub"  style="color:${l.sc}">${l.sub}</div>
            </div>
          `).join('')}
        </div>
        <p class="pyramid-hint">Haz clic en cada capa para descubrir qué hace</p>
        <div id="pill-detail" style="display:none" class="detail-box">
          <div class="detail-box-title" id="pd-title"></div>
          <div class="detail-box-desc"  id="pd-desc"></div>
        </div>
      `;
    }
  },
  {
    num: 'Capa 1',
    title: 'El transistor',
    sub: 'El interruptor más pequeño del mundo',
    render(el) {
      el.innerHTML = `
        <p class="body-text" style="font-size:14px;color:var(--text-secondary)">
          Un transistor es solo un interruptor: encendido (1) o apagado (0).
          Un chip moderno tiene más de <strong style="color:var(--text-primary)">10 000 millones</strong>
          de estos, del tamaño de un átomo.
        </p>
        <div class="transistor-section">
          <div class="sw-row">
            <button class="sw-track" id="sw" onclick="toggleSw()">
              <span class="sw-knob"></span>
            </button>
            <span class="sw-value" id="sw-val">0 — apagado</span>
            <span style="color:var(--text-hint)">→</span>
            <span class="bulb off" id="sw-bulb">☀</span>
          </div>
          <div>
            <p style="font-size:12px;color:var(--text-muted);margin-bottom:6px">
              Velocidad real: 3 GHz = 3 000 000 000 ciclos / segundo
            </p>
            <div class="cycles-row">
              <span class="cycles-label">Simulando…</span>
              <div class="cycles-track">
                <div class="cycles-fill" id="cy-fill" style="width:0%"></div>
              </div>
            </div>
          </div>
        </div>
      `;
      let w = 0;
      const iv = setInterval(() => {
        w = w >= 100 ? 0 : w + 3;
        const f = document.getElementById('cy-fill');
        if (f) f.style.width = w + '%'; else clearInterval(iv);
      }, 40);
    }
  },
  {
    num: 'Capa 2',
    title: 'El lenguaje binario',
    sub: '8 interruptores = 1 byte = 1 carácter',
    render(el) {
      const bits = [0, 1, 0, 0, 0, 0, 0, 1];
      el.innerHTML = `
        <p style="font-size:14px;color:var(--text-secondary)">
          Cada 0 y 1 es un "bit". 8 bits forman un byte — suficiente para cualquier letra del alfabeto.
        </p>
        <p style="font-size:12px;color:var(--text-muted)">Haz clic en los bits para cambiarlos:</p>
        <div class="bit-grid" id="bit-grid"></div>
        <div class="bit-info" id="bit-info"></div>
      `;
      function renderBits() {
        const g = document.getElementById('bit-grid');
        const info = document.getElementById('bit-info');
        if (!g) return;
        g.innerHTML = '';
        bits.forEach((b, i) => {
          const d = document.createElement('div');
          d.className = 'bit-cell' + (b ? ' on' : '');
          d.textContent = b;
          d.onclick = () => { bits[i] = bits[i] ? 0 : 1; renderBits(); };
          g.appendChild(d);
        });
        const val = bits.reduce((a, b, i) => a + b * Math.pow(2, 7 - i), 0);
        const ch = val >= 32 && val <= 126 ? String.fromCharCode(val) : '—';
        if (info) info.innerHTML = `Valor decimal: <strong>${val}</strong> &nbsp;→&nbsp; ASCII: <strong style="font-size:18px">${ch}</strong>`;
      }
      renderBits();
    }
  },
  {
    num: 'Capa 3',
    title: 'El sistema operativo',
    sub: 'El árbitro de los recursos',
    render(el) {
      const procs = [
        { name: 'WhatsApp',    pct: 18, color: '#5dcaa5' },
        { name: 'Navegador',   pct: 32, color: '#7ab3f5' },
        { name: 'Música',      pct: 10, color: '#f5c060' },
        { name: 'Sistema',     pct: 22, color: '#f09575' },
        { name: 'Otros',       pct:  8, color: '#afa9ec' },
      ];
      el.innerHTML = `
        <p style="font-size:14px;color:var(--text-secondary)">
          El sistema operativo reparte la CPU entre todos los programas. Haz clic en un proceso para darle más recursos.
        </p>
        <div class="os-list" id="os-list"></div>
        <p style="font-size:12px;color:var(--text-muted);margin-top:4px">
          Clic en un proceso para aumentar su uso de CPU.
        </p>
      `;
      function renderOS() {
        const c = document.getElementById('os-list');
        if (!c) return;
        c.innerHTML = '';
        procs.forEach((p, i) => {
          const row = document.createElement('div');
          row.className = 'os-row';
          row.innerHTML = `
            <span class="os-label">${p.name}</span>
            <div class="os-track">
              <div class="os-fill" style="width:${p.pct}%;background:${p.color}"></div>
            </div>
            <span class="os-pct">${p.pct}%</span>
          `;
          row.onclick = () => {
            procs.forEach((x, j) => {
              x.pct = j === i ? Math.min(x.pct + 12, 75) : Math.max(x.pct - 3, 2);
            });
            renderOS();
          };
          c.appendChild(row);
        });
      }
      renderOS();
    }
  },
  {
    num: 'Capa 4',
    title: 'El lenguaje de programación',
    sub: 'Instrucciones escritas para humanos',
    render(el) {
      const examples = [
        { code: 'print("Hola mundo")',           meaning: 'Muestra "Hola mundo" en pantalla' },
        { code: 'x = 5 + 3',                     meaning: 'Guarda el resultado 8 en la variable x' },
        { code: 'if llueve:\n  abrir_paraguas()', meaning: 'Si llueve, ejecuta abrir_paraguas()' },
      ];
      el.innerHTML = `
        <p style="font-size:14px;color:var(--text-secondary)">
          Los programadores no hablan en 0s y 1s. Usan lenguajes como Python — cercanos al español —
          y un <em>compilador</em> los traduce hacia abajo.
        </p>
        <div class="lang-list">
          ${examples.map(e => `
            <div class="lang-card">
              <code class="lang-code">${e.code}</code>
              <span class="lang-meaning">${e.meaning}</span>
            </div>
          `).join('')}
        </div>
      `;
    }
  },
  {
    num: 'Capa 5',
    title: 'La aplicación',
    sub: 'Lo que el usuario ve y toca',
    render(el) {
      el.innerHTML = `
        <p style="font-size:14px;color:var(--text-secondary)">
          Las apps son la capa más alta. Un solo botón de "Enviar" desencadena miles de
          instrucciones en todas las capas de abajo, en milisegundos.
        </p>
        <p style="font-size:12px;color:var(--text-muted)">Simula enviar un mensaje y observa el viaje:</p>
        <div class="msg-input-row">
          <input id="msg-in" class="input" placeholder="Escribe algo…" type="text"/>
          <button class="btn btn-primary" onclick="sendMsg()">Enviar</button>
        </div>
        <div class="msg-feed" id="msg-feed"></div>
      `;
      const inp = document.getElementById('msg-in');
      if (inp) inp.addEventListener('keydown', e => { if (e.key === 'Enter') sendMsg(); });
    }
  }
];

let current = 0;

// ── Pirámide ─────────────────────────────────────────────────
function clickPill(i) {
  PYRAMID_LAYERS.forEach((_, j) => {
    const p = document.getElementById('pl-' + j);
    if (p) p.classList.toggle('inactive', j !== i);
  });
  const box   = document.getElementById('pill-detail');
  const title = document.getElementById('pd-title');
  const desc  = document.getElementById('pd-desc');
  if (box && title && desc) {
    box.style.display = 'block';
    title.textContent = PYRAMID_LAYERS[i].name;
    desc.textContent  = PILL_DESCS[i];
  }
}

// ── Transistor ───────────────────────────────────────────────
function toggleSw() {
  const sw   = document.getElementById('sw');
  const val  = document.getElementById('sw-val');
  const bulb = document.getElementById('sw-bulb');
  if (!sw) return;
  const isOn = sw.classList.toggle('on');
  if (val)  val.textContent = isOn ? '1 — encendido' : '0 — apagado';
  if (bulb) { bulb.classList.toggle('on', isOn); bulb.classList.toggle('off', !isOn); }
}

// ── Mensaje ──────────────────────────────────────────────────
function sendMsg() {
  const inp  = document.getElementById('msg-in');
  const feed = document.getElementById('msg-feed');
  if (!inp || !feed) return;
  const txt = inp.value.trim();
  if (!txt) return;
  inp.value = '';

  const bub = document.createElement('div');
  bub.className = 'msg-bubble';
  bub.textContent = txt;
  feed.appendChild(bub);
  feed.scrollTop = feed.scrollHeight;

  HINT_MSGS.forEach((h, i) => {
    setTimeout(() => {
      if (!document.getElementById('msg-feed')) return;
      const hint = document.createElement('div');
      hint.className = 'msg-hint' + (h.done ? ' done' : '');
      hint.textContent = h.text;
      feed.appendChild(hint);
      feed.scrollTop = feed.scrollHeight;
    }, (i + 1) * 650);
  });
}

// ── Navegación ───────────────────────────────────────────────
function renderDots() {
  const wrap = document.getElementById('prog-dots');
  if (!wrap) return;
  wrap.innerHTML = '';
  STAGES.forEach((_, i) => {
    const btn = document.createElement('button');
    btn.className = 'prog-dot' + (i === current ? ' active' : '');
    btn.setAttribute('aria-label', `Ir a escena ${i + 1}`);
    btn.onclick = () => capasGo(i);
    wrap.appendChild(btn);
  });
}

function renderStage() {
  const num     = document.getElementById('scene-num');
  const title   = document.getElementById('scene-title');
  const sub     = document.getElementById('scene-sub');
  const body    = document.getElementById('scene-body');
  const counter = document.getElementById('scene-counter');
  const prev    = document.getElementById('btn-prev');
  const next    = document.getElementById('btn-next');
  if (!body) return;

  const s = STAGES[current];
  if (num)   num.textContent   = s.num;
  if (title) title.textContent = s.title;
  if (sub)   sub.textContent   = s.sub;

  body.innerHTML = '';
  body.classList.remove('anim-fade-up');
  void body.offsetWidth; // reflow para reiniciar animación
  body.classList.add('anim-fade-up');
  s.render(body);

  if (counter) counter.textContent = `${current + 1} / ${STAGES.length}`;
  if (prev)    prev.style.visibility = current === 0 ? 'hidden' : 'visible';
  if (next)    next.textContent = current === STAGES.length - 1 ? '↺ Reiniciar' : 'Siguiente →';
}

function capasGo(i) {
  current = i;
  renderDots();
  renderStage();
}

function capasMove(dir) {
  if (dir === 1 && current === STAGES.length - 1) { capasGo(0); return; }
  capasGo(Math.max(0, Math.min(STAGES.length - 1, current + dir)));
}

document.addEventListener('DOMContentLoaded', () => {
  renderDots();
  renderStage();
});
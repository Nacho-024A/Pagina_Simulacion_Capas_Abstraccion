// ============================================================
//  binario.js — Convertidor Binario ↔ Decimal con proceso
// ============================================================

// ── Tabs ─────────────────────────────────────────────────────
function switchTab(tab) {
  const isBin = tab === 'bin';

  document.getElementById('tab-bin').classList.toggle('active',  isBin);
  document.getElementById('tab-dec').classList.toggle('active', !isBin);
  document.getElementById('panel-bin').classList.toggle('active',  isBin);
  document.getElementById('panel-dec').classList.toggle('active', !isBin);
}

// ── Binario → Decimal ─────────────────────────────────────────
function convertBinDec() {
  const input   = document.getElementById('input-bin');
  const resultEl = document.getElementById('result-bin');
  const processEl = document.getElementById('process-bin');
  if (!input) return;

  const raw = input.value.trim();

  // Validar solo 0s y 1s
  if (raw === '') {
    resultEl.innerHTML = '<span class="result-empty">Escribe un número binario arriba para ver el resultado</span>';
    processEl.style.display = 'none';
    input.classList.remove('input-error');
    return;
  }

  if (!/^[01]+$/.test(raw)) {
    input.classList.add('input-error');
    resultEl.innerHTML = '<span style="color:var(--layer-bits);font-size:13px">⚠ Solo se permiten 0s y 1s</span>';
    processEl.style.display = 'none';
    return;
  }

  input.classList.remove('input-error');

  const bits    = raw.split('');
  const decimal = parseInt(raw, 2);

  // Resultado rápido
  resultEl.innerHTML = `
    <span class="result-label">Resultado decimal:</span>
    <span class="result-value">${decimal}</span>
    ${decimal >= 32 && decimal <= 126
      ? `<span style="font-size:13px;color:var(--text-muted)">→ carácter ASCII: <strong style="color:var(--text-primary);font-size:18px">${String.fromCharCode(decimal)}</strong></span>`
      : ''}
  `;

  // Proceso
  processEl.style.display = 'block';
  renderPosGrid(bits);
  renderSumRow(bits, decimal);
}

function renderPosGrid(bits) {
  const grid = document.getElementById('pos-grid');
  if (!grid) return;
  grid.innerHTML = '';

  const len = bits.length;

  bits.forEach((b, i) => {
    const pos     = len - 1 - i;
    const potencia = Math.pow(2, pos);
    const valor   = b === '1' ? potencia : 0;

    const cell = document.createElement('div');
    cell.className = 'pos-cell';
    cell.innerHTML = `
      <div class="pos-exp">2<sup>${pos}</sup><br><span style="color:var(--text-hint)">${potencia}</span></div>
      <div class="pos-bit ${b === '1' ? 'one' : 'zero'}">${b}</div>
      <div class="pos-val ${b === '1' ? 'active' : ''}">${b === '1' ? valor : '—'}</div>
    `;
    grid.appendChild(cell);
  });
}

function renderSumRow(bits, decimal) {
  const el = document.getElementById('sum-row');
  if (!el) return;

  const len    = bits.length;
  const terms  = bits
    .map((b, i) => {
      const pos = len - 1 - i;
      return b === '1' ? `(${b} × 2<sup>${pos}</sup>)` : null;
    })
    .filter(Boolean);

  const values = bits
    .map((b, i) => {
      const pos = len - 1 - i;
      return b === '1' ? Math.pow(2, pos) : null;
    })
    .filter(Boolean);

  el.innerHTML = `
    <div style="margin-bottom:6px;color:var(--text-muted)">Suma de potencias activas (bits = 1):</div>
    <div>${terms.join(' + ') || '0'}</div>
    <div style="margin-top:4px;color:var(--text-secondary)">${values.join(' + ') || '0'} = <span class="sum-result">${decimal}</span></div>
  `;
}

function clearBin() {
  const input = document.getElementById('input-bin');
  const resultEl = document.getElementById('result-bin');
  const processEl = document.getElementById('process-bin');
  if (input) { input.value = ''; input.classList.remove('input-error'); input.focus(); }
  if (resultEl) resultEl.innerHTML = '<span class="result-empty">Escribe un número binario arriba para ver el resultado</span>';
  if (processEl) processEl.style.display = 'none';
}

// ── Decimal → Binario ─────────────────────────────────────────
function convertDecBin() {
  const input     = document.getElementById('input-dec');
  const resultEl  = document.getElementById('result-dec');
  const processEl = document.getElementById('process-dec');
  if (!input) return;

  const raw = input.value.trim();

  if (raw === '') {
    resultEl.innerHTML = '<span class="result-empty">Escribe un número decimal arriba para ver el resultado</span>';
    processEl.style.display = 'none';
    return;
  }

  const num = parseInt(raw, 10);

  if (isNaN(num) || num < 0 || num > 65535) {
    resultEl.innerHTML = '<span style="color:var(--layer-bits);font-size:13px">⚠ Ingresa un número entre 0 y 65 535</span>';
    processEl.style.display = 'none';
    return;
  }

  // Caso especial: 0
  if (num === 0) {
    resultEl.innerHTML = `
      <span class="result-label">Resultado binario:</span>
      <span class="result-value">0</span>
    `;
    processEl.style.display = 'block';
    renderDivTable(0);
    return;
  }

  const binary = num.toString(2);

  resultEl.innerHTML = `
    <span class="result-label">Resultado binario:</span>
    <span class="result-value">${binary}</span>
    <span style="font-size:13px;color:var(--text-muted)">(${binary.length} bits)</span>
  `;

  processEl.style.display = 'block';
  renderDivTable(num);
}

function renderDivTable(num) {
  const tbody   = document.getElementById('div-body');
  const binVal  = document.getElementById('bin-result-value');
  if (!tbody) return;

  tbody.innerHTML = '';

  if (num === 0) {
    tbody.innerHTML = `<tr><td>0 ÷ 2</td><td>0</td><td class="remainder">0</td></tr>`;
    if (binVal) binVal.textContent = '0';
    return;
  }

  const steps    = [];
  let   current  = num;

  while (current > 0) {
    const cociente = Math.floor(current / 2);
    const residuo  = current % 2;
    steps.push({ division: `${current} ÷ 2`, cociente, residuo });
    current = cociente;
  }

  // La última fila es la más significativa, resaltarla
  steps.forEach((s, i) => {
    const tr = document.createElement('tr');
    if (i === steps.length - 1) tr.className = 'highlight-row';
    tr.innerHTML = `
      <td>${s.division}</td>
      <td>${s.cociente}</td>
      <td class="remainder">${s.residuo}</td>
    `;
    tbody.appendChild(tr);
  });

  // Binario = residuos leídos de abajo hacia arriba
  const binary = steps.map(s => s.residuo).reverse().join('');
  if (binVal) binVal.textContent = binary;
}

function clearDec() {
  const input     = document.getElementById('input-dec');
  const resultEl  = document.getElementById('result-dec');
  const processEl = document.getElementById('process-dec');
  if (input) { input.value = ''; input.focus(); }
  if (resultEl) resultEl.innerHTML = '<span class="result-empty">Escribe un número decimal arriba para ver el resultado</span>';
  if (processEl) processEl.style.display = 'none';
}
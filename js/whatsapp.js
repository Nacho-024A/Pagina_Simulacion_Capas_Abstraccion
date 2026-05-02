// ============================================================
//  whatsapp.js — Simulador del flujo de un mensaje WhatsApp
// ============================================================

const TOTAL_STEPS = 10;

// Datos dinámicos que se muestran en cada paso según el mensaje
function getStepData(index, msg) {
  const binary = textToBinary(msg.slice(0, 6));
  const short  = msg.length > 20 ? msg.slice(0, 20) + '…' : msg;

  const data = [
    `Enviar_mensaje("${short}")`,
    `De: +57 300 000 0000\nPara: +57 311 111 1111\nTexto: "${short}"`,
    `Módulo: com.android.network\nPrioridad: ALTA`,
    binary,
    `TX signal → 2.4 GHz WiFi\nPaquetes: ${Math.ceil(msg.length / 4)}`,
    `Servidor: s${Math.floor(Math.random()*9)+1}.whatsapp.net\nLatencia: ${Math.floor(Math.random()*30)+10}ms`,
    `RX signal recibida\nIntensidad: -${Math.floor(Math.random()*30)+50} dBm`,
    `App destino: com.whatsapp\nNotificación encolada`,
    `Recibir_mensaje(datos)\nDesempaquetando…`,
    `✓ "${short}"\n🔔 Notificación enviada`,
  ];
  return data[index] || '';
}

// Convierte texto a binario (primeros caracteres)
function textToBinary(str) {
  return str.split('').map(c =>
    c.charCodeAt(0).toString(2).padStart(8, '0')
  ).join(' ');
}

let waTimer  = null;
let waCurrent = -1;
let waMessage = '';

function waSend() {
  const input = document.getElementById('wa-input');
  if (!input) return;
  const msg = input.value.trim();
  if (!msg) {
    input.focus();
    input.style.borderColor = 'var(--layer-bits)';
    setTimeout(() => input.style.borderColor = '', 1000);
    return;
  }

  waMessage = msg;
  waReset(false);
  input.disabled = true;
  document.getElementById('btn-send').disabled = true;

  waCurrent = 0;
  waAnimate();
}

function waAnimate() {
  if (waCurrent >= TOTAL_STEPS) {
    waFinish();
    return;
  }

  activateStep(waCurrent);

  // Velocidad variable: pasos de red más lentos para dramatismo
  const delay = [600, 700, 650, 750, 800, 1000, 800, 650, 700, 800][waCurrent] || 700;
  waTimer = setTimeout(() => {
    completeStep(waCurrent);
    waCurrent++;
    waAnimate();
  }, delay);
}

function activateStep(i) {
  const step = document.getElementById('step-' + i);
  const data = document.getElementById('data-' + i);
  if (!step) return;

  step.classList.add('active');
  step.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

  if (data) data.textContent = getStepData(i, waMessage);
}

function completeStep(i) {
  const step  = document.getElementById('step-' + i);
  const check = document.getElementById('check-' + i);
  const conn  = document.getElementById('conn-' + i);
  if (!step) return;

  step.classList.remove('active');
  step.classList.add('done');
  if (check) check.textContent = '✓';
  if (conn)  conn.classList.add('done');
}

function waFinish() {
  const panel    = document.getElementById('result-panel');
  const sentEl   = document.getElementById('result-sent');
  const recvEl   = document.getElementById('result-received');
  const resetBtn = document.getElementById('btn-reset');

  if (panel)    panel.classList.add('visible');
  if (sentEl)   sentEl.textContent = waMessage;
  if (recvEl)   recvEl.textContent = waMessage;
  if (resetBtn) resetBtn.style.display = 'inline-flex';

  panel?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function waReset(reenableInput = true) {
  clearTimeout(waTimer);
  waCurrent = -1;

  // Limpiar pasos
  for (let i = 0; i < TOTAL_STEPS; i++) {
    const step  = document.getElementById('step-' + i);
    const check = document.getElementById('check-' + i);
    const conn  = document.getElementById('conn-' + i);
    const data  = document.getElementById('data-' + i);
    if (step)  { step.classList.remove('active', 'done'); }
    if (check) { check.textContent = ''; }
    if (conn)  { conn.classList.remove('done'); }
    if (data)  { data.textContent = ''; }
  }

  // Limpiar resultado
  const panel    = document.getElementById('result-panel');
  const resetBtn = document.getElementById('btn-reset');
  if (panel)    panel.classList.remove('visible');
  if (resetBtn) resetBtn.style.display = 'none';

  if (reenableInput) {
    const input   = document.getElementById('wa-input');
    const sendBtn = document.getElementById('btn-send');
    if (input)   { input.disabled = false; input.value = ''; input.focus(); }
    if (sendBtn) { sendBtn.disabled = false; }
  }
}

// Enter para enviar
document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('wa-input');
  if (input) input.addEventListener('keydown', e => {
    if (e.key === 'Enter') waSend();
  });
});
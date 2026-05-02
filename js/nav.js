// ============================================================
//  nav.js — Navegación compartida
// ============================================================

const NAV_LINKS = [
  { href: 'index.html',     icon: '🏠', label: 'Inicio' },
  { href: 'capas.html',     icon: '🔬', label: 'Simulación Capas' },
  { href: 'whatsapp.html',  icon: '📱', label: 'Simulador App' },
  { href: 'binario.html',   icon: '🔢', label: 'Convertidor Binario' },
];

function buildNavbar() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';

  const navbar = document.createElement('nav');
  navbar.className = 'navbar';
  navbar.innerHTML = `
    <a href="index.html" class="navbar-brand">&lt;<span>Simuladores</span>/&gt;</a>
    <ul class="navbar-links" id="navbar-links">
      ${NAV_LINKS.map(link => `
        <li>
          <a href="${link.href}" class="${currentPage === link.href ? 'active' : ''}">
            <span class="nav-icon">${link.icon}</span>
            ${link.label}
          </a>
        </li>
      `).join('')}
    </ul>
    <button class="navbar-toggle" id="navbar-toggle" aria-label="Abrir menú">
      <span></span><span></span><span></span>
    </button>
  `;

  document.body.prepend(navbar);
  initToggle();
}

function initToggle() {
  const toggle = document.getElementById('navbar-toggle');
  const links  = document.getElementById('navbar-links');
  if (!toggle || !links) return;

  toggle.addEventListener('click', () => {
    const isOpen = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', isOpen);
  });

  // Cierra el menú al hacer clic en un link (móvil)
  links.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => links.classList.remove('open'));
  });

  // Cierra al hacer clic fuera
  document.addEventListener('click', (e) => {
    if (!toggle.contains(e.target) && !links.contains(e.target)) {
      links.classList.remove('open');
    }
  });
}

// Ejecutar al cargar el DOM
document.addEventListener('DOMContentLoaded', buildNavbar);
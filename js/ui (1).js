/* ============================================================
   ui.js
   Funciones que manipulan el DOM. No conoce nada del fetch.
   ============================================================ */

const dom = {
  grid: document.getElementById('characters-grid'),
  statusBar: document.querySelector('.status-bar'),
  statusMessage: document.getElementById('status-message'),
  currentPage: document.getElementById('current-page'),
  totalPages: document.getElementById('total-pages'),
  prevBtn: document.getElementById('prev-btn'),
  nextBtn: document.getElementById('next-btn'),
};

/**
 * Renderiza el grid completo de personajes.
 * Usa innerHTML por simplicidad: la API es confiable pero igual
 * escapamos campos de texto por defensa en profundidad.
 */
function renderCharacters(characters) {
  dom.grid.innerHTML = characters.map(buildCardHTML).join('');
}

/**
 * Construye el markup de una tarjeta individual.
 * Cada tarjeta recibe un --delay distinto para animación escalonada.
 */
function buildCardHTML(character, index) {
  const statusClass = character.status.toLowerCase(); // alive | dead | unknown
  const delay = Math.min(index * 35, 600); // capeo para que no se demore eterno

  return `
    <article class="character-card" style="animation-delay: ${delay}ms">
      <div class="character-image-wrap">
        <img
          src="${character.image}"
          alt="${escapeHTML(character.name)}"
          class="character-image"
          loading="lazy"
        >
        <span class="character-id">#${String(character.id).padStart(3, '0')}</span>
      </div>
      <div class="character-body">
        <h2 class="character-name">${escapeHTML(character.name)}</h2>
        <div class="character-status">
          <span class="status-dot ${statusClass}" aria-hidden="true"></span>
          <span>${escapeHTML(character.status)} · ${escapeHTML(character.species)}</span>
        </div>
        <div class="character-meta">
          <div class="character-meta-row">
            <span class="character-meta-key">origen</span>
            <span class="character-meta-val" title="${escapeHTML(character.origin.name)}">${escapeHTML(character.origin.name)}</span>
          </div>
          <div class="character-meta-row">
            <span class="character-meta-key">género</span>
            <span class="character-meta-val">${escapeHTML(character.gender)}</span>
          </div>
        </div>
      </div>
    </article>
  `;
}

/**
 * Actualiza el indicador de paginación y el estado de los botones.
 */
function renderPagination(currentPage, totalPages) {
  dom.currentPage.textContent = String(currentPage).padStart(3, '0');
  dom.totalPages.textContent = String(totalPages).padStart(3, '0');
  dom.prevBtn.disabled = currentPage <= 1;
  dom.nextBtn.disabled = currentPage >= totalPages;
}

/**
 * Mensaje informativo en la status bar.
 */
function setStatus(message, { isError = false } = {}) {
  dom.statusMessage.textContent = message;
  dom.statusBar.classList.toggle('is-error', isError);
}

/**
 * Renderiza un bloque de error en el grid (ocupa toda la fila).
 */
function showError(message) {
  dom.grid.innerHTML = `<div class="error-message">${escapeHTML(message)}</div>`;
}

/**
 * Escape mínimo para evitar inyectar HTML si algún campo de la API
 * trajera caracteres especiales.
 */
function escapeHTML(str) {
  if (str == null) return '';
  const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
  return String(str).replace(/[&<>"']/g, ch => map[ch]);
}

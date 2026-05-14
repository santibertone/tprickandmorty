/* ============================================================
   main.js
   Orquesta api.js + ui.js. Maneja el estado y los eventos.
   ============================================================ */

const state = {
  currentPage: 1,
  totalPages: 1,
  isLoading: false,
};

/**
 * Carga una página de personajes, actualiza el estado y renderiza.
 * Bloquea concurrencia con isLoading para evitar pisar renders si
 * el usuario clickea rápido.
 */
async function loadPage(page) {
  if (state.isLoading) return;
  state.isLoading = true;

  setStatus(`cargando página ${page}...`);

  try {
    const data = await fetchCharacters(page);

    state.currentPage = page;
    state.totalPages = data.info.pages;

    renderCharacters(data.results);
    renderPagination(state.currentPage, state.totalPages);

    setStatus(
      `mostrando ${data.results.length} personajes · ${data.info.count} totales en la base`
    );

    // Scroll suave al tope al cambiar de página (mejor UX en mobile)
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } catch (err) {
    console.error('[rick-and-morty-explorer]', err);
    showError(err.message);
    setStatus('falló la carga de datos', { isError: true });
  } finally {
    state.isLoading = false;
  }
}

/* ---------- Eventos ---------- */

dom.prevBtn.addEventListener('click', () => {
  if (state.currentPage > 1) loadPage(state.currentPage - 1);
});

dom.nextBtn.addEventListener('click', () => {
  if (state.currentPage < state.totalPages) loadPage(state.currentPage + 1);
});

// Atajos de teclado: flechas izquierda/derecha navegan páginas
document.addEventListener('keydown', (e) => {
  if (e.target.matches('input, textarea')) return; // por si más adelante se agrega filtro
  if (e.key === 'ArrowLeft' && !dom.prevBtn.disabled) dom.prevBtn.click();
  if (e.key === 'ArrowRight' && !dom.nextBtn.disabled) dom.nextBtn.click();
});

/* ---------- Inicio ---------- */
loadPage(1);

/* ============================================================
   api.js
   Capa de acceso a la Rick and Morty API.
   No toca el DOM: solo hace fetch y devuelve datos crudos.
   ============================================================ */

const API_BASE = 'https://rickandmortyapi.com/api';

/**
 * Obtiene una página del listado de personajes.
 * @param {number} page - Número de página (1-indexed).
 * @returns {Promise<{info: object, results: object[]}>}
 * @throws {Error} cuando el response no es 2xx.
 */
async function fetchCharacters(page = 1) {
  const url = `${API_BASE}/character?page=${page}`;
  const response = await fetch(url);

  if (!response.ok) {
    // La API devuelve 404 cuando la página no existe; lo tratamos como error de negocio
    throw new Error(`No se pudieron obtener los personajes (HTTP ${response.status})`);
  }

  return response.json();
}

/**
 * Obtiene un personaje por id. Pensada para una vista de detalle futura.
 * @param {number|string} id
 */
async function fetchCharacterById(id) {
  const response = await fetch(`${API_BASE}/character/${id}`);
  if (!response.ok) {
    throw new Error(`Personaje ${id} no encontrado (HTTP ${response.status})`);
  }
  return response.json();
}

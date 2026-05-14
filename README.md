# rick-and-morty-explorer

SPA simple en HTML, CSS y JavaScript vainilla (sin frameworks) que consume la [Rick and Morty API](https://rickandmortyapi.com) para explorar personajes de la serie con paginación.

## Integrantes

- _[Santino Bertone]_
- _[Federico Villarroel]_

## Stack

- **HTML5** semántico (`header`, `main`, `section`, `article`, `nav`, `footer`).
- **CSS3** moderno: Grid responsive, variables CSS, `clamp()`, `aspect-ratio`, animaciones.
- **JavaScript** ES2020 con `fetch` + `async/await`, sin librerías externas.
- **JetBrains Mono** desde Google Fonts.
- **Git + GitHub** para control de versiones.

## Funcionalidades

- Listado paginado de personajes (20 por página).
- Tarjetas con imagen, nombre, especie, origen, género e ID.
- Indicador de estado por color (verde = alive, rojo = dead, gris = unknown).
- Paginación con botones "anterior" / "siguiente" deshabilitables y contador `[actual / total]`.
- Atajos de teclado: flechas ← / → para navegar entre páginas.
- Animación de entrada escalonada en las tarjetas.
- Manejo de errores con feedback visual.
- Diseño responsive desde 320px hasta desktop.
- Respeta `prefers-reduced-motion`.

## Estructura del proyecto

```
rick-and-morty-explorer/
├── index.html
├── css/
│   └── styles.css
├── js/
│   ├── api.js     # capa de acceso a la API (sin DOM)
│   ├── ui.js      # manipulación del DOM (sin fetch)
│   └── main.js    # orquestador: estado, eventos, init
├── img/           # imágenes propias del proyecto
├── .gitignore
└── README.md
```

La separación `api.js` / `ui.js` / `main.js` aísla responsabilidades: si mañana cambia la API, solo se toca `api.js`; si cambia el diseño, solo `ui.js`.

## Ejecutar localmente

Como es HTML/CSS/JS puro alcanza con abrir `index.html` en el navegador.

## Capturas

[Vista desktop](img/screenshot-desktop.png)
[Vista mobile](img/screenshot-mobile.png)

## API utilizada

[Rick and Morty API](https://rickandmortyapi.com) — pública, gratuita, sin autenticación. Datos provistos bajo MIT License. Créditos a Axel Fuhrmann y la comunidad open source que la mantiene.

Copyright © 2026 Santino Bertone - Federico Villarroel

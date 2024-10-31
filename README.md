# CHALLENGE POKEAPI

## Tabla de Contenidos

- [Características](#características)
- [Deploy](#deploy)
- [Requisitos Previos](#requisitos-previos)
- [Instalación](#instalación)
- [Ejecutar la Aplicación](#ejecutar-la-aplicación)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Decisiones de Diseño](#decisiones-de-diseño)
- [Integración con API](#integración-con-api)
- [Optimizaciones de Rendimiento](#optimizaciones-de-rendimiento)
- [Accesibilidad](#accesibilidad)
- [Mejoras Futuras](#mejoras-futuras)

## Características

- Lista de Pokémon con paginación
- Filtrar Pokémon por tipo
- Buscar Pokémon por nombre
- Ver información detallada de cada Pokémon
- Diseño responsivo para varios tamaños de pantalla
- Utilizacion de cache
- Uso del Partial-Pre-Rendering (PPR) esta feature hace alusión a si en un futuro necesito datos frescos, se utilizaria PPR, por
  como esta modelado el sistema, no tiene de mucha utilidad.

## Requisitos Previos

Antes de comenzar, asegúrate de tener instalado lo siguiente en tu máquina local:

- Node.js (v14.0.0 o superior)
- npm (v6.0.0 o superior)

## Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/tobiasgatti02/Firmaway-Challenge.git
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

## Ejecutar la Aplicación

1. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```

2. Abre tu navegador y navega a `http://localhost:3000`

Para construir la aplicación para producción:

```bash
npm run build
npm start
```

## Estructura del Proyecto

```
firmaway-challenge/
├── app/
│   ├── api/
│   │   └── pokemon/
│   │       └── route.ts
│   ├── pokemon/
│   │   └── [id]/
│   │       └── page.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── PokemonCard.tsx
│   ├── PokemonCardSkeleton.tsx
│   ├── PokemonList.tsx
│   └── SWRProvider.tsx
├── lib/
│   ├── api.ts
│   └── useSWRConfig.ts
├── types/
│   └── pokemon.ts
├── public/
│   └── fonts/
├── .gitignore
├── next.config.js
├── package.json
├── README.md
├── tailwind.config.js
└── tsconfig.json
```

## Decisiones de Diseño


1. **SWR (Stale-While-Revalidate)**: SWR se utiliza para la obtención y caché de datos, proporcionando una experiencia de usuario fluida con actualizaciones en tiempo real y soporte sin conexión.

2. **Arquitectura Basada en Componentes**: La aplicación está construida usando componentes React reutilizables, promoviendo la reusabilidad y mantenibilidad del código.

3. **Diseño Responsivo**: La UI está diseñada para ser responsiva y funcionar bien en varios tamaños de pantalla, desde dispositivos móviles hasta computadoras de escritorio.

4. **Datos**: Los datos se obtienen de la API, y el usuario lo que ve, son datos dinámicos, es decir, no están guardados en una base de datos, si estuviesen en una base de datos, éstos datos se mostrarían al cliente "más rápido".

## Integración con API

La aplicación se integra con la PokéAPI (https://pokeapi.co/) para obtener datos de Pokémon. Implemente las siguientes llamadas a la API:

- Obtener una lista de Pokémon con paginación
- Obtener detalles de Pokémon por ID
- Obtener tipos de Pokémon

Las llamadas a la API están centralizadas en el archivo `lib/api.ts` para facilitar el mantenimiento y la reutilización.

## Optimizaciones de Rendimiento

1. **Optimización de Imágenes**: Usamos el componente Image de Next.js para la optimización automática de imágenes y carga diferida.

2. **Paginación**: La lista de Pokémon está paginada para reducir el tiempo de carga inicial y mejorar el rendimiento al navegar por grandes conjuntos de datos.

3. **Caché**: Se utiliza SWR para almacenar en caché las respuestas de la API, reduciendo las solicitudes de red innecesarias y mejorando los tiempos de carga para visitas repetidas.

4. **División de Código**: Next.js divide automáticamente el código de la aplicación, asegurando que solo se cargue el JavaScript necesario para cada página.

## Accesibilidad

Hemos implementado varias características de accesibilidad:

1. Estructura HTML semántica
2. Uso apropiado de atributos ARIA donde sea necesario
3. Soporte para navegación por teclado
4. Ratios de contraste de color que cumplen con los estándares WCAG 2.1 AA

## Deploy

La aplicación web fue desplegada utilizando Vercel.

Link para el deploy: [Firmaway-Challenge][1]

[1]:https://firmaway-challenge.vercel.app/          "Firmaway-Challenge"

## Mejoras Futuras

1. Implementar paginación del lado del servidor para mejor rendimiento con grandes conjuntos de datos
2. Agregar pruebas unitarias y de integración para mejorar la fiabilidad, podriamos usar Playwright con Cucumber, Cypress, o Selenium WebDriver
3. Implementar una funcionalidad de búsqueda más avanzada (por ejemplo, búsqueda difusa, búsqueda por múltiples criterios)
4. Agregar una función de comparación para permitir a los usuarios comparar estadísticas entre diferentes Pokémon
5. Implementar características PWA para soporte sin conexión y mejor experiencia móvil


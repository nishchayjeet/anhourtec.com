# AnHourTec

Website for AnHourTec - Custom software development, IT infrastructure, networking solutions, and managed services in Victoria, BC.

## Tech Stack

- [Nuxt 4](https://nuxt.com/) - Vue.js framework
- [TailwindCSS](https://tailwindcss.com/) - Utility-first CSS
- [VueUse](https://vueuse.org/) - Vue composition utilities
- [Nuxt Image](https://image.nuxt.com/) - Image optimization
- [Nuxt Fonts](https://fonts.nuxt.com/) - Font management (Geist)
- [Nuxt SEO](https://nuxtseo.com/) - SEO toolkit

## Setup

Install dependencies:

```bash
npm install
```

## Development

Start the development server on `http://localhost:3000`:

```bash
npm run dev
```

## Production

Build for production:

```bash
npm run build
```

Preview production build locally:

```bash
npm run preview
```

Generate static site:

```bash
npm run generate
```

## Project Structure

```
app/
├── assets/css/       # Global styles
├── components/       # Vue components
│   ├── common/       # Reusable components
│   └── home/         # Homepage sections
├── composables/      # Vue composables
├── layouts/          # Page layouts
├── pages/            # Route pages
└── plugins/          # Nuxt plugins
public/               # Static assets
```

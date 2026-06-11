# Changelog

All notable changes to Cartlify are documented here.

---

## [0.1.4] — 2026-06-11

### Added
- GitHub Sponsors badge in README
- Gumroad purchase link below npm install command in README
- Sponsorship and Consulting sections in README
- npm keywords for better discoverability (`ecommerce`, `shopping-cart`, `ui-kit`, `design-system`, and more)

---

## [0.1.2] — 2026-06-09

### Added
- Exported full icon library (11 SVG icons) from the public package entry point — `HeartIcon`, `ShoppingCartIcon`, `StarIcon`, `TrashIcon`, `CheckIcon`, `CloseIcon`, `PlusIcon`, `MinusIcon`, `ChevronLeftIcon`, `ChevronRightIcon`, `SpinnerIcon`
- Exported `IconProps` type

### Fixed
- Icons were built into the bundle but not accessible to consumers

---

## [0.1.1] — 2026-06-09

### Added
- `homepage`, `repository`, and `bugs` fields in `package.json` — npm package page now links to the public GitHub repo

### Changed
- Widened TypeScript peer dependency from `>=4.7.4 <5.6.0` to `>=4.7.4` — supports TypeScript 6.x used by Vite's latest project templates

### Fixed
- `npm install cartlify` failed in projects using TypeScript 6.x due to overly strict peer dep range

### Internal
- Excluded `dist/**/*.map` source map files from the published bundle — reduces unpacked size from ~440 kB to ~200 kB and prevents source code exposure

---

## [0.1.0] — 2026-06-03

### Added
- `ProductCard` component — default, horizontal, and compact variants; image gallery with thumbnail strip; wishlist toggle; star rating; skeleton loader; discount badge
- `CartDrawer` component — slide-in panel, quantity controls, empty state, focus trap, Escape key + backdrop close
- `PageLoader` component — spinner, dots, bars, pulse variants; sm/md/lg/xl sizes; inline, overlay, fullscreen positions
- `CheckoutStepper` component — horizontal and vertical orientations; animated connector fill; click-to-go-back; keyboard navigation
- `Button` primitive — 4 variants, 3 sizes, loading state, polymorphic `as` prop
- `Badge` primitive — sale, new, out-of-stock, custom variants
- `IconButton` primitive — accessible square button with active/toggle state
- `useCart` hook — add, remove, update quantity, clear, computed totals
- `useDisclosure` hook — open/close/toggle state manager
- `useMediaQuery` hook — SSR-safe reactive CSS media query subscription
- `cn`, `formatPrice`, `calculateDiscount` utilities
- 40+ CSS design tokens with full dark mode via `data-theme="dark"`
- 11 SVG icon components
- 141 Jest + React Testing Library tests
- Storybook 8 interactive documentation

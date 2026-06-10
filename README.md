# Cartlify [![npm version](https://badge.fury.io/js/cartlify.svg)](https://npmjs.com/package/cartlify)[![npm downloads](https://img.shields.io/npm/dm/cartlify.svg)](https://npmjs.com/package/cartlify)
**Production-ready React + TypeScript component library for building e-commerce storefronts.**  
Zero runtime CSS-in-JS · Token-driven theming · Full dark mode · WCAG 2.1 accessible · Tree-shakeable

---

## Table of Contents

- [What's Included](#whats-included)
- [Live Preview](#live-preview)
- [Requirements](#requirements)
- [Quick Start](#quick-start)
- [Components](#components)
  - [ProductCard](#productcard)
  - [CartDrawer](#cartdrawer)
  - [PageLoader](#pageloader)
  - [CheckoutStepper](#checkoutstepper)
- [Primitives](#primitives)
  - [Button](#button)
  - [Badge](#badge)
  - [IconButton](#iconbutton)
- [Hooks](#hooks)
  - [useCart](#usecart)
  - [useDisclosure](#usedisclosure)
  - [useMediaQuery](#usemediaquery)
- [Utilities](#utilities)
- [Icon Library](#icon-library)
- [Design Tokens](#design-tokens)
- [Dark Mode](#dark-mode)
- [Theming & Customization](#theming--customization)
- [TypeScript Reference](#typescript-reference)
- [Browser Support](#browser-support)
- [Purchase](#purchase)
- [Support](#support)
- [License](#license)

---

## What's Included

| Category | Item | Description |
|---|---|---|
| **Components** | `ProductCard` | Product display with 3 layout variants, image gallery, wishlist, ratings |
| | `CartDrawer` | Slide-in cart panel with quantity controls, subtotal, empty state |
| | `PageLoader` | Animated page loader — 4 variants, 4 sizes, 3 positions |
| | `CheckoutStepper` | Multi-step progress indicator, horizontal & vertical, keyboard navigable |
| **Primitives** | `Button` | Polymorphic button with 4 variants, 3 sizes, loading state |
| | `Badge` | Status badge — Sale, New, Out of Stock, Custom |
| | `IconButton` | Accessible square icon button with active/toggle state |
| **Hooks** | `useCart` | Full cart state — add, remove, update quantity, clear, totals |
| | `useDisclosure` | Open/close state manager for drawers, modals, menus |
| | `useMediaQuery` | Reactive CSS media query subscription (SSR-safe) |
| **Utilities** | `cn` | Tailwind-aware class merger (clsx + tailwind-merge) |
| | `formatPrice` | Currency-prefixed price formatting |
| | `calculateDiscount` | Discount percentage calculator |
| **Icons** | 11 SVG icons | Centralised, reusable, color-overridable icon components |
| **Theming** | CSS tokens | 40+ design tokens, light + dark mode out of the box |

---

## Live Preview

> **Storybook:** [https://cartlify.vercel.app](https://cartlify.vercel.app)
> **Demo App:** [https://cartlify-demo.vercel.app](https://cartlify-demo.vercel.app)

---

## Requirements

| Dependency | Version |
|---|---|
| Node.js | >= 18.0.0 |
| React | >= 18.0.0 |
| React DOM | >= 18.0.0 |
| TypeScript | >= 4.7.4 |
| Tailwind CSS | >= 3.0 *(optional)* |

---

## Quick Start

### Via npm *(recommended)*

```bash
npm install cartlify
```

Then skip to [Step 3](#3-install-peer-dependencies-if-not-already-present).

---

### Via ZIP *(Gumroad / ThemeForest purchase)*

> **Purchased from Gumroad or ThemeForest?** The ZIP already contains a pre-built `cartlify-0.1.0.tgz` — no build step required.

### 1. Extract the ZIP

Unzip `cartlify-v0.1.0.zip` anywhere on your machine. You will see `cartlify-0.1.0.tgz` inside.

### 2. Install into your project

Run one command from inside your app, pointing to the `.tgz` file:

```bash
# Windows PowerShell
npm install "C:\Users\you\Downloads\cartlify-v0.1.0\cartlify-0.1.0.tgz"

# macOS / Linux
npm install ~/Downloads/cartlify-v0.1.0/cartlify-0.1.0.tgz
```

That's it. Cartlify is now in your `node_modules` and listed in `package.json`. Works with webpack, Turbopack, and Vite.

Imports work like any published package:

```ts
import { ProductCard } from 'cartlify';
import 'cartlify/styles';
```

### 3. Install peer dependencies (if not already present)

```bash
npm install react react-dom
```

### 4. Import the stylesheet

In your app entry point (`main.tsx`, `_app.tsx`, `layout.tsx`):

```ts
import 'cartlify/styles';
```

This imports all design tokens, base resets, and dark-mode variables. Without this step, components render without styling.

### 5. Use a component

```tsx
import { ProductCard, useCart } from 'cartlify';

export default function ShopPage() {
  const { addItem } = useCart();

  return (
    <ProductCard
      product={{
        id: '1',
        name: 'Premium Sneakers',
        price: 79.99,
        originalPrice: 99.99,
        image: '/sneakers.jpg',
        rating: 4.3,
        reviewCount: 128,
        inStock: true,
      }}
      onAddToCart={(product) => addItem(product)}
    />
  );
}
```

### 5. Tailwind integration (optional)

```js
// tailwind.config.js
module.exports = {
  content: [
    './src/**/*.{ts,tsx}',
    './node_modules/cartlify/dist/**/*.js',
  ],
};
```

---

## Components

---

### ProductCard

A versatile product display card with three layout variants, image gallery, wishlist toggle, star rating, discount badge, and an accessible add-to-cart button.

#### Usage

```tsx
import { ProductCard } from 'cartlify';

<ProductCard
  product={{
    id: 'p1',
    name: 'Classic White Tee',
    price: 29.99,
    originalPrice: 44.99,
    image: '/tee-front.jpg',
    images: ['/tee-front.jpg', '/tee-back.jpg', '/tee-detail.jpg'],
    rating: 4.5,
    reviewCount: 312,
    inStock: true,
  }}
  variant="default"
  onAddToCart={(product) => console.log('Added:', product)}
  onWishlistToggle={(product) => console.log('Wishlisted:', product)}
  onCardClick={(product) => router.push(`/product/${product.id}`)}
/>
```

#### Variants

| Variant | Description |
|---|---|
| `default` | Vertical card — image on top, details below. Best for grid layouts. |
| `horizontal` | Image on the left, details on the right. Best for list views. |
| `compact` | Minimal card with no rating. Best for sidebars. |

#### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `product` | `Product` | **Required** | Product data |
| `variant` | `'default' \| 'horizontal' \| 'compact'` | `'default'` | Layout variant |
| `isLoading` | `boolean` | `false` | Show skeleton loading state |
| `isWishlisted` | `boolean` | `false` | Filled heart when `true` |
| `showRating` | `boolean` | `true` | Show the star rating row |
| `currency` | `string` | `'$'` | Currency symbol prefix |
| `addToCartLabel` | `string` | `'Add to Cart'` | CTA button text |
| `onAddToCart` | `(product: Product) => void` | — | Fired on add-to-cart click |
| `onWishlistToggle` | `(product: Product) => void` | — | Fired on wishlist click |
| `onCardClick` | `(product: Product) => void` | — | Fired on card click / Enter / Space |
| `renderBadge` | `(product: Product) => ReactNode` | — | Custom badge renderer |
| `classNames` | `ProductCardClassNames` | — | Per-slot className overrides |
| `className` | `string` | — | Root className |
| `style` | `CSSProperties` | — | Inline styles / token overrides |

#### `ProductCardClassNames` slots

| Slot | Targets |
|---|---|
| `root` | Outer card wrapper |
| `image` | Image container |
| `body` | Content area |
| `title` | Product name |
| `price` | Price row |
| `badge` | Badge element |
| `actions` | Button row |

#### `Product` type

```ts
interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;   // enables discount badge + strikethrough
  image: string;
  imageAlt?: string;
  images?: string[];        // enables gallery thumbnail strip
  imageAlts?: string[];
  rating?: number;          // 0–5
  reviewCount?: number;
  inStock?: boolean;
}
```

#### Example — Custom badge renderer

```tsx
import { ProductCard, Badge, calculateDiscount } from 'cartlify';

<ProductCard
  product={product}
  renderBadge={(p) =>
    p.inStock === false ? (
      <Badge variant="out-of-stock" label="Sold Out" />
    ) : p.originalPrice ? (
      <Badge variant="sale" label={`${calculateDiscount(p.originalPrice, p.price)}% OFF`} />
    ) : null
  }
/>
```

---

### CartDrawer

A slide-in cart panel with item list, quantity controls, subtotal, empty state, and a checkout CTA. Focus-trapped when open, closes on Escape and backdrop click.

#### Usage

```tsx
import { CartDrawer, useCart, useDisclosure } from 'cartlify';

export default function App() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { items, removeItem, updateQuantity } = useCart();

  return (
    <>
      <button onClick={onOpen}>Cart ({items.length})</button>

      <CartDrawer
        isOpen={isOpen}
        onClose={onClose}
        items={items}
        onQuantityChange={updateQuantity}
        onRemoveItem={removeItem}
        onCheckout={() => router.push('/checkout')}
      />
    </>
  );
}
```

#### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `isOpen` | `boolean` | **Required** | Controls visibility |
| `onClose` | `() => void` | **Required** | Called on Escape, backdrop click, close button |
| `items` | `CartItem[]` | **Required** | Cart items |
| `onQuantityChange` | `(id, qty) => void` | **Required** | Called when quantity changes |
| `onRemoveItem` | `(id) => void` | **Required** | Called when item is removed |
| `onCheckout` | `() => void` | **Required** | Called when checkout button is clicked |
| `title` | `string` | `'Your Cart'` | Drawer heading |
| `position` | `'left' \| 'right'` | `'right'` | Slide-in direction |
| `currency` | `string` | `'$'` | Currency symbol |
| `showSubtotal` | `boolean` | `true` | Show subtotal in footer |
| `showItemCount` | `boolean` | `true` | Show item count below title |
| `emptyStateMessage` | `string` | `'Your cart is empty'` | Empty state text |
| `emptyStateIcon` | `ReactNode` | Cart icon | Custom empty state illustration |
| `onContinueShopping` | `() => void` | Falls back to `onClose` | "Continue Shopping" action |
| `classNames` | `CartDrawerClassNames` | — | Per-slot className overrides |
| `className` | `string` | — | Root className |
| `style` | `CSSProperties` | — | Inline styles |

#### `CartDrawerClassNames` slots

| Slot | Targets |
|---|---|
| `overlay` | Backdrop |
| `panel` | Sliding panel |
| `header` | Title + close button row |
| `list` | Scrollable item list |
| `footer` | Subtotal + checkout area |

#### `CartItemComponent` — standalone row

```tsx
import { CartItemComponent } from 'cartlify';

<CartItemComponent
  item={cartItem}
  onQuantityChange={(id, qty) => updateQuantity(id, qty)}
  onRemove={(id) => removeItem(id)}
/>
```

---

### PageLoader

An animated loading indicator for initial page loads and route transitions. Four animation variants, four preset sizes, three positioning modes.

#### Usage

```tsx
import { PageLoader } from 'cartlify';

// Full-screen overlay
<PageLoader isVisible={isLoading} variant="spinner" position="fullscreen" backdrop />

// Inline
<PageLoader isVisible={isFetching} variant="dots" position="inline" size="sm" />

// Section overlay
<div style={{ position: 'relative' }}>
  <PageLoader isVisible={isRefreshing} variant="pulse" position="overlay" />
  <YourContent />
</div>
```

#### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `isVisible` | `boolean` | `true` | Fade in/out |
| `variant` | `'spinner' \| 'dots' \| 'bars' \| 'pulse'` | `'spinner'` | Animation style |
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl' \| number` | `'md'` | Preset or explicit pixel value |
| `color` | `string` | `var(--clf-color-primary)` | Any CSS color or `var()` |
| `position` | `'fullscreen' \| 'overlay' \| 'inline'` | `'inline'` | Layout mode |
| `backdrop` | `boolean` | `false` | Semi-transparent backdrop |
| `text` | `string` | — | Message below animation; doubles as `aria-label` |
| `className` | `string` | — | Root className |
| `style` | `CSSProperties` | — | Inline styles |

#### Variant reference

| Variant | Description |
|---|---|
| `spinner` | Rotating arc with glow |
| `dots` | Three bouncing dots with staggered delay |
| `bars` | Five bars with wave animation |
| `pulse` | Radiating rings with glowing core |

#### Size reference

| Preset | Pixels |
|---|---|
| `sm` | 24 px |
| `md` | 40 px |
| `lg` | 56 px |
| `xl` | 80 px |

#### Position reference

| Value | Behaviour |
|---|---|
| `fullscreen` | `position: fixed; inset: 0; z-index: 9999` |
| `overlay` | `position: absolute; inset: 0; z-index: 10` — covers nearest `position: relative` ancestor |
| `inline` | Flows with the document |

---

### CheckoutStepper

A progress indicator for multi-step checkout flows. Horizontal and vertical orientations, animated connector fill, click-to-go-back, custom icons, and arrow-key keyboard navigation.

#### Usage

```tsx
import { CheckoutStepper } from 'cartlify';
import type { Step } from 'cartlify';
import { useState } from 'react';

const steps: Step[] = [
  { id: 'cart',     label: 'Cart',     description: 'Review your items' },
  { id: 'shipping', label: 'Shipping', description: 'Enter delivery address' },
  { id: 'payment',  label: 'Payment',  description: 'Add payment method' },
  { id: 'review',   label: 'Review',   description: 'Confirm your order' },
];

export default function CheckoutPage() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <CheckoutStepper
      steps={steps}
      activeStep={activeStep}
      showLabels
      showDescriptions
      connectorAnimation
      onStepClick={setActiveStep}
    />
  );
}
```

#### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `steps` | `Step[]` | **Required** | Ordered step definitions |
| `activeStep` | `number` | **Required** | 0-based index of current step |
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Layout direction |
| `onStepClick` | `(index: number) => void` | — | Enables click-to-go-back on completed steps |
| `showLabels` | `boolean` | `true` | Show step labels |
| `showDescriptions` | `boolean` | `false` | Show step descriptions |
| `connectorAnimation` | `boolean` | `true` | Animate connector fill |
| `classNames` | `CheckoutStepperClassNames` | — | Per-slot className overrides |
| `className` | `string` | — | Root className |
| `style` | `CSSProperties` | — | Inline styles / token overrides |

#### `Step` type

```ts
interface Step {
  id: string;
  label: string;
  description?: string;
  icon?: React.ReactNode;
}
```

#### `CheckoutStepperClassNames` slots

| Slot | Targets |
|---|---|
| `root` | Outer `<ol>` |
| `step` | Each `<li>` |
| `connector` | Connector line |
| `circle` | Step circle |
| `label` | Label text |
| `description` | Description text |

#### Step states

| State | Visual |
|---|---|
| `completed` | Filled primary circle with checkmark (or custom icon) |
| `active` | Filled primary circle with outer glow ring (`aria-current="step"`) |
| `pending` | Bordered circle with muted step number |

#### Keyboard navigation

Enabled automatically when `onStepClick` is provided.

| Key | Action |
|---|---|
| `ArrowRight` / `ArrowDown` | Focus next step button |
| `ArrowLeft` / `ArrowUp` | Focus previous step button |
| `Enter` / `Space` | Activate focused step |

#### Example — Custom icons

```tsx
const steps: Step[] = [
  { id: 'cart',    label: 'Cart',    icon: <ShoppingCartIcon className="h-4 w-4" /> },
  { id: 'payment', label: 'Payment', icon: <CreditCardIcon   className="h-4 w-4" /> },
];
```

---

## Primitives

---

### Button

Polymorphic button — renders as `<button>` by default, or any element via the `as` prop.

```tsx
import { Button } from 'cartlify';

<Button variant="primary" onClick={handleClick}>Add to Cart</Button>
<Button variant="secondary" leftIcon={<HeartIcon />}>Wishlist</Button>
<Button as="a" href="/checkout" fullWidth>Checkout</Button>
<Button isLoading>Processing...</Button>
```

| Prop | Type | Default | Description |
|---|---|---|---|
| `variant` | `'primary' \| 'secondary' \| 'ghost' \| 'danger'` | `'primary'` | Visual style |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size |
| `isLoading` | `boolean` | `false` | Shows spinner, disables interaction |
| `isDisabled` | `boolean` | `false` | Disables the button |
| `leftIcon` | `ReactNode` | — | Icon before label |
| `rightIcon` | `ReactNode` | — | Icon after label |
| `fullWidth` | `boolean` | `false` | 100% width |
| `as` | `React.ElementType` | `'button'` | Polymorphic element |

---

### Badge

Compact status label for product states.

```tsx
import { Badge } from 'cartlify';

<Badge variant="sale"         label="20% OFF" />
<Badge variant="new"          label="New Arrival" />
<Badge variant="out-of-stock" label="Sold Out" />
<Badge variant="custom" label="Limited" className="bg-purple-100 text-purple-800" />
```

| Prop | Type | Default | Description |
|---|---|---|---|
| `variant` | `'sale' \| 'new' \| 'out-of-stock' \| 'custom'` | `'custom'` | Color scheme |
| `label` | `string` | **Required** | Badge text |
| `className` | `string` | — | Override styles |

---

### IconButton

Accessible square icon-only button. `aria-label` is always required.

```tsx
import { IconButton } from 'cartlify';

<IconButton icon={<HeartIcon />} aria-label="Add to wishlist" isActive={isWishlisted} />
<IconButton icon={<CloseIcon />} aria-label="Close" size="sm" />
```

| Prop | Type | Default | Description |
|---|---|---|---|
| `icon` | `ReactNode` | **Required** | Icon element |
| `aria-label` | `string` | **Required** | Screen reader label |
| `variant` | `'primary' \| 'secondary' \| 'ghost' \| 'danger'` | `'ghost'` | Visual style |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size |
| `isActive` | `boolean` | `false` | Toggled state; sets `aria-pressed` |

---

## Hooks

---

### useCart

```tsx
import { useCart } from 'cartlify';

const {
  items,           // CartItem[]
  addItem,         // (product: Product, quantity?: number) => void
  removeItem,      // (id: string) => void
  updateQuantity,  // (id: string, quantity: number) => void
  clearCart,       // () => void
  totalItems,      // number
  totalPrice,      // number
} = useCart();

addItem(product);       // merges quantity if already in cart
addItem(product, 3);
updateQuantity('id', 5); // clamped to minimum 1
```

State is local to the component tree. Wrap in a React Context to share cart state across the app.

---

### useDisclosure

```tsx
import { useDisclosure } from 'cartlify';

const { isOpen, onOpen, onClose, onToggle } = useDisclosure();
const { isOpen } = useDisclosure(true); // initially open
```

| Return | Type | Description |
|---|---|---|
| `isOpen` | `boolean` | Current state |
| `onOpen` | `() => void` | Set to `true` |
| `onClose` | `() => void` | Set to `false` |
| `onToggle` | `() => void` | Toggle |

---

### useMediaQuery

SSR-safe. Returns `false` on the server, reacts to viewport changes.

```tsx
import { useMediaQuery } from 'cartlify';

const isMobile = useMediaQuery('(max-width: 767px)');
const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
```

---

## Utilities

### `cn(...classNames)`

Merges class names with Tailwind conflict resolution. Consumer classes always win.

```ts
import { cn } from 'cartlify';
cn('px-4 py-2', isActive && 'bg-blue-600', className);
```

### `formatPrice(price, currency?)`

```ts
import { formatPrice } from 'cartlify';
formatPrice(29.99);       // "$29.99"
formatPrice(29.99, '€');  // "€29.99"
```

### `calculateDiscount(originalPrice, currentPrice)`

```ts
import { calculateDiscount } from 'cartlify';
calculateDiscount(99.99, 79.99); // 20
```

---

## Icon Library

All icons are tree-shakeable and accept `className` and `color` props.

```tsx
import {
  CheckIcon, ChevronLeftIcon, ChevronRightIcon, CloseIcon,
  HeartIcon, MinusIcon, PlusIcon, ShoppingCartIcon,
  SpinnerIcon, StarIcon, TrashIcon,
} from 'cartlify';

<StarIcon className="h-6 w-6 text-yellow-400" />
<HeartIcon color="#ef4444" />
<HeartIcon color="var(--clf-color-danger)" />
<HeartIcon filled />
```

| Prop | Type | Default | Applies to |
|---|---|---|---|
| `className` | `string` | — | All icons |
| `color` | `string` | `currentColor` | All icons |
| `filled` | `boolean` | `false` | `HeartIcon` only |

---

## Design Tokens

All visual properties are CSS custom properties prefixed `--clf-`. Override any token at `:root` or scoped to any element.

### Color tokens

```css
:root {
  --clf-color-primary:            #2563eb;
  --clf-color-primary-hover:      #1d4ed8;
  --clf-color-primary-foreground: #ffffff;

  --clf-color-secondary:            #6b7280;
  --clf-color-secondary-hover:      #4b5563;
  --clf-color-secondary-foreground: #ffffff;

  --clf-color-danger:            #dc2626;
  --clf-color-danger-hover:      #b91c1c;
  --clf-color-danger-foreground: #ffffff;

  --clf-color-surface:        #ffffff;
  --clf-color-surface-raised: #f9fafb;
  --clf-color-border:         #e5e7eb;
  --clf-color-overlay:        rgba(0, 0, 0, 0.5);

  --clf-color-muted:            #9ca3af;
  --clf-color-muted-foreground: #6b7280;

  --clf-color-success: #16a34a;
  --clf-color-warning: #d97706;

  --clf-color-badge-sale-bg:   #fee2e2;
  --clf-color-badge-sale-text: #991b1b;
  --clf-color-badge-new-bg:    #dcfce7;
  --clf-color-badge-new-text:  #166534;
  --clf-color-badge-oos-bg:    #f3f4f6;
  --clf-color-badge-oos-text:  #374151;
}
```

### Shape, motion & touch tokens

```css
:root {
  --clf-radius-sm:   0.25rem;
  --clf-radius-md:   0.375rem;
  --clf-radius-lg:   0.5rem;
  --clf-radius-xl:   0.75rem;
  --clf-radius-full: 9999px;

  --clf-shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --clf-shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  --clf-shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);

  --clf-duration-fast: 100ms;
  --clf-duration-base: 200ms;
  --clf-duration-slow: 300ms;

  --clf-touch-target: 2.75rem;
}
```

---

## Dark Mode

Add `data-theme="dark"` to any ancestor element — typically `<html>`. All tokens switch automatically.

```tsx
// Imperatively
document.documentElement.setAttribute('data-theme', 'dark');
document.documentElement.removeAttribute('data-theme');

// Declaratively
<html data-theme={isDark ? 'dark' : undefined}>
```

### Dark token values

```css
[data-theme="dark"] {
  --clf-color-primary:            #3b82f6;
  --clf-color-primary-hover:      #2563eb;
  --clf-color-surface:            #111827;
  --clf-color-surface-raised:     #1f2937;
  --clf-color-border:             #374151;
  --clf-color-overlay:            rgba(0, 0, 0, 0.7);
  --clf-color-muted-foreground:   #9ca3af;
  --clf-color-success:            #4ade80;
  --clf-color-warning:            #fbbf24;
  --clf-color-badge-sale-bg:      #450a0a;
  --clf-color-badge-sale-text:    #fca5a5;
  --clf-color-badge-new-bg:       #052e16;
  --clf-color-badge-new-text:     #86efac;
  --clf-color-badge-oos-bg:       #1f2937;
  --clf-color-badge-oos-text:     #d1d5db;
}
```

---

## Theming & Customization

### Global rebrand via `:root`

```css
:root {
  --clf-color-primary:       #7c3aed;
  --clf-color-primary-hover: #6d28d9;
  --clf-radius-md:           0.75rem;
  --clf-duration-base:       150ms;
}
```

### Per-instance override via `style`

```tsx
<CheckoutStepper
  steps={steps}
  activeStep={2}
  style={{ '--clf-color-primary': '#10b981' } as React.CSSProperties}
/>
```

### Slot-level override via `classNames`

```tsx
<ProductCard
  product={product}
  classNames={{
    root:  'border-2 border-purple-200',
    title: 'font-bold text-purple-900',
  }}
/>

<CheckoutStepper
  steps={steps}
  activeStep={1}
  classNames={{
    circle:    'ring-2 ring-offset-2 ring-purple-500',
    connector: 'h-1',
  }}
/>
```

### Consumer `className` always wins

```tsx
<Button className="rounded-full px-8">Pill Button</Button>
```

---

## TypeScript Reference

```ts
import type {
  Product,
  CartItem,
  Step,

  ProductCardProps,
  ProductCardClassNames,
  ProductCardVariant,

  CartDrawerProps,
  CartDrawerClassNames,
  CartItemProps,

  PageLoaderProps,
  LoaderVariant,
  LoaderSize,
  LoaderPosition,

  CheckoutStepperProps,
  CheckoutStepperClassNames,
  StepperOrientation,
  StepStatus,

  BadgeProps,
  BadgeVariant,
  IconButtonProps,
  ButtonVariant,
  ButtonSize,

  UseCartReturn,
  UseDisclosureReturn,
} from 'cartlify';
```

---

## Browser Support

| Browser | Minimum |
|---|---|
| Chrome | 90+ |
| Firefox | 90+ |
| Safari | 14+ |
| Edge | 90+ |
| iOS Safari | 14+ |
| Samsung Internet | 14+ |

> Internet Explorer is not supported.

---

## Purchase

- **Gumroad:** [Buy Cartlify on Gumroad](https://karthiksoftengg.gumroad.com/l/cartlify-react-ui-kit)

Includes pre-built `.tgz`, full changelog, and future updates.

---

## Support

- **Email:** karthikgs.softengg@gmail.com
- **GitHub Issues:** [github.com/thirumalai77/cartlify/issues](https://github.com/thirumalai77/cartlify/issues)
- **Gumroad:** Leave a comment on your purchase page

Please include the component name, React and TypeScript versions, and a minimal reproduction when reporting bugs.

---

## License

Commercial licence — single-site use. You may not redistribute, resell, or publish the source code. Contact the author for multi-site or extended licences.

---

*React 18 · TypeScript 5.5 · Tailwind CSS 3 · Storybook 8*

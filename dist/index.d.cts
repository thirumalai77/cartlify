import React from 'react';
import { ClassValue } from 'clsx';

/** Badge display variant */
type BadgeVariant = 'sale' | 'new' | 'out-of-stock' | 'custom';
/** Button visual style variant */
type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
/** Button size */
type ButtonSize = 'sm' | 'md' | 'lg';
/** Step completion status */
type StepStatus = 'completed' | 'active' | 'pending';
/** A product in the catalog */
interface Product {
    /** Unique identifier */
    id: string;
    /** Display name */
    name: string;
    /** Current price in the consumer's currency */
    price: number;
    /** Original / pre-discount price (optional) */
    originalPrice?: number;
    /** Primary product image URL (always required) */
    image: string;
    /** Alt text for the primary image */
    imageAlt?: string;
    /** Additional image URLs — when provided, enables the thumbnail strip */
    images?: string[];
    /** Alt texts for each image in `images` (index-matched) */
    imageAlts?: string[];
    /** Average star rating (0–5) */
    rating?: number;
    /** Number of reviews */
    reviewCount?: number;
    /** Whether the product is in stock */
    inStock?: boolean;
}
/** A product that has been added to the cart */
interface CartItem extends Product {
    /** Quantity in the cart (≥ 1) */
    quantity: number;
}
/** A single step in a checkout stepper */
interface Step {
    /** Unique identifier */
    id: string;
    /** Step label shown in the UI */
    label: string;
    /** Optional longer description shown below the label */
    description?: string;
    /** Optional custom icon rendered inside the step circle */
    icon?: React.ReactNode;
}

/** Layout variant for the card */
type ProductCardVariant = 'default' | 'horizontal' | 'compact';
/** Slot classNames for fine-grained styling without !important hacks */
interface ProductCardClassNames {
    root?: string;
    image?: string;
    thumbnails?: string;
    body?: string;
    title?: string;
    price?: string;
    badge?: string;
    actions?: string;
}
interface ProductCardProps {
    /** The product data to display */
    product: Product;
    /** Layout variant */
    variant?: ProductCardVariant;
    /** Show skeleton loading state */
    isLoading?: boolean;
    /** Whether the product is on the user's wishlist */
    isWishlisted?: boolean;
    /** Show star rating */
    showRating?: boolean;
    /** Currency symbol for price display */
    currency?: string;
    /** Label for the add-to-cart button */
    addToCartLabel?: string;
    /** Called when add-to-cart is clicked */
    onAddToCart?: (product: Product) => void;
    /** Called when wishlist icon is toggled */
    onWishlistToggle?: (product: Product) => void;
    /** Called when the card itself is activated (click / Enter / Space) */
    onCardClick?: (product: Product) => void;
    /** Custom badge renderer — overrides the default Badge primitive */
    renderBadge?: (product: Product) => React.ReactNode;
    /** Slot classNames for inner parts */
    classNames?: ProductCardClassNames;
    className?: string;
    style?: React.CSSProperties;
}

declare const ProductCard: React.ForwardRefExoticComponent<ProductCardProps & React.RefAttributes<HTMLDivElement>>;

/** Slot classNames for fine-grained styling of CartDrawer internals */
interface CartDrawerClassNames {
    overlay?: string;
    panel?: string;
    header?: string;
    list?: string;
    footer?: string;
}
/** Props for the CartItem sub-component */
interface CartItemProps {
    /** The cart item to render */
    item: CartItem;
    /** Currency symbol */
    currency?: string;
    /** Called with (id, newQuantity) when stepper is used */
    onQuantityChange: (id: string, quantity: number) => void;
    /** Called with (id) when the remove button is clicked */
    onRemove: (id: string) => void;
    className?: string;
}
/** Props for CartDrawer */
interface CartDrawerProps {
    /** Whether the drawer is visible */
    isOpen: boolean;
    /** Called when the drawer should close (backdrop click, ESC, close button) */
    onClose: () => void;
    /** Items currently in the cart */
    items: CartItem[];
    /** Drawer heading text */
    title?: string;
    /** Side the panel slides in from */
    position?: 'left' | 'right';
    /** Currency symbol used in price formatting */
    currency?: string;
    /** Show the auto-calculated subtotal in the footer */
    showSubtotal?: boolean;
    /** Show item count beneath the title */
    showItemCount?: boolean;
    /** Text shown in the empty state */
    emptyStateMessage?: string;
    /** Icon/illustration shown in the empty state */
    emptyStateIcon?: React.ReactNode;
    /** Called with (id, newQuantity) when an item's quantity changes */
    onQuantityChange: (id: string, quantity: number) => void;
    /** Called with (id) when an item is removed */
    onRemoveItem: (id: string) => void;
    /** Called when the checkout CTA is clicked */
    onCheckout: () => void;
    /** Called when "Continue Shopping" is clicked; falls back to onClose */
    onContinueShopping?: () => void;
    /** Slot classNames for inner parts */
    classNames?: CartDrawerClassNames;
    className?: string;
    style?: React.CSSProperties;
}

/**
 * Slide-in cart drawer driven by `useDisclosure` (or any boolean open state).
 * Includes focus trap, ESC-to-close, accessible dialog semantics, and smooth
 * CSS transitions — no animation library required.
 */
declare const CartDrawer: React.ForwardRefExoticComponent<CartDrawerProps & React.RefAttributes<HTMLDivElement>>;

/**
 * A single line item inside the CartDrawer.
 * Wrapped in React.memo so it only re-renders when its own props change.
 */
declare const CartItemComponent: React.NamedExoticComponent<CartItemProps>;

type LoaderVariant = 'spinner' | 'dots' | 'bars' | 'pulse';
type LoaderSize = 'sm' | 'md' | 'lg' | 'xl';
type LoaderPosition = 'fullscreen' | 'overlay' | 'inline';
interface PageLoaderProps {
    /** Controls visibility with a fade transition */
    isVisible?: boolean;
    /** Animation style */
    variant?: LoaderVariant;
    /** Preset size or explicit pixel value */
    size?: LoaderSize | number;
    /** CSS color string — defaults to the primary design token */
    color?: string;
    /** Layout position of the loader */
    position?: LoaderPosition;
    /** Semi-transparent backdrop behind the loader (fullscreen / overlay only) */
    backdrop?: boolean;
    /** Optional message shown below the animation and used as aria-label */
    text?: string;
    className?: string;
    style?: React.CSSProperties;
}

declare const PageLoader: React.ForwardRefExoticComponent<PageLoaderProps & React.RefAttributes<HTMLDivElement>>;

type StepperOrientation = 'horizontal' | 'vertical';
interface CheckoutStepperClassNames {
    root?: string;
    step?: string;
    connector?: string;
    circle?: string;
    label?: string;
    description?: string;
}
interface CheckoutStepperProps {
    /** Ordered list of step definitions */
    steps: Step[];
    /** 0-based index of the currently active step */
    activeStep: number;
    orientation?: StepperOrientation;
    /** Called when a completed step is clicked — enables backward navigation */
    onStepClick?: (index: number) => void;
    showLabels?: boolean;
    showDescriptions?: boolean;
    /** Animate the connector fill transition when a step completes */
    connectorAnimation?: boolean;
    /** Minimum pixel width per step column in horizontal mode (default 100). Increase for wider spacing. */
    minStepWidth?: number;
    classNames?: CheckoutStepperClassNames;
    className?: string;
    style?: React.CSSProperties;
}

declare const CheckoutStepper: React.ForwardRefExoticComponent<CheckoutStepperProps & React.RefAttributes<HTMLOListElement>>;

type ButtonElement = HTMLButtonElement | HTMLAnchorElement;
interface ButtonBaseProps {
    /** Visual style variant */
    variant?: ButtonVariant;
    /** Size of the button */
    size?: ButtonSize;
    /** Show a loading spinner and disable interaction */
    isLoading?: boolean;
    /** Disable the button */
    isDisabled?: boolean;
    /** Icon rendered before children */
    leftIcon?: React.ReactNode;
    /** Icon rendered after children */
    rightIcon?: React.ReactNode;
    /** Stretch to fill the parent width */
    fullWidth?: boolean;
    children?: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
}
type PolymorphicButtonProps<C extends React.ElementType = 'button'> = ButtonBaseProps & {
    /** Render as a different element (e.g. "a" for link buttons) */
    as?: C;
} & Omit<React.ComponentPropsWithoutRef<C>, keyof ButtonBaseProps | 'as'>;
declare const Button: <C extends React.ElementType = "button">(props: PolymorphicButtonProps<C> & {
    ref?: React.ForwardedRef<ButtonElement>;
}) => React.ReactElement;

interface BadgeProps {
    /** Display variant determining the color scheme */
    variant?: BadgeVariant;
    /** Text displayed inside the badge */
    label: string;
    className?: string;
    style?: React.CSSProperties;
}
declare const Badge: React.ForwardRefExoticComponent<BadgeProps & React.RefAttributes<HTMLSpanElement>>;

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    /** Icon element to render — should be an SVG or icon component */
    icon: React.ReactNode;
    /** Required accessible label for screen readers */
    'aria-label': string;
    /** Visual style variant */
    variant?: ButtonVariant;
    /** Size of the button */
    size?: ButtonSize;
    /** Whether the button is in an active / toggled state */
    isActive?: boolean;
    className?: string;
}
declare const IconButton: React.ForwardRefExoticComponent<IconButtonProps & React.RefAttributes<HTMLButtonElement>>;

interface UseCartReturn {
    items: CartItem[];
    addItem: (product: Product, quantity?: number) => void;
    removeItem: (id: string) => void;
    updateQuantity: (id: string, quantity: number) => void;
    clearCart: () => void;
    totalItems: number;
    totalPrice: number;
}
/** Manage cart state: add, remove, update, and clear items. */
declare function useCart(): UseCartReturn;

interface UseDisclosureReturn {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    onToggle: () => void;
}
/** Manage open/close state for modals, drawers, and menus. */
declare function useDisclosure(defaultOpen?: boolean): UseDisclosureReturn;

/**
 * Subscribe to a CSS media query. SSR-safe — returns false until mounted.
 * @param query - e.g. "(min-width: 768px)"
 */
declare function useMediaQuery(query: string): boolean;

/** Merge Tailwind classes; consumer className always wins on conflict. */
declare function cn(...inputs: ClassValue[]): string;

/**
 * Format a numeric price with a currency symbol.
 * @param price - The price to format.
 * @param currency - Currency symbol prefix (default "$").
 */
declare function formatPrice(price: number, currency?: string): string;
/**
 * Calculate the discount percentage between an original and current price.
 * Returns 0 if originalPrice is 0 or current >= original.
 * @param originalPrice - The pre-discount price.
 * @param currentPrice - The discounted price.
 */
declare function calculateDiscount(originalPrice: number, currentPrice: number): number;

export { Badge, type BadgeProps, type BadgeVariant, Button, type ButtonSize, type ButtonVariant, CartDrawer, type CartDrawerClassNames, type CartDrawerProps, type CartItem, CartItemComponent, type CartItemProps, CheckoutStepper, type CheckoutStepperClassNames, type CheckoutStepperProps, IconButton, type IconButtonProps, type LoaderPosition, type LoaderSize, type LoaderVariant, PageLoader, type PageLoaderProps, type Product, ProductCard, type ProductCardClassNames, type ProductCardProps, type ProductCardVariant, type Step, type StepStatus, type StepperOrientation, type UseCartReturn, type UseDisclosureReturn, calculateDiscount, cn, formatPrice, useCart, useDisclosure, useMediaQuery };

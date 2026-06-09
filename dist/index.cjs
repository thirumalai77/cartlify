'use strict';

var react = require('react');
var clsx = require('clsx');
var tailwindMerge = require('tailwind-merge');
var jsxRuntime = require('react/jsx-runtime');

// src/components/ProductCard/ProductCard.tsx
function cn(...inputs) {
  return tailwindMerge.twMerge(clsx.clsx(inputs));
}

// src/utils/formatPrice.ts
function formatPrice(price, currency = "$") {
  return `${currency}${price.toFixed(2)}`;
}
function calculateDiscount(originalPrice, currentPrice) {
  if (originalPrice <= 0 || currentPrice >= originalPrice) return 0;
  return Math.round((originalPrice - currentPrice) / originalPrice * 100);
}
function useMediaQuery(query) {
  const [matches, setMatches] = react.useState(false);
  react.useEffect(() => {
    if (typeof window === "undefined") return;
    const mediaQueryList = window.matchMedia(query);
    setMatches(mediaQueryList.matches);
    const listener = (e) => setMatches(e.matches);
    mediaQueryList.addEventListener("change", listener);
    return () => mediaQueryList.removeEventListener("change", listener);
  }, [query]);
  return matches;
}
var variantClasses = {
  sale: "bg-[color:var(--clf-color-badge-sale-bg)] text-[color:var(--clf-color-badge-sale-text)]",
  new: "bg-[color:var(--clf-color-badge-new-bg)] text-[color:var(--clf-color-badge-new-text)]",
  "out-of-stock": "bg-[color:var(--clf-color-badge-oos-bg)] text-[color:var(--clf-color-badge-oos-text)]",
  custom: ""
};
var Badge = react.forwardRef(function Badge2({ variant = "custom", label, className, style }, ref) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "span",
    {
      ref,
      style,
      className: cn(
        "inline-flex items-center rounded-md px-2 py-0.5 text-xs font-semibold",
        variantClasses[variant],
        className
      ),
      children: label
    }
  );
});
function SpinnerIcon({ className, color }) {
  return /* @__PURE__ */ jsxRuntime.jsxs(
    "svg",
    {
      "aria-hidden": "true",
      className: cn("h-4 w-4 animate-spin", className),
      fill: "none",
      viewBox: "0 0 24 24",
      style: color !== void 0 ? { color } : void 0,
      children: [
        /* @__PURE__ */ jsxRuntime.jsx("circle", { className: "opacity-25", cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "4" }),
        /* @__PURE__ */ jsxRuntime.jsx(
          "path",
          {
            className: "opacity-75",
            fill: "currentColor",
            d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          }
        )
      ]
    }
  );
}
var variantClasses2 = {
  primary: "bg-primary text-primary-foreground hover:bg-primary-hover focus-visible:ring-primary",
  secondary: "bg-secondary text-secondary-foreground hover:bg-secondary-hover focus-visible:ring-secondary",
  ghost: "bg-transparent text-primary hover:bg-primary/10 focus-visible:ring-primary",
  danger: "bg-danger text-danger-foreground hover:bg-danger-hover focus-visible:ring-danger"
};
var sizeClasses = {
  sm: "h-8 px-3 text-sm gap-1.5",
  md: "h-10 px-4 text-sm gap-2",
  lg: "h-12 px-6 text-base gap-2"
};
function ButtonInner({
  as,
  variant = "primary",
  size = "md",
  isLoading = false,
  isDisabled = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  children,
  className,
  style,
  onClick,
  ...rest
}, ref) {
  const Tag = as ?? "button";
  const disabled = isDisabled || isLoading;
  return /* @__PURE__ */ jsxRuntime.jsx(
    Tag,
    {
      ref,
      "aria-disabled": disabled || void 0,
      disabled: Tag === "button" ? disabled : void 0,
      onClick: disabled ? void 0 : onClick,
      style,
      className: cn(
        "inline-flex items-center justify-center rounded-md font-medium whitespace-nowrap transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
        variantClasses2[variant],
        sizeClasses[size],
        fullWidth && "w-full",
        disabled && "pointer-events-none opacity-50",
        className
      ),
      ...rest,
      children: isLoading ? /* @__PURE__ */ jsxRuntime.jsx(SpinnerIcon, {}) : /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
        leftIcon && /* @__PURE__ */ jsxRuntime.jsx("span", { "aria-hidden": "true", children: leftIcon }),
        children,
        rightIcon && /* @__PURE__ */ jsxRuntime.jsx("span", { "aria-hidden": "true", children: rightIcon })
      ] })
    }
  );
}
var Button = react.forwardRef(ButtonInner);
var variantClasses3 = {
  primary: "bg-primary text-primary-foreground hover:bg-primary-hover",
  secondary: "bg-secondary text-secondary-foreground hover:bg-secondary-hover",
  ghost: "bg-transparent text-primary hover:bg-primary/10",
  danger: "bg-danger text-danger-foreground hover:bg-danger-hover"
};
var sizeClasses2 = {
  sm: "h-8 w-8 text-sm",
  md: "h-10 w-10 text-base",
  lg: "h-12 w-12 text-lg"
};
var IconButton = react.forwardRef(function IconButton2({
  icon,
  "aria-label": ariaLabel,
  variant = "ghost",
  size = "md",
  isActive = false,
  className,
  disabled,
  ...rest
}, ref) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "button",
    {
      ref,
      "aria-label": ariaLabel,
      "aria-pressed": isActive,
      disabled,
      className: cn(
        "inline-flex items-center justify-center rounded-full transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
        "min-h-[var(--clf-touch-target)] min-w-[var(--clf-touch-target)]",
        variantClasses3[variant],
        sizeClasses2[size],
        isActive && "ring-2 ring-primary ring-offset-1",
        disabled && "pointer-events-none opacity-50",
        className
      ),
      ...rest,
      children: /* @__PURE__ */ jsxRuntime.jsx("span", { "aria-hidden": "true", children: icon })
    }
  );
});
function CheckIcon({ className, color }) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "svg",
    {
      "aria-hidden": "true",
      className: cn("h-4 w-4", className),
      fill: "none",
      stroke: "currentColor",
      strokeWidth: 2.5,
      viewBox: "0 0 24 24",
      style: color !== void 0 ? { color } : void 0,
      children: /* @__PURE__ */ jsxRuntime.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M5 13l4 4L19 7" })
    }
  );
}
function StarIcon({ className, color }) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "svg",
    {
      "aria-hidden": "true",
      className: cn("h-4 w-4", className),
      fill: "currentColor",
      viewBox: "0 0 20 20",
      style: color !== void 0 ? { color } : void 0,
      children: /* @__PURE__ */ jsxRuntime.jsx("path", { d: "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" })
    }
  );
}
function HeartIcon({
  filled = false,
  className,
  color
}) {
  return filled ? /* @__PURE__ */ jsxRuntime.jsx(
    "svg",
    {
      "aria-hidden": "true",
      className: cn("h-5 w-5 text-danger", className),
      fill: "currentColor",
      viewBox: "0 0 24 24",
      style: color !== void 0 ? { color } : void 0,
      children: /* @__PURE__ */ jsxRuntime.jsx("path", { d: "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" })
    }
  ) : /* @__PURE__ */ jsxRuntime.jsx(
    "svg",
    {
      "aria-hidden": "true",
      className: cn("h-5 w-5", className),
      fill: "none",
      stroke: "currentColor",
      strokeWidth: 2,
      viewBox: "0 0 24 24",
      style: color !== void 0 ? { color } : void 0,
      children: /* @__PURE__ */ jsxRuntime.jsx(
        "path",
        {
          strokeLinecap: "round",
          strokeLinejoin: "round",
          d: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        }
      )
    }
  );
}
function ChevronLeftIcon({ className, color }) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "svg",
    {
      "aria-hidden": "true",
      className: cn("h-3.5 w-3.5", className),
      fill: "none",
      viewBox: "0 0 24 24",
      stroke: "currentColor",
      strokeWidth: 3,
      style: color !== void 0 ? { color } : void 0,
      children: /* @__PURE__ */ jsxRuntime.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M15 19l-7-7 7-7" })
    }
  );
}
function ChevronRightIcon({ className, color }) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "svg",
    {
      "aria-hidden": "true",
      className: cn("h-3.5 w-3.5", className),
      fill: "none",
      viewBox: "0 0 24 24",
      stroke: "currentColor",
      strokeWidth: 3,
      style: color !== void 0 ? { color } : void 0,
      children: /* @__PURE__ */ jsxRuntime.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M9 5l7 7-7 7" })
    }
  );
}
function CloseIcon({ className, color }) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "svg",
    {
      "aria-hidden": "true",
      className: cn("h-5 w-5", className),
      fill: "none",
      stroke: "currentColor",
      strokeWidth: 2,
      viewBox: "0 0 24 24",
      style: color !== void 0 ? { color } : void 0,
      children: /* @__PURE__ */ jsxRuntime.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M6 18L18 6M6 6l12 12" })
    }
  );
}
function ShoppingCartIcon({ className, color }) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "svg",
    {
      "aria-hidden": "true",
      className: cn("h-16 w-16 text-muted", className),
      fill: "none",
      stroke: "currentColor",
      strokeWidth: 1.5,
      viewBox: "0 0 24 24",
      style: color !== void 0 ? { color } : void 0,
      children: /* @__PURE__ */ jsxRuntime.jsx(
        "path",
        {
          strokeLinecap: "round",
          strokeLinejoin: "round",
          d: "M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
        }
      )
    }
  );
}
function TrashIcon({ className, color }) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "svg",
    {
      "aria-hidden": "true",
      className: cn("h-4 w-4", className),
      fill: "none",
      stroke: "currentColor",
      strokeWidth: 2,
      viewBox: "0 0 24 24",
      style: color !== void 0 ? { color } : void 0,
      children: /* @__PURE__ */ jsxRuntime.jsx(
        "path",
        {
          strokeLinecap: "round",
          strokeLinejoin: "round",
          d: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
        }
      )
    }
  );
}
function MinusIcon({ className, color }) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "svg",
    {
      "aria-hidden": "true",
      className: cn("h-3.5 w-3.5", className),
      fill: "none",
      stroke: "currentColor",
      strokeWidth: 3,
      viewBox: "0 0 24 24",
      style: color !== void 0 ? { color } : void 0,
      children: /* @__PURE__ */ jsxRuntime.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M20 12H4" })
    }
  );
}
function PlusIcon({ className, color }) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "svg",
    {
      "aria-hidden": "true",
      className: cn("h-3.5 w-3.5", className),
      fill: "none",
      stroke: "currentColor",
      strokeWidth: 3,
      viewBox: "0 0 24 24",
      style: color !== void 0 ? { color } : void 0,
      children: /* @__PURE__ */ jsxRuntime.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M12 4v16m8-8H4" })
    }
  );
}
function StarRating({ rating, count }) {
  const stars = Math.round(rating);
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center gap-1", role: "img", "aria-label": `${rating} out of 5 stars`, children: [
    Array.from({ length: 5 }, (_, i) => /* @__PURE__ */ jsxRuntime.jsx(
      StarIcon,
      {
        className: cn(
          "h-4 w-4",
          i < stars ? "text-[color:var(--clf-color-warning)]" : "text-[color:var(--clf-color-border)]"
        )
      },
      i
    )),
    count !== void 0 && /* @__PURE__ */ jsxRuntime.jsxs("span", { className: "text-xs text-[color:var(--clf-color-muted-foreground)]", children: [
      "(",
      count,
      ")"
    ] })
  ] });
}
function resolveBadgeVariant(product) {
  if (product.inStock === false) return "out-of-stock";
  if (product.originalPrice && product.originalPrice > product.price) return "sale";
  return null;
}
function SkeletonCard({
  variant
}) {
  const isHorizontal = variant === "horizontal";
  return /* @__PURE__ */ jsxRuntime.jsxs(
    "div",
    {
      "aria-busy": "true",
      "aria-label": "Loading product",
      className: cn(
        "w-full animate-pulse rounded-lg bg-[color:var(--clf-color-surface-raised)] overflow-hidden",
        isHorizontal ? "flex flex-row" : "flex flex-col"
      ),
      children: [
        /* @__PURE__ */ jsxRuntime.jsx(
          "div",
          {
            className: cn(
              "bg-[color:var(--clf-color-border)]",
              isHorizontal ? "w-40 h-32" : "w-full h-56"
            )
          }
        ),
        /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "p-4 flex-1 space-y-3", children: [
          /* @__PURE__ */ jsxRuntime.jsx("div", { className: "h-4 bg-[color:var(--clf-color-border)] rounded w-3/4" }),
          /* @__PURE__ */ jsxRuntime.jsx("div", { className: "h-4 bg-[color:var(--clf-color-border)] rounded w-1/2" }),
          /* @__PURE__ */ jsxRuntime.jsx("div", { className: "h-8 bg-[color:var(--clf-color-border)] rounded w-full mt-4" })
        ] })
      ]
    }
  );
}
function ThumbnailStrip({
  images,
  imageAlts,
  activeIndex,
  onSelect,
  className
}) {
  const scrollRef = react.useRef(null);
  const needsScrollArrows = images.length > 5;
  react.useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    const activeBtn = container.children[activeIndex];
    if (typeof activeBtn?.scrollIntoView === "function") {
      activeBtn.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    }
  }, [activeIndex]);
  const scroll = (dir) => {
    scrollRef.current?.scrollBy({ left: dir === "left" ? -180 : 180, behavior: "smooth" });
  };
  return /* @__PURE__ */ jsxRuntime.jsxs(
    "div",
    {
      className: cn(
        "flex items-center gap-1 bg-[color:var(--clf-color-surface-raised)]",
        "border-b border-[color:var(--clf-color-border)] px-2 py-2",
        className
      ),
      children: [
        needsScrollArrows && /* @__PURE__ */ jsxRuntime.jsx(
          "button",
          {
            "aria-label": "Scroll thumbnails left",
            onClick: (e) => {
              e.stopPropagation();
              scroll("left");
            },
            className: "shrink-0 p-0.5 rounded text-[color:var(--clf-color-muted-foreground)] hover:text-[color:var(--clf-color-primary)] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary",
            children: /* @__PURE__ */ jsxRuntime.jsx(ChevronLeftIcon, {})
          }
        ),
        /* @__PURE__ */ jsxRuntime.jsx(
          "div",
          {
            ref: scrollRef,
            role: "tablist",
            "aria-label": "Product images",
            className: "flex flex-1 min-w-0 gap-2 overflow-x-auto scroll-smooth [&::-webkit-scrollbar]:hidden",
            style: { scrollbarWidth: "none" },
            children: images.map((src, i) => {
              const alt = imageAlts[i] ?? `${i + 1} of ${images.length}`;
              const isActive = i === activeIndex;
              return /* @__PURE__ */ jsxRuntime.jsx(
                "button",
                {
                  role: "tab",
                  "aria-selected": isActive,
                  "aria-label": alt,
                  onClick: (e) => {
                    e.stopPropagation();
                    onSelect(i);
                  },
                  className: cn(
                    "relative shrink-0 h-14 w-14 rounded overflow-hidden border-2 transition-all duration-[var(--clf-duration-base)]",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1",
                    isActive ? "border-[color:var(--clf-color-primary)] shadow-sm scale-105" : "border-[color:var(--clf-color-border)] opacity-55 hover:opacity-100 hover:border-[color:var(--clf-color-primary)]"
                  ),
                  children: /* @__PURE__ */ jsxRuntime.jsx(
                    "img",
                    {
                      src,
                      alt,
                      loading: "lazy",
                      decoding: "async",
                      className: "h-full w-full object-cover"
                    }
                  )
                },
                i
              );
            })
          }
        ),
        needsScrollArrows && /* @__PURE__ */ jsxRuntime.jsx(
          "button",
          {
            "aria-label": "Scroll thumbnails right",
            onClick: (e) => {
              e.stopPropagation();
              scroll("right");
            },
            className: "shrink-0 p-0.5 rounded text-[color:var(--clf-color-muted-foreground)] hover:text-[color:var(--clf-color-primary)] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary",
            children: /* @__PURE__ */ jsxRuntime.jsx(ChevronRightIcon, {})
          }
        )
      ]
    }
  );
}
function DotCarousel({
  total,
  activeIndex,
  onPrev,
  onNext,
  onSelect
}) {
  const showCounter = total > 7;
  const arrowBase = "absolute top-1/2 -translate-y-1/2 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-black/40 text-white transition-all hover:bg-black/65 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white";
  return /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(
      "button",
      {
        "aria-label": "Previous image",
        onClick: (e) => {
          e.stopPropagation();
          onPrev();
        },
        className: cn(arrowBase, "left-1.5", activeIndex === 0 && "opacity-30 pointer-events-none"),
        children: /* @__PURE__ */ jsxRuntime.jsx(ChevronLeftIcon, {})
      }
    ),
    /* @__PURE__ */ jsxRuntime.jsx(
      "button",
      {
        "aria-label": "Next image",
        onClick: (e) => {
          e.stopPropagation();
          onNext();
        },
        className: cn(
          arrowBase,
          "right-1.5",
          activeIndex === total - 1 && "opacity-30 pointer-events-none"
        ),
        children: /* @__PURE__ */ jsxRuntime.jsx(ChevronRightIcon, {})
      }
    ),
    /* @__PURE__ */ jsxRuntime.jsx("div", { className: "absolute bottom-2 left-0 right-0 z-10 flex items-center justify-center gap-1", children: showCounter ? /* @__PURE__ */ jsxRuntime.jsxs("span", { className: "rounded-full bg-black/50 px-2 py-0.5 text-xs font-medium text-white", children: [
      activeIndex + 1,
      " / ",
      total
    ] }) : Array.from({ length: total }, (_, i) => /* @__PURE__ */ jsxRuntime.jsx(
      "button",
      {
        "aria-label": `Image ${i + 1}`,
        onClick: (e) => {
          e.stopPropagation();
          onSelect(i);
        },
        className: cn(
          "rounded-full bg-white transition-all duration-200",
          "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white",
          i === activeIndex ? "h-1.5 w-4" : "h-1.5 w-1.5 opacity-55 hover:opacity-90"
        )
      },
      i
    )) })
  ] });
}
var ProductCard = react.forwardRef(function ProductCard2({
  product,
  variant = "default",
  isLoading = false,
  isWishlisted = false,
  showRating = true,
  currency = "$",
  addToCartLabel = "Add to Cart",
  onAddToCart,
  onWishlistToggle,
  onCardClick,
  renderBadge,
  classNames,
  className,
  style
}, ref) {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const isHorizontal = variant === "horizontal";
  const isCompact = variant === "compact";
  const inStock = product.inStock !== false;
  const discount = product.originalPrice ? calculateDiscount(product.originalPrice, product.price) : 0;
  const allImages = product.images?.length ? product.images : [product.image];
  const allAlts = allImages.map(
    (_, i) => product.imageAlts?.[i] ?? (i === 0 ? product.imageAlt ?? product.name : `${product.name} \u2014 image ${i + 1}`)
  );
  const hasMultiple = allImages.length > 1;
  const [activeIndex, setActiveIndex] = react.useState(0);
  const activeImage = allImages[activeIndex] ?? product.image;
  const activeAlt = allAlts[activeIndex] ?? product.name;
  const goPrev = react.useCallback(() => setActiveIndex((i) => Math.max(0, i - 1)), []);
  const goNext = react.useCallback(
    () => setActiveIndex((i) => Math.min(allImages.length - 1, i + 1)),
    [allImages.length]
  );
  const handleKeyDown = react.useCallback(
    (e) => {
      if ((e.key === "Enter" || e.key === " ") && onCardClick) {
        e.preventDefault();
        onCardClick(product);
      }
    },
    [onCardClick, product]
  );
  const handleCardClick = react.useCallback(() => {
    onCardClick?.(product);
  }, [onCardClick, product]);
  if (isLoading) return /* @__PURE__ */ jsxRuntime.jsx(SkeletonCard, { variant });
  const badgeNode = renderBadge ? renderBadge(product) : (() => {
    const bv = resolveBadgeVariant(product);
    if (!bv) return null;
    const labels = {
      sale: discount > 0 ? `${discount}% OFF` : "Sale",
      "out-of-stock": "Out of Stock"
    };
    return /* @__PURE__ */ jsxRuntime.jsx(Badge, { variant: bv, label: labels[bv] ?? "", className: classNames?.badge });
  })();
  const useDotCarousel = hasMultiple && (isHorizontal || isCompact);
  const useThumbnailStrip = hasMultiple && !isHorizontal && !isCompact;
  return /* @__PURE__ */ jsxRuntime.jsxs(
    "div",
    {
      ref,
      role: onCardClick ? "button" : "article",
      tabIndex: onCardClick ? 0 : void 0,
      onClick: onCardClick ? handleCardClick : void 0,
      onKeyDown: onCardClick ? handleKeyDown : void 0,
      style,
      className: cn(
        "w-full group relative rounded-lg bg-[color:var(--clf-color-surface)] shadow-sm",
        "border border-[color:var(--clf-color-border)] overflow-hidden transition-shadow hover:shadow-md",
        onCardClick && "cursor-pointer focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none",
        isHorizontal ? "flex flex-row" : "flex flex-col",
        classNames?.root,
        className
      ),
      children: [
        /* @__PURE__ */ jsxRuntime.jsxs(
          "div",
          {
            className: cn(
              "relative overflow-hidden bg-[color:var(--clf-color-surface-raised)]",
              isHorizontal ? "w-24 shrink-0 sm:w-32" : isCompact ? "h-36" : "h-56 sm:h-64",
              classNames?.image
            ),
            children: [
              /* @__PURE__ */ jsxRuntime.jsx(
                "img",
                {
                  src: activeImage,
                  alt: activeAlt,
                  loading: "lazy",
                  decoding: "async",
                  className: "h-full w-full object-cover transition-transform duration-[var(--clf-duration-slow)] group-hover:scale-105"
                }
              ),
              badgeNode && /* @__PURE__ */ jsxRuntime.jsx("div", { className: "absolute left-2 top-2", children: badgeNode }),
              onWishlistToggle && /* @__PURE__ */ jsxRuntime.jsx("div", { className: "absolute right-2 top-2", children: /* @__PURE__ */ jsxRuntime.jsx(
                IconButton,
                {
                  icon: /* @__PURE__ */ jsxRuntime.jsx(HeartIcon, { filled: isWishlisted }),
                  "aria-label": isWishlisted ? "Remove from wishlist" : "Add to wishlist",
                  size: "sm",
                  variant: "ghost",
                  isActive: isWishlisted,
                  onClick: (e) => {
                    e.stopPropagation();
                    onWishlistToggle(product);
                  },
                  className: "bg-[color:var(--clf-color-surface)]/80 backdrop-blur-sm"
                }
              ) }),
              useDotCarousel && /* @__PURE__ */ jsxRuntime.jsx(
                DotCarousel,
                {
                  total: allImages.length,
                  activeIndex,
                  onPrev: goPrev,
                  onNext: goNext,
                  onSelect: setActiveIndex
                }
              ),
              isDesktop && onAddToCart && inStock && !isCompact && !isHorizontal && /* @__PURE__ */ jsxRuntime.jsx("div", { className: "absolute inset-x-0 bottom-0 translate-y-full bg-[color:var(--clf-color-surface)]/90 p-2 transition-transform duration-[var(--clf-duration-base)] group-hover:translate-y-0", children: /* @__PURE__ */ jsxRuntime.jsx(
                Button,
                {
                  variant: "primary",
                  size: "sm",
                  fullWidth: true,
                  onClick: (e) => {
                    e.stopPropagation();
                    onAddToCart(product);
                  },
                  "aria-label": `Quick add ${product.name} to cart`,
                  children: "Quick Add"
                }
              ) })
            ]
          }
        ),
        useThumbnailStrip && /* @__PURE__ */ jsxRuntime.jsx(
          ThumbnailStrip,
          {
            images: allImages,
            imageAlts: allAlts,
            activeIndex,
            onSelect: setActiveIndex,
            className: classNames?.thumbnails
          }
        ),
        /* @__PURE__ */ jsxRuntime.jsxs(
          "div",
          {
            className: cn(
              "flex flex-1 flex-col min-w-0",
              isCompact ? "p-2 gap-1" : "p-4 gap-2",
              classNames?.body
            ),
            children: [
              /* @__PURE__ */ jsxRuntime.jsx(
                "h3",
                {
                  className: cn(
                    "font-semibold leading-snug line-clamp-2",
                    isCompact ? "text-sm" : "text-base",
                    classNames?.title
                  ),
                  children: product.name
                }
              ),
              showRating && product.rating !== void 0 && !isCompact && /* @__PURE__ */ jsxRuntime.jsx(StarRating, { rating: product.rating, count: product.reviewCount }),
              /* @__PURE__ */ jsxRuntime.jsxs("div", { className: cn("flex items-baseline gap-2 flex-wrap", classNames?.price), children: [
                /* @__PURE__ */ jsxRuntime.jsx("span", { className: cn("font-bold", isCompact ? "text-sm" : "text-lg"), children: formatPrice(product.price, currency) }),
                product.originalPrice && product.originalPrice > product.price && /* @__PURE__ */ jsxRuntime.jsx("span", { className: "text-sm text-[color:var(--clf-color-muted-foreground)] line-through", children: formatPrice(product.originalPrice, currency) })
              ] }),
              !isCompact && onAddToCart && /* @__PURE__ */ jsxRuntime.jsx("div", { className: cn("mt-auto pt-2", classNames?.actions), children: /* @__PURE__ */ jsxRuntime.jsx(
                Button,
                {
                  variant: "primary",
                  size: isHorizontal ? "sm" : "md",
                  fullWidth: true,
                  isDisabled: !inStock,
                  onClick: (e) => {
                    e.stopPropagation();
                    onAddToCart(product);
                  },
                  "aria-label": inStock ? `${addToCartLabel}: ${product.name}` : `${product.name} is out of stock`,
                  children: inStock ? addToCartLabel : "Out of Stock"
                }
              ) })
            ]
          }
        )
      ]
    }
  );
});
var stepperBtnBase = [
  "flex h-7 w-7 items-center justify-center",
  "text-[color:var(--clf-color-muted-foreground)] transition-colors",
  "hover:bg-[color:var(--clf-color-surface-raised)] hover:text-[color:var(--clf-color-primary)]",
  "disabled:cursor-not-allowed disabled:opacity-40",
  "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-inset",
  "focus-visible:ring-[color:var(--clf-color-primary)]"
].join(" ");
var CartItemComponent = react.memo(function CartItemComponent2({
  item,
  currency = "$",
  onQuantityChange,
  onRemove,
  className
}) {
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: cn("flex gap-3 py-3", className), children: [
    /* @__PURE__ */ jsxRuntime.jsx("div", { className: "relative h-16 w-16 shrink-0 overflow-hidden rounded-md bg-[color:var(--clf-color-surface-raised)]", children: /* @__PURE__ */ jsxRuntime.jsx(
      "img",
      {
        src: item.image,
        alt: item.name,
        loading: "lazy",
        decoding: "async",
        className: "h-full w-full object-cover"
      }
    ) }),
    /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex min-w-0 flex-1 flex-col gap-1", children: [
      /* @__PURE__ */ jsxRuntime.jsx("p", { className: "truncate text-sm font-medium leading-snug", children: item.name }),
      /* @__PURE__ */ jsxRuntime.jsx("p", { className: "text-sm font-bold text-[color:var(--clf-color-primary)]", children: formatPrice(item.price, currency) }),
      /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "mt-auto flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntime.jsxs(
          "div",
          {
            role: "group",
            "aria-label": `Quantity for ${item.name}`,
            className: "flex items-center overflow-hidden rounded-md border border-[color:var(--clf-color-border)]",
            children: [
              /* @__PURE__ */ jsxRuntime.jsx(
                "button",
                {
                  type: "button",
                  "aria-label": `Decrease quantity of ${item.name}`,
                  disabled: item.quantity <= 1,
                  onClick: () => onQuantityChange(item.id, item.quantity - 1),
                  className: cn(stepperBtnBase, "border-r border-[color:var(--clf-color-border)]"),
                  children: /* @__PURE__ */ jsxRuntime.jsx(MinusIcon, {})
                }
              ),
              /* @__PURE__ */ jsxRuntime.jsx(
                "span",
                {
                  className: "w-8 select-none text-center text-sm font-medium",
                  "aria-live": "polite",
                  "aria-label": `Quantity: ${item.quantity}`,
                  children: item.quantity
                }
              ),
              /* @__PURE__ */ jsxRuntime.jsx(
                "button",
                {
                  type: "button",
                  "aria-label": `Increase quantity of ${item.name}`,
                  onClick: () => onQuantityChange(item.id, item.quantity + 1),
                  className: cn(stepperBtnBase, "border-l border-[color:var(--clf-color-border)]"),
                  children: /* @__PURE__ */ jsxRuntime.jsx(PlusIcon, {})
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntime.jsx(
          IconButton,
          {
            icon: /* @__PURE__ */ jsxRuntime.jsx(TrashIcon, {}),
            "aria-label": `Remove ${item.name} from cart`,
            size: "sm",
            variant: "ghost",
            onClick: () => onRemove(item.id),
            className: "text-[color:var(--clf-color-danger)] hover:bg-[color:var(--clf-color-danger)]/10"
          }
        )
      ] })
    ] })
  ] });
});
var FOCUSABLE_SELECTORS = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])'
].join(", ");
function useFocusTrap(containerRef, isActive) {
  react.useEffect(() => {
    if (!isActive) return;
    const container = containerRef.current;
    if (!container) return;
    const getFocusable = () => Array.from(container.querySelectorAll(FOCUSABLE_SELECTORS));
    const previousFocus = document.activeElement;
    const focusable = getFocusable();
    if (focusable.length > 0) {
      focusable[0].focus();
    }
    const onKeyDown = (e) => {
      if (e.key !== "Tab") return;
      const els = getFocusable();
      if (els.length === 0) return;
      const first = els[0];
      const last = els[els.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      previousFocus?.focus();
    };
  }, [isActive, containerRef]);
}
var TITLE_ID = "euk-cart-drawer-title";
var CartDrawer = react.forwardRef(function CartDrawer2({
  isOpen,
  onClose,
  items,
  title = "Your Cart",
  position = "right",
  currency = "$",
  showSubtotal = true,
  showItemCount = true,
  emptyStateMessage = "Your cart is empty",
  emptyStateIcon,
  onQuantityChange,
  onRemoveItem,
  onCheckout,
  onContinueShopping,
  classNames,
  className,
  style
}, ref) {
  const panelRef = react.useRef(null);
  const subtotal = react.useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items]
  );
  const itemCount = react.useMemo(() => items.reduce((sum, item) => sum + item.quantity, 0), [items]);
  const handleQuantityChange = react.useCallback(
    (id, quantity) => onQuantityChange(id, quantity),
    [onQuantityChange]
  );
  const handleRemoveItem = react.useCallback((id) => onRemoveItem(id), [onRemoveItem]);
  react.useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose]);
  useFocusTrap(panelRef, isOpen);
  const panelSlide = isOpen ? "translate-x-0" : position === "right" ? "translate-x-full" : "-translate-x-full";
  return /* @__PURE__ */ jsxRuntime.jsxs(
    "div",
    {
      ref,
      style,
      "aria-hidden": !isOpen || void 0,
      className: cn("fixed inset-0 z-50", !isOpen && "pointer-events-none", className),
      children: [
        /* @__PURE__ */ jsxRuntime.jsx(
          "div",
          {
            "aria-hidden": "true",
            "data-testid": "cart-drawer-backdrop",
            onClick: onClose,
            className: cn(
              "absolute inset-0 bg-[color:var(--clf-color-overlay)]",
              "transition-opacity duration-[var(--clf-duration-slow)]",
              isOpen ? "opacity-100" : "opacity-0",
              classNames?.overlay
            )
          }
        ),
        /* @__PURE__ */ jsxRuntime.jsxs(
          "div",
          {
            ref: panelRef,
            role: "dialog",
            "aria-modal": "true",
            "aria-labelledby": TITLE_ID,
            className: cn(
              "absolute inset-y-0 flex w-full flex-col sm:max-w-[400px]",
              position === "right" ? "right-0" : "left-0",
              "bg-[color:var(--clf-color-surface)] shadow-lg",
              "transition-transform duration-[var(--clf-duration-slow)]",
              panelSlide,
              classNames?.panel
            ),
            children: [
              /* @__PURE__ */ jsxRuntime.jsxs(
                "div",
                {
                  className: cn(
                    "flex shrink-0 items-start justify-between gap-3",
                    "border-b border-[color:var(--clf-color-border)] px-4 py-3",
                    classNames?.header
                  ),
                  children: [
                    /* @__PURE__ */ jsxRuntime.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntime.jsx("h2", { id: TITLE_ID, className: "text-lg font-semibold leading-snug", children: title }),
                      showItemCount && /* @__PURE__ */ jsxRuntime.jsxs("p", { className: "text-xs text-[color:var(--clf-color-muted-foreground)]", children: [
                        itemCount,
                        " ",
                        itemCount === 1 ? "item" : "items"
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntime.jsx(
                      IconButton,
                      {
                        icon: /* @__PURE__ */ jsxRuntime.jsx(CloseIcon, {}),
                        "aria-label": "Close cart",
                        variant: "ghost",
                        size: "sm",
                        onClick: onClose
                      }
                    )
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntime.jsx("div", { className: cn("flex-1 overflow-y-auto px-4", classNames?.list), children: items.length === 0 ? /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex h-full flex-col items-center justify-center gap-3 py-16 text-center", children: [
                emptyStateIcon ?? /* @__PURE__ */ jsxRuntime.jsx(ShoppingCartIcon, {}),
                /* @__PURE__ */ jsxRuntime.jsx("p", { className: "text-sm text-[color:var(--clf-color-muted-foreground)]", children: emptyStateMessage })
              ] }) : /* @__PURE__ */ jsxRuntime.jsx("ul", { "aria-label": "Cart items", className: "divide-y divide-[color:var(--clf-color-border)]", children: items.map((item) => /* @__PURE__ */ jsxRuntime.jsx("li", { children: /* @__PURE__ */ jsxRuntime.jsx(
                CartItemComponent,
                {
                  item,
                  currency,
                  onQuantityChange: handleQuantityChange,
                  onRemove: handleRemoveItem
                }
              ) }, item.id)) }) }),
              /* @__PURE__ */ jsxRuntime.jsxs(
                "div",
                {
                  className: cn(
                    "shrink-0 space-y-3 border-t border-[color:var(--clf-color-border)] px-4 py-4",
                    classNames?.footer
                  ),
                  children: [
                    showSubtotal && items.length > 0 && /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center justify-between", children: [
                      /* @__PURE__ */ jsxRuntime.jsx("span", { className: "text-sm text-[color:var(--clf-color-muted-foreground)]", children: "Subtotal" }),
                      /* @__PURE__ */ jsxRuntime.jsx("span", { className: "text-base font-semibold", children: formatPrice(subtotal, currency) })
                    ] }),
                    /* @__PURE__ */ jsxRuntime.jsx(
                      Button,
                      {
                        variant: "primary",
                        fullWidth: true,
                        isDisabled: items.length === 0,
                        onClick: onCheckout,
                        "aria-label": "Proceed to checkout",
                        children: "Checkout"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntime.jsx(Button, { variant: "ghost", fullWidth: true, onClick: onContinueShopping ?? onClose, children: "Continue Shopping" })
                  ]
                }
              )
            ]
          }
        )
      ]
    }
  );
});
var STYLES_ID = "euk-page-loader-styles";
var LOADER_CSS = `
@keyframes euk-spin    { to { transform: rotate(360deg); } }
@keyframes euk-spin-ccw { to { transform: rotate(-360deg); } }
@keyframes euk-bounce {
  0%, 80%, 100% { transform: translateY(0) scale(0.9); opacity: 0.45; }
  40%           { transform: translateY(-55%) scale(1.1); opacity: 1; }
}
@keyframes euk-bar {
  0%, 100% { transform: scaleY(0.3); }
  50%      { transform: scaleY(1); }
}
@keyframes euk-pulse-ring {
  0%   { transform: scale(0.75); opacity: 0.85; }
  100% { transform: scale(2.1);  opacity: 0; }
}
@keyframes euk-pulse-core {
  0%, 100% { transform: scale(1); }
  50%      { transform: scale(0.82); }
}
`;
function useLoaderStyles() {
  react.useEffect(() => {
    if (typeof document === "undefined" || document.getElementById(STYLES_ID)) return;
    const el = document.createElement("style");
    el.id = STYLES_ID;
    el.textContent = LOADER_CSS;
    document.head.appendChild(el);
  }, []);
}
var SIZE_PX = { sm: 24, md: 40, lg: 56, xl: 72 };
function resolvePx(size) {
  return typeof size === "number" ? size : SIZE_PX[size];
}
function SpinnerVariant({ size, color }) {
  const bw = Math.max(2, Math.round(size / 12));
  const glow = Math.max(2, Math.round(bw * 2.5));
  const innerInset = Math.round(size * 0.22);
  const dotInset = Math.round(size * 0.42);
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { style: { position: "relative", width: size, height: size }, children: [
    /* @__PURE__ */ jsxRuntime.jsx(
      "div",
      {
        style: {
          position: "absolute",
          inset: 0,
          borderRadius: "50%",
          border: `${bw}px solid ${color}`,
          opacity: 0.15
        }
      }
    ),
    /* @__PURE__ */ jsxRuntime.jsx(
      "div",
      {
        style: {
          position: "absolute",
          inset: 0,
          borderRadius: "50%",
          border: `${bw}px solid transparent`,
          borderTopColor: color,
          animation: "euk-spin 0.9s linear infinite",
          filter: `drop-shadow(0 0 ${glow}px ${color})`
        }
      }
    ),
    /* @__PURE__ */ jsxRuntime.jsx(
      "div",
      {
        style: {
          position: "absolute",
          inset: innerInset,
          borderRadius: "50%",
          border: `${bw}px solid ${color}`,
          opacity: 0.12
        }
      }
    ),
    /* @__PURE__ */ jsxRuntime.jsx(
      "div",
      {
        style: {
          position: "absolute",
          inset: innerInset,
          borderRadius: "50%",
          border: `${bw}px solid transparent`,
          borderBottomColor: color,
          animation: "euk-spin-ccw 0.65s linear infinite"
        }
      }
    ),
    /* @__PURE__ */ jsxRuntime.jsx(
      "div",
      {
        style: {
          position: "absolute",
          inset: dotInset,
          borderRadius: "50%",
          backgroundColor: color,
          opacity: 0.9,
          filter: `drop-shadow(0 0 ${Math.round(glow * 0.8)}px ${color})`
        }
      }
    )
  ] });
}
function DotsVariant({ size, color }) {
  const dotSize = Math.max(6, Math.round(size * 0.24));
  const gap = Math.max(4, Math.round(size * 0.14));
  const glow = Math.max(2, Math.round(dotSize * 0.5));
  return /* @__PURE__ */ jsxRuntime.jsx("div", { style: { display: "flex", alignItems: "center", gap }, children: [0, 1, 2].map((i) => /* @__PURE__ */ jsxRuntime.jsx(
    "div",
    {
      style: {
        width: dotSize,
        height: dotSize,
        borderRadius: "50%",
        backgroundColor: color,
        animation: `euk-bounce 1.3s ease-in-out ${i * 0.18}s infinite`,
        filter: `drop-shadow(0 0 ${glow}px ${color})`
      }
    },
    i
  )) });
}
function BarsVariant({ size, color }) {
  const barW = Math.max(3, Math.round(size * 0.1));
  const barH = Math.round(size * 0.65);
  const gap = Math.max(3, Math.round(size * 0.08));
  return /* @__PURE__ */ jsxRuntime.jsx("div", { style: { display: "flex", alignItems: "center", gap, height: size }, children: [0, 1, 2, 3, 4].map((i) => /* @__PURE__ */ jsxRuntime.jsx(
    "div",
    {
      style: {
        width: barW,
        height: barH,
        borderRadius: barW,
        backgroundColor: color,
        animation: `euk-bar 1s ease-in-out ${i * 0.12}s infinite`,
        transformOrigin: "center"
      }
    },
    i
  )) });
}
function PulseVariant({ size, color }) {
  const coreInset = Math.round(size * 0.3);
  const coreSize = size - coreInset * 2;
  const glow = Math.max(3, Math.round(coreSize * 0.5));
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { style: { position: "relative", width: size, height: size }, children: [
    [0, 1, 2].map((i) => /* @__PURE__ */ jsxRuntime.jsx(
      "div",
      {
        style: {
          position: "absolute",
          inset: 0,
          borderRadius: "50%",
          border: `2px solid ${color}`,
          animation: `euk-pulse-ring 2s ease-out ${i * 0.6}s infinite`
        }
      },
      i
    )),
    /* @__PURE__ */ jsxRuntime.jsx(
      "div",
      {
        style: {
          position: "absolute",
          inset: coreInset,
          borderRadius: "50%",
          backgroundColor: color,
          animation: "euk-pulse-core 2s ease-in-out infinite",
          filter: `drop-shadow(0 0 ${glow}px ${color})`
        }
      }
    )
  ] });
}
var POSITION_CLASS = {
  fullscreen: "fixed inset-0 z-[9999]",
  overlay: "absolute inset-0 z-10",
  inline: "relative"
};
var PageLoader = react.forwardRef(function PageLoader2({
  isVisible = true,
  variant = "spinner",
  size = "md",
  color = "var(--clf-color-primary)",
  position = "inline",
  backdrop = false,
  text,
  className,
  style
}, ref) {
  useLoaderStyles();
  const px = resolvePx(size);
  const showBackdrop = backdrop && position !== "inline";
  return /* @__PURE__ */ jsxRuntime.jsxs(
    "div",
    {
      ref,
      role: "status",
      "aria-label": text ?? "Loading",
      "aria-busy": isVisible,
      "aria-hidden": !isVisible || void 0,
      style: {
        transition: "opacity 0.25s ease",
        opacity: isVisible ? 1 : 0,
        pointerEvents: isVisible ? void 0 : "none",
        ...style
      },
      className: cn(
        POSITION_CLASS[position],
        "flex flex-col items-center justify-center gap-3",
        className
      ),
      children: [
        showBackdrop && /* @__PURE__ */ jsxRuntime.jsx(
          "div",
          {
            "aria-hidden": "true",
            className: "absolute inset-0 bg-[color:var(--clf-color-surface)]/80 backdrop-blur-sm"
          }
        ),
        /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "relative z-10", children: [
          variant === "spinner" && /* @__PURE__ */ jsxRuntime.jsx(SpinnerVariant, { size: px, color }),
          variant === "dots" && /* @__PURE__ */ jsxRuntime.jsx(DotsVariant, { size: px, color }),
          variant === "bars" && /* @__PURE__ */ jsxRuntime.jsx(BarsVariant, { size: px, color }),
          variant === "pulse" && /* @__PURE__ */ jsxRuntime.jsx(PulseVariant, { size: px, color })
        ] }),
        text && /* @__PURE__ */ jsxRuntime.jsx("p", { className: "relative z-10 text-sm font-medium tracking-wide text-[color:var(--clf-color-muted-foreground)]", children: text })
      ]
    }
  );
});
var BUTTON_FOCUS = "rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--clf-color-primary)] focus-visible:ring-offset-2";
function StepCircle({
  step,
  index,
  status,
  className
}) {
  const isCompleted = status === "completed";
  const isActive = status === "active";
  const isPending = status === "pending";
  return /* @__PURE__ */ jsxRuntime.jsx(
    "div",
    {
      "aria-hidden": "true",
      className: cn(
        "relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
        "text-sm font-semibold select-none",
        "transition-all duration-[var(--clf-duration-base)]",
        (isCompleted || isActive) && "bg-[color:var(--clf-color-primary)] text-[color:var(--clf-color-primary-foreground)]",
        isPending && "border-2 border-[color:var(--clf-color-border)] bg-[color:var(--clf-color-surface-raised)] text-[color:var(--clf-color-muted-foreground)]",
        className
      ),
      style: isActive ? { boxShadow: "0 0 0 3px var(--clf-color-surface), 0 0 0 6px var(--clf-color-primary)" } : void 0,
      children: step.icon ?? (isCompleted ? /* @__PURE__ */ jsxRuntime.jsx(CheckIcon, {}) : /* @__PURE__ */ jsxRuntime.jsx("span", { children: index + 1 }))
    }
  );
}
function StepLabel({
  step,
  status,
  showLabel,
  showDescription,
  orientation,
  labelClassName,
  descriptionClassName
}) {
  if (!showLabel && !showDescription) return null;
  const isActive = status === "active";
  const isPending = status === "pending";
  return /* @__PURE__ */ jsxRuntime.jsxs(
    "div",
    {
      className: cn(
        "flex flex-col gap-0.5",
        orientation === "horizontal" && "items-center text-center"
      ),
      children: [
        showLabel && /* @__PURE__ */ jsxRuntime.jsx(
          "span",
          {
            className: cn(
              "text-xs font-medium leading-snug whitespace-nowrap",
              "transition-colors duration-[var(--clf-duration-base)]",
              isActive && "font-semibold text-[color:var(--clf-color-primary)]",
              isPending && "text-[color:var(--clf-color-muted-foreground)]",
              labelClassName
            ),
            children: step.label
          }
        ),
        showDescription && step.description && /* @__PURE__ */ jsxRuntime.jsx(
          "span",
          {
            className: cn(
              "text-[10px] leading-snug text-[color:var(--clf-color-muted-foreground)]",
              descriptionClassName
            ),
            children: step.description
          }
        )
      ]
    }
  );
}
function Connector({
  orientation,
  filled,
  animated,
  className
}) {
  if (orientation === "horizontal") {
    return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: cn("relative h-0.5 w-full", className), "aria-hidden": "true", children: [
      /* @__PURE__ */ jsxRuntime.jsx("div", { className: "absolute inset-0 h-full w-full rounded-full bg-[color:var(--clf-color-border)]" }),
      /* @__PURE__ */ jsxRuntime.jsx(
        "div",
        {
          className: cn(
            "absolute inset-0 h-full rounded-full bg-[color:var(--clf-color-primary)]",
            animated && "transition-[width] duration-[var(--clf-duration-slow)]"
          ),
          style: { width: filled ? "100%" : "0%" }
        }
      )
    ] });
  }
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: cn("relative mt-1 w-0.5 flex-1 min-h-6", className), "aria-hidden": "true", children: [
    /* @__PURE__ */ jsxRuntime.jsx("div", { className: "absolute inset-0 w-full rounded-full bg-[color:var(--clf-color-border)]" }),
    /* @__PURE__ */ jsxRuntime.jsx(
      "div",
      {
        className: cn(
          "absolute top-0 left-0 w-full rounded-full bg-[color:var(--clf-color-primary)]",
          animated && "transition-[height] duration-[var(--clf-duration-slow)]"
        ),
        style: { height: filled ? "100%" : "0%" }
      }
    )
  ] });
}
function StepItem({
  step,
  index,
  status,
  orientation,
  isFirst,
  isLast,
  showLabel,
  showDescription,
  connectorAnimation,
  onClick,
  classNames
}) {
  const isCompleted = status === "completed";
  const isActive = status === "active";
  const prevDone = !status.startsWith("p");
  const hereDone = isCompleted;
  const circleEl = /* @__PURE__ */ jsxRuntime.jsx(
    StepCircle,
    {
      step,
      index,
      status,
      className: cn(classNames?.circle, "group-hover:brightness-90 transition-[filter]")
    }
  );
  const labelEl = /* @__PURE__ */ jsxRuntime.jsx(
    StepLabel,
    {
      step,
      status,
      showLabel,
      showDescription,
      orientation,
      labelClassName: cn(classNames?.label, onClick && "group-hover:underline underline-offset-2"),
      descriptionClassName: classNames?.description
    }
  );
  if (orientation === "horizontal") {
    const inner = onClick ? /* @__PURE__ */ jsxRuntime.jsxs(
      "button",
      {
        type: "button",
        "data-step-btn": "",
        onClick,
        "aria-label": `Go back to ${step.label}`,
        className: cn("group flex flex-col items-center gap-2", BUTTON_FOCUS),
        children: [
          circleEl,
          labelEl
        ]
      }
    ) : /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex flex-col items-center gap-2", children: [
      circleEl,
      labelEl
    ] });
    return /* @__PURE__ */ jsxRuntime.jsxs(
      "li",
      {
        "aria-current": isActive ? "step" : void 0,
        className: cn("relative flex flex-col items-center", classNames?.step),
        children: [
          !isFirst && /* @__PURE__ */ jsxRuntime.jsxs(
            "div",
            {
              className: cn("absolute top-4 left-0 right-1/2 h-0.5", classNames?.connector),
              "aria-hidden": "true",
              children: [
                /* @__PURE__ */ jsxRuntime.jsx("div", { className: "h-full w-full rounded-full bg-[color:var(--clf-color-border)]" }),
                /* @__PURE__ */ jsxRuntime.jsx(
                  "div",
                  {
                    className: cn(
                      "absolute inset-0 h-full rounded-full bg-[color:var(--clf-color-primary)]",
                      connectorAnimation && "transition-[width] duration-[var(--clf-duration-slow)]"
                    ),
                    style: { width: prevDone ? "100%" : "0%" }
                  }
                )
              ]
            }
          ),
          !isLast && /* @__PURE__ */ jsxRuntime.jsxs(
            "div",
            {
              className: cn("absolute top-4 left-1/2 right-0 h-0.5", classNames?.connector),
              "aria-hidden": "true",
              children: [
                /* @__PURE__ */ jsxRuntime.jsx("div", { className: "h-full w-full rounded-full bg-[color:var(--clf-color-border)]" }),
                /* @__PURE__ */ jsxRuntime.jsx(
                  "div",
                  {
                    className: cn(
                      "absolute inset-0 h-full rounded-full bg-[color:var(--clf-color-primary)]",
                      connectorAnimation && "transition-[width] duration-[var(--clf-duration-slow)]"
                    ),
                    style: { width: hereDone ? "100%" : "0%" }
                  }
                )
              ]
            }
          ),
          inner
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxRuntime.jsxs("li", { "aria-current": isActive ? "step" : void 0, className: cn("flex gap-4", classNames?.step), children: [
    /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex flex-col items-center", children: [
      onClick ? /* @__PURE__ */ jsxRuntime.jsx(
        "button",
        {
          type: "button",
          "data-step-btn": "",
          onClick,
          "aria-label": `Go back to ${step.label}`,
          className: cn("group", BUTTON_FOCUS),
          children: circleEl
        }
      ) : circleEl,
      !isLast && /* @__PURE__ */ jsxRuntime.jsx(
        Connector,
        {
          orientation: "vertical",
          filled: hereDone,
          animated: connectorAnimation,
          className: classNames?.connector
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntime.jsx("div", { className: cn("flex flex-col justify-center", !isLast && "pb-8"), children: onClick ? /* @__PURE__ */ jsxRuntime.jsx(
      "button",
      {
        type: "button",
        onClick,
        tabIndex: -1,
        "aria-hidden": "true",
        className: "flex flex-col gap-0.5 text-left cursor-pointer",
        children: labelEl
      }
    ) : labelEl })
  ] });
}
function getStatus(index, activeStep) {
  if (index < activeStep) return "completed";
  if (index === activeStep) return "active";
  return "pending";
}
var CheckoutStepper = react.forwardRef(
  function CheckoutStepper2({
    steps,
    activeStep,
    orientation = "horizontal",
    onStepClick,
    showLabels = true,
    showDescriptions = false,
    connectorAnimation = true,
    minStepWidth = 100,
    classNames,
    className,
    style
  }, ref) {
    const handleKeyDown = react.useCallback(
      (e) => {
        if (!onStepClick) return;
        const isHoriz = orientation === "horizontal";
        const isNext = isHoriz ? e.key === "ArrowRight" : e.key === "ArrowDown";
        const isPrev = isHoriz ? e.key === "ArrowLeft" : e.key === "ArrowUp";
        if (!isNext && !isPrev) return;
        e.preventDefault();
        const buttons = Array.from(
          e.currentTarget.querySelectorAll("button[data-step-btn]")
        );
        const idx = buttons.findIndex((b) => b === document.activeElement);
        if (idx < 0) return;
        const target = isPrev ? buttons[idx - 1] : buttons[idx + 1];
        target?.focus();
      },
      [orientation, onStepClick]
    );
    return (
      // eslint-disable-next-line jsx-a11y/no-static-element-interactions
      /* @__PURE__ */ jsxRuntime.jsx("div", { onKeyDown: handleKeyDown, children: /* @__PURE__ */ jsxRuntime.jsx(
        "ol",
        {
          ref,
          "aria-label": "Checkout steps",
          style: orientation === "horizontal" ? { gridTemplateColumns: `repeat(${steps.length}, minmax(${minStepWidth}px, 1fr))`, ...style } : style,
          className: cn(
            orientation === "horizontal" ? "grid w-full" : "flex flex-col",
            classNames?.root,
            className
          ),
          children: steps.map((step, index) => /* @__PURE__ */ jsxRuntime.jsx(
            StepItem,
            {
              step,
              index,
              status: getStatus(index, activeStep),
              orientation,
              isFirst: index === 0,
              isLast: index === steps.length - 1,
              showLabel: showLabels,
              showDescription: showDescriptions,
              connectorAnimation,
              onClick: getStatus(index, activeStep) === "completed" && onStepClick ? () => onStepClick(index) : void 0,
              classNames
            },
            step.id
          ))
        }
      ) })
    );
  }
);
function useCart() {
  const [items, setItems] = react.useState([]);
  const addItem = react.useCallback((product, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map(
          (item) => item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { ...product, quantity: Math.max(1, quantity) }];
    });
  }, []);
  const removeItem = react.useCallback((id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }, []);
  const updateQuantity = react.useCallback((id, quantity) => {
    const clamped = Math.max(1, quantity);
    setItems(
      (prev) => prev.map((item) => item.id === id ? { ...item, quantity: clamped } : item)
    );
  }, []);
  const clearCart = react.useCallback(() => setItems([]), []);
  const totalItems = react.useMemo(() => items.reduce((sum, item) => sum + item.quantity, 0), [items]);
  const totalPrice = react.useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items]
  );
  return { items, addItem, removeItem, updateQuantity, clearCart, totalItems, totalPrice };
}
function useDisclosure(defaultOpen = false) {
  const [isOpen, setIsOpen] = react.useState(defaultOpen);
  const onOpen = react.useCallback(() => setIsOpen(true), []);
  const onClose = react.useCallback(() => setIsOpen(false), []);
  const onToggle = react.useCallback(() => setIsOpen((prev) => !prev), []);
  return { isOpen, onOpen, onClose, onToggle };
}

exports.Badge = Badge;
exports.Button = Button;
exports.CartDrawer = CartDrawer;
exports.CartItemComponent = CartItemComponent;
exports.CheckIcon = CheckIcon;
exports.CheckoutStepper = CheckoutStepper;
exports.ChevronLeftIcon = ChevronLeftIcon;
exports.ChevronRightIcon = ChevronRightIcon;
exports.CloseIcon = CloseIcon;
exports.HeartIcon = HeartIcon;
exports.IconButton = IconButton;
exports.MinusIcon = MinusIcon;
exports.PageLoader = PageLoader;
exports.PlusIcon = PlusIcon;
exports.ProductCard = ProductCard;
exports.ShoppingCartIcon = ShoppingCartIcon;
exports.SpinnerIcon = SpinnerIcon;
exports.StarIcon = StarIcon;
exports.TrashIcon = TrashIcon;
exports.calculateDiscount = calculateDiscount;
exports.cn = cn;
exports.formatPrice = formatPrice;
exports.useCart = useCart;
exports.useDisclosure = useDisclosure;
exports.useMediaQuery = useMediaQuery;
//# sourceMappingURL=index.cjs.map
//# sourceMappingURL=index.cjs.map
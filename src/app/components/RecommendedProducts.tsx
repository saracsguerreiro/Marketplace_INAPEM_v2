import { Link } from "react-router";
import { ShoppingCart, Star, Sparkles } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Product } from "../data/products";
import { useCart } from "../contexts/CartContext";

interface Props {
  products: Product[];
  title: string;
  subtitle?: string;
}

export function RecommendedProducts({ products, title, subtitle }: Props) {
  const { addToCart } = useCart();

  if (products.length === 0) return null;

  return (
    <section style={{ marginTop: "4rem" }}>
      <div className="flex items-center gap-2 mb-2">
        <Sparkles className="ds-icon text-coral" />
        <h2 className="text-xl">{title}</h2>
      </div>
      {subtitle && <p className="text-muted-foreground text-sm mb-6">{subtitle}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {products.map((product) => (
          <div key={product.id} className="ds-card ds-card--interactive group">
            <Link to={`/marketplace/${product.id}`}>
              <div className="ds-card__media" style={{ aspectRatio: "4/3" }}>
                <ImageWithFallback
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            </Link>
            <div className="ds-card__container" style={{ flex: 1, display: "flex", flexDirection: "column" }}>
              <div className="flex items-center justify-between mb-1">
                <span className="ds-badge ds-badge--brand ds-badge--subtle" style={{ fontSize: "0.625rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>{product.category}</span>
                <span className={`ds-badge ${product.type === "serviço" ? "ds-badge--info ds-badge--subtle" : "ds-badge--success ds-badge--subtle"}`} style={{ fontSize: "0.625rem" }}>
                  {product.type === "serviço" ? "Serviço" : "Produto"}
                </span>
              </div>
              <Link to={`/marketplace/${product.id}`} style={{ textDecoration: "none" }}>
                <h3 className="text-sm mb-2 line-clamp-2" style={{ color: "var(--ds-content-default)" }}>{product.name}</h3>
              </Link>
              <div className="text-xs mb-2 flex items-center gap-1" style={{ color: "var(--ds-content-subtle)" }}>
                <div style={{ width: "0.375rem", height: "0.375rem", borderRadius: "9999px", background: "#16a34a" }}></div>
                {product.supplier}
              </div>
              <div className="flex items-center gap-1 mb-3 text-xs text-yellow-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-3 h-3 ${i < Math.floor(product.rating) ? "fill-yellow-500" : ""}`} />
                ))}
                <span className="text-muted-foreground ml-1">{product.rating}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="font-extrabold text-sm text-coral">{product.price.toLocaleString()} Kz</div>
                <button
                  onClick={() => addToCart({ id: product.id, name: product.name, price: product.price, supplier: product.supplier, image: product.image })}
                  className="ds-button ds-button--toned ds-button--icon-only ds-button--sm"
                >
                  <ShoppingCart className="ds-icon ds-icon--sm" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

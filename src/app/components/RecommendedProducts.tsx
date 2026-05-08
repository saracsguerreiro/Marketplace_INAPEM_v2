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
    <section className="mt-16">
      <div className="flex items-center gap-2 mb-2">
        <Sparkles className="w-5 h-5 text-coral" />
        <h2 className="text-xl">{title}</h2>
      </div>
      {subtitle && <p className="text-muted-foreground text-sm mb-6">{subtitle}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white border-2 border-border rounded-2xl overflow-hidden hover:border-coral hover:shadow-xl transition-all group"
          >
            <Link to={`/marketplace/${product.id}`}>
              <div className="aspect-[4/3] overflow-hidden bg-gray-100">
                <ImageWithFallback
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            </Link>
            <div className="p-4">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-coral uppercase tracking-wide">{product.category}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                  product.type === "serviço"
                    ? "bg-blue-50 text-blue-600"
                    : "bg-green-50 text-green-600"
                }`}>
                  {product.type === "serviço" ? "Serviço" : "Produto"}
                </span>
              </div>
              <Link to={`/marketplace/${product.id}`}>
                <h3 className="text-sm mb-2 line-clamp-2 group-hover:text-coral transition-colors">{product.name}</h3>
              </Link>
              <div className="text-xs text-muted-foreground mb-2 flex items-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-green-600"></div>
                {product.supplier}
              </div>
              <div className="flex items-center gap-1 mb-3 text-xs text-yellow-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-3 h-3 ${i < Math.floor(product.rating) ? "fill-yellow-500" : ""}`} />
                ))}
                <span className="text-muted-foreground ml-1">{product.rating}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="font-extrabold text-coral text-sm">{product.price.toLocaleString()} Kz</div>
                <button
                  onClick={() => addToCart({ id: product.id, name: product.name, price: product.price, supplier: product.supplier, image: product.image })}
                  className="w-8 h-8 bg-coral/10 hover:bg-coral hover:text-white text-coral rounded-full flex items-center justify-center transition-colors"
                >
                  <ShoppingCart className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

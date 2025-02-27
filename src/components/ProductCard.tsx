
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Star, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

export interface Product {
  id: number;
  name: string;
  brand: string;
  description: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  imageSrc: string;
  category: string;
  isNew?: boolean;
  isBestSeller?: boolean;
  isLimitedEdition?: boolean;
}

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const { toast } = useToast();
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };
  
  const handleFavoriteToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    setIsFavorite(!isFavorite);
    
    toast({
      title: isFavorite ? "Removed from favorites" : "Added to favorites",
      description: `${product.name} has been ${isFavorite ? 'removed from' : 'added to'} your favorites.`,
    });
  };
  
  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
    : 0;
  
  return (
    <Link 
      to={`/product/${product.id}`}
      className="group block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative product-card-shine product-hover-effect rounded-2xl overflow-hidden bg-white shadow-product hover:shadow-hover">
        <div className="relative aspect-[4/5] overflow-hidden">
          <img
            src={product.imageSrc}
            alt={product.name}
            className="w-full h-full object-cover transition-all duration-500 transform group-hover:scale-105"
          />
          
          {/* Product badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.isNew && (
              <Badge className="bg-primary text-white font-medium animate-pulse-soft">New</Badge>
            )}
            {product.isBestSeller && (
              <Badge className="bg-amber-500 text-white font-medium">Bestseller</Badge>
            )}
            {product.isLimitedEdition && (
              <Badge className="bg-purple-600 text-white font-medium">Limited Edition</Badge>
            )}
            {discountPercentage > 0 && (
              <Badge className="bg-green-600 text-white font-medium">{discountPercentage}% Off</Badge>
            )}
          </div>
          
          {/* Quick actions - visible on hover */}
          <div 
            className={`absolute inset-0 bg-black/0 flex items-end justify-center p-4 transition-all duration-300 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="w-full flex justify-between items-center gap-2">
              <Button 
                size="sm"
                onClick={handleAddToCart}
                className="flex-1 bg-white hover:bg-primary text-foreground hover:text-white transition-colors border border-border rounded-full shadow-md btn-hover-effect"
              >
                <ShoppingBag className="h-4 w-4 mr-1" />
                Add to Cart
              </Button>
              <Button
                size="icon"
                variant="outline"
                onClick={handleFavoriteToggle}
                className={`rounded-full h-9 w-9 transition-colors ${
                  isFavorite 
                    ? 'bg-primary/10 text-primary border-primary' 
                    : 'bg-white text-foreground hover:text-primary hover:bg-primary/10 border-border'
                }`}
              >
                <Heart 
                  className={`h-4 w-4 ${isFavorite ? 'fill-primary' : ''}`} 
                />
              </Button>
            </div>
          </div>
        </div>
        
        <div className="p-4">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-muted-foreground">{product.brand}</p>
              <h3 className="font-medium text-base mt-1 line-clamp-1">{product.name}</h3>
            </div>
          </div>
          
          <div className="flex items-center mt-2">
            <div className="flex items-center">
              <Star className="h-3.5 w-3.5 text-amber-500 fill-amber-500" />
              <span className="text-sm ml-1 text-foreground/80">{product.rating}</span>
            </div>
            <span className="text-xs text-muted-foreground ml-1">({product.reviewCount})</span>
          </div>
          
          <div className="mt-2 flex items-baseline">
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through mr-2">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
            <span className="text-base font-medium">
              ${product.price.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

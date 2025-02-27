
import { useState, useRef, useEffect } from 'react';
import { ProductCard, type Product } from './ProductCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FeaturedProductsProps {
  title: string;
  subtitle?: string;
  products: Product[];
}

export const FeaturedProducts = ({ title, subtitle, products }: FeaturedProductsProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);
  
  // Track scroll position and calculate max scroll
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    const updateScrollInfo = () => {
      setScrollPosition(container.scrollLeft);
      setMaxScroll(container.scrollWidth - container.clientWidth);
    };
    
    updateScrollInfo();
    container.addEventListener('scroll', updateScrollInfo);
    
    const resizeObserver = new ResizeObserver(updateScrollInfo);
    resizeObserver.observe(container);
    
    return () => {
      container.removeEventListener('scroll', updateScrollInfo);
      resizeObserver.disconnect();
    };
  }, [products]);
  
  const handleScroll = (direction: 'left' | 'right') => {
    const container = containerRef.current;
    if (!container) return;
    
    const scrollAmount = container.clientWidth * 0.8;
    const targetScroll = direction === 'left' 
      ? container.scrollLeft - scrollAmount 
      : container.scrollLeft + scrollAmount;
    
    container.scrollTo({
      left: targetScroll,
      behavior: 'smooth'
    });
  };
  
  return (
    <div className="relative">
      <div className="container mx-auto px-4 md:px-6 mb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end">
          <div>
            <h2 className="text-2xl md:text-3xl font-medium tracking-tight">{title}</h2>
            {subtitle && <p className="text-muted-foreground mt-1 max-w-xl">{subtitle}</p>}
          </div>
          
          <div className="flex items-center space-x-2 mt-4 md:mt-0">
            <Button
              variant="outline"
              size="icon"
              className={`rounded-full transition-opacity ${
                scrollPosition <= 5 ? 'opacity-50 cursor-not-allowed' : 'opacity-100'
              }`}
              onClick={() => handleScroll('left')}
              disabled={scrollPosition <= 5}
            >
              <ChevronLeft className="h-5 w-5" />
              <span className="sr-only">Scroll left</span>
            </Button>
            <Button
              variant="outline"
              size="icon"
              className={`rounded-full transition-opacity ${
                scrollPosition >= maxScroll - 5 ? 'opacity-50 cursor-not-allowed' : 'opacity-100'
              }`}
              onClick={() => handleScroll('right')}
              disabled={scrollPosition >= maxScroll - 5}
            >
              <ChevronRight className="h-5 w-5" />
              <span className="sr-only">Scroll right</span>
            </Button>
          </div>
        </div>
      </div>
      
      <div 
        ref={containerRef}
        className="pb-1 overflow-x-auto no-scrollbar snap-x snap-mandatory scroll-pl-6"
        style={{ scrollbarWidth: 'none' }}
      >
        <div className="pl-4 md:pl-6 flex space-x-4 md:space-x-6 min-w-full w-max">
          {products.map((product, index) => (
            <div 
              key={product.id} 
              className="snap-start snap-always w-64 sm:w-72 md:w-80 flex-shrink-0 transition-opacity duration-300"
              style={{ 
                transitionDelay: `${index * 50}ms`, 
                animation: `fade-in 0.6s ease-out ${index * 100}ms both` 
              }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

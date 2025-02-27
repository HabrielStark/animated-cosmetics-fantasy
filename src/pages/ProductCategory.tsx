import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/Navbar';
import { ProductCard, type Product } from '@/components/ProductCard';

// Import product data from Index page
// This should ideally come from an API or database
const allProducts: Product[] = [
  {
    id: 1,
    name: "Radiance Renewal Serum",
    brand: "Lumière",
    description: "A powerful serum that brightens and revitalizes skin for a radiant complexion.",
    price: 65,
    rating: 4.8,
    reviewCount: 124,
    imageSrc: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c2VydW18ZW58MHx8MHx8fDA%3D",
    category: "skincare",
    isNew: true
  },
  {
    id: 2,
    name: "Hydra-Glow Cream",
    brand: "Lumière",
    description: "Ultra-hydrating cream that gives your skin a natural, dewy glow.",
    price: 48,
    rating: 4.7,
    reviewCount: 89,
    imageSrc: "https://images.unsplash.com/photo-1631730359585-38a4935cbec4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZmFjZSUyMGNyZWFtfGVufDB8fDB8fHww",
    category: "skincare",
    isNew: true
  },
  {
    id: 3,
    name: "Rose Petal Mist",
    brand: "Lumière",
    description: "Refreshing facial mist with real rose petals to hydrate and tone.",
    price: 28,
    rating: 4.6,
    reviewCount: 75,
    imageSrc: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzB8fGZhY2UlMjBtaXN0fGVufDB8fDB8fHww",
    category: "skincare",
    isNew: true
  },
  {
    id: 4,
    name: "Silk Foundation SPF 30",
    brand: "Lumière",
    description: "Lightweight foundation with sun protection for a flawless finish.",
    price: 42,
    rating: 4.5,
    reviewCount: 63,
    imageSrc: "https://images.unsplash.com/photo-1631214548051-37e9a90ba244?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGZvdW5kYXRpb24lMjBtYWtldXB8ZW58MHx8MHx8fDA%3D",
    category: "makeup",
    isNew: true
  },
  {
    id: 5,
    name: "Velvet Lip Tint",
    brand: "Lumière",
    description: "Long-lasting lip tint that hydrates while providing rich color.",
    price: 24,
    rating: 4.9,
    reviewCount: 97,
    imageSrc: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGxpcHN0aWNrfGVufDB8fDB8fHww",
    category: "makeup",
    isNew: true
  },
  {
    id: 11,
    name: "Citrus Bloom Eau de Parfum",
    brand: "Lumière",
    description: "Refreshing citrus fragrance with notes of bergamot, neroli, and white musk.",
    price: 85,
    rating: 4.9,
    reviewCount: 212,
    imageSrc: "https://images.unsplash.com/photo-1541108564883-bde0e9108cc2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGVyZnVtZXxlbnwwfHwwfHx8MA%3D%3D",
    category: "fragrance",
    isBestSeller: true
  },
  {
    id: 14,
    name: "French Lavender Bath Collection",
    brand: "Lumière",
    description: "Limited edition set with lavender bath salts, oil, and candle.",
    price: 78,
    originalPrice: 95,
    rating: 4.8,
    reviewCount: 64,
    imageSrc: "https://images.unsplash.com/photo-1563165616-0e26c161672e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8YmF0aCUyMHNhbHRzfGVufDB8fDB8fHww",
    category: "bath-body",
    isLimitedEdition: true
  }
];

const categoryTitles = {
  'skincare': 'Skincare',
  'makeup': 'Makeup',
  'fragrance': 'Fragrance',
  'bath-body': 'Bath & Body'
};

const ProductCategory = () => {
  const { category } = useParams<{ category: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const filteredProducts = allProducts.filter(
        product => product.category === category
      );
      setProducts(filteredProducts);
      setIsLoaded(true);
    }, 500);
  }, [category]);

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse">
          <div className="h-6 w-32 bg-muted rounded mb-4"></div>
          <div className="h-4 w-24 bg-muted rounded"></div>
        </div>
      </div>
    );
  }

  if (!category || !categoryTitles[category as keyof typeof categoryTitles]) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h1 className="text-2xl font-medium mb-4">Category Not Found</h1>
        <p className="text-muted-foreground mb-6">The category you're looking for doesn't exist.</p>
        <Link to="/">
          <Button>Return to Homepage</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen font-sans">
      <Navbar />
      
      <div className="container mx-auto px-4 md:px-6 py-16 md:py-24">
        <div className="mb-8">
          <nav className="flex items-center text-sm mb-4">
            <Link 
              to="/" 
              className="text-muted-foreground hover:text-foreground transition-colors flex items-center"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Home
            </Link>
          </nav>
          
          <h1 className="text-3xl md:text-4xl font-medium tracking-tight">
            {categoryTitles[category as keyof typeof categoryTitles]}
          </h1>
          <p className="text-muted-foreground mt-2">
            Discover our collection of {categoryTitles[category as keyof typeof categoryTitles].toLowerCase()} products
          </p>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
        
        {products.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              No products found in this category.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCategory; 
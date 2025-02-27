
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Star, Gift, ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Navbar } from '@/components/Navbar';
import { FeaturedProducts } from '@/components/FeaturedProducts';
import { Product } from '@/components/ProductCard';

const newArrivals: Product[] = [
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
    id: 6,
    name: "Rose Quartz Roller",
    brand: "Lumière",
    description: "Facial roller made of real rose quartz to reduce puffiness and promote circulation.",
    price: 32,
    rating: 4.7,
    reviewCount: 54,
    imageSrc: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZmFjZSUyMHJvbGxlcnxlbnwwfHwwfHx8MA%3D%3D",
    category: "tools",
    isNew: true
  }
];

const bestSellers: Product[] = [
  {
    id: 7,
    name: "Vitamin C Brightening Serum",
    brand: "Lumière",
    description: "Potent serum with 15% vitamin C to brighten skin and reduce dark spots.",
    price: 58,
    originalPrice: 72,
    rating: 4.9,
    reviewCount: 234,
    imageSrc: "https://images.unsplash.com/photo-1615397349754-cfa2066a298e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHNlcnVtfGVufDB8fDB8fHww",
    category: "skincare",
    isBestSeller: true
  },
  {
    id: 8,
    name: "Hyaluronic Acid Moisture Boost",
    brand: "Lumière",
    description: "Intensive hydration with multi-weight hyaluronic acid for plump, dewy skin.",
    price: 52,
    rating: 4.8,
    reviewCount: 189,
    imageSrc: "https://images.unsplash.com/photo-1598662957563-ee4965d407d6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aHlhbHVyb25pYyUyMGFjaWR8ZW58MHx8MHx8fDA%3D",
    category: "skincare",
    isBestSeller: true
  },
  {
    id: 9,
    name: "Satin Finish Powder",
    brand: "Lumière",
    description: "Finely milled setting powder for a smooth, airbrushed finish.",
    price: 38,
    rating: 4.7,
    reviewCount: 143,
    imageSrc: "https://images.unsplash.com/photo-1599733594230-5cc2e14a2486?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZmFjZSUyMHBvd2RlcnxlbnwwfHwwfHx8MA%3D%3D",
    category: "makeup",
    isBestSeller: true
  },
  {
    id: 10,
    name: "Silk Effect Mascara",
    brand: "Lumière",
    description: "Volumizing and lengthening mascara for dramatic, feathery lashes.",
    price: 26,
    originalPrice: 32,
    rating: 4.8,
    reviewCount: 176,
    imageSrc: "https://images.unsplash.com/photo-1615225913371-9dbf1e8e1aae?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fG1hc2NhcmF8ZW58MHx8MHx8fDA%3D",
    category: "makeup",
    isBestSeller: true
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
    id: 12,
    name: "Overnight Repair Mask",
    brand: "Lumière",
    description: "Intensive overnight treatment to repair and rejuvenate skin while you sleep.",
    price: 48,
    rating: 4.7,
    reviewCount: 98,
    imageSrc: "https://images.unsplash.com/photo-1599907255381-a16bc66a4989?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8ZmFjZSUyMG1hc2t8ZW58MHx8MHx8fDA%3D",
    category: "skincare",
    isBestSeller: true
  }
];

const limitedEdition: Product[] = [
  {
    id: 13,
    name: "Rose Gold Illuminating Palette",
    brand: "Lumière",
    description: "Limited edition highlighter and blush palette with rose gold packaging.",
    price: 65,
    rating: 4.9,
    reviewCount: 87,
    imageSrc: "https://images.unsplash.com/photo-1625093742435-6fa192b6fb10?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fG1ha2V1cCUyMHBhbGV0dGV8ZW58MHx8MHx8fDA%3D",
    category: "makeup",
    isLimitedEdition: true
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
    category: "bath",
    isLimitedEdition: true
  },
  {
    id: 15,
    name: "Celestial Glow Body Oil",
    brand: "Lumière",
    description: "Shimmering body oil with gold flecks for a sun-kissed glow.",
    price: 52,
    rating: 4.7,
    reviewCount: 43,
    imageSrc: "https://images.unsplash.com/photo-1604177091639-c1bb8451e3be?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Ym9keSUyMG9pbHxlbnwwfHwwfHx8MA%3D%3D",
    category: "body",
    isLimitedEdition: true
  },
  {
    id: 16,
    name: "Midnight Jasmine Perfume",
    brand: "Lumière",
    description: "Intoxicating jasmine fragrance with notes of vanilla and amber.",
    price: 95,
    rating: 4.9,
    reviewCount: 76,
    imageSrc: "https://images.unsplash.com/photo-1615194783322-d96304d60bad?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHBlcmZ1bWV8ZW58MHx8MHx8fDA%3D",
    category: "fragrance",
    isLimitedEdition: true
  }
];

const Homepage = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
  const heroVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.15
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1.0] }
    }
  };
  
  return (
    <div className={`min-h-screen font-sans transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-28 md:pt-32 pb-16 md:pb-24 overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 pt-6">
          <motion.div 
            className="flex flex-col md:flex-row items-center gap-8 md:gap-16"
            variants={heroVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="flex-1 max-w-xl">
              <motion.div variants={itemVariants}>
                <span className="inline-block px-3 py-1 mb-4 text-xs font-medium rounded-full bg-primary/10 text-primary animate-pulse-soft">
                  New Collection
                </span>
              </motion.div>
              
              <motion.h1 
                className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight mb-4"
                variants={itemVariants}
              >
                Reveal Your Natural Beauty
              </motion.h1>
              
              <motion.p 
                className="text-lg text-muted-foreground mb-6 md:mb-8"
                variants={itemVariants}
              >
                Discover luxury skincare and beauty products crafted with the finest ingredients for radiant, healthy skin.
              </motion.p>
              
              <motion.div className="flex flex-wrap gap-4" variants={itemVariants}>
                <Link to="/products/skincare">
                  <Button 
                    size="lg" 
                    className="rounded-full group flex items-center"
                  >
                    Shop Collection
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                <Link to="/about">
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="rounded-full"
                  >
                    Our Philosophy
                  </Button>
                </Link>
              </motion.div>
            </div>
            
            <motion.div 
              className="flex-1 relative max-w-md mx-auto md:mx-0"
              variants={itemVariants}
            >
              <div className="relative aspect-square rounded-3xl overflow-hidden shadow-xl">
                <img 
                  src="https://images.unsplash.com/photo-1680173086559-7ad3428b988c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjd8fGx1eHVyeSUyMHNraW5jYXJlfGVufDB8fDB8fHww" 
                  alt="Luxury skincare products" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
              
              <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-lg p-4 max-w-[200px] animate-float">
                <div className="flex items-start gap-2">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <Sparkles className="h-5 w-5" />
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Clean Beauty</p>
                    <p className="text-xs text-muted-foreground">100% natural ingredients</p>
                  </div>
                </div>
              </div>
              
              <div className="absolute -top-6 -left-6 bg-white rounded-2xl shadow-lg p-4 max-w-[200px] animate-float" style={{ animationDelay: '1s' }}>
                <div className="flex items-start gap-2">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <Star className="h-5 w-5" />
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Top Rated</p>
                    <p className="text-xs text-muted-foreground">4.9/5 from 2,000+ reviews</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
      
      {/* Featured Categories */}
      <section className="py-16 bg-secondary/50">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-2xl md:text-3xl font-medium tracking-tight text-center mb-10">Shop by Category</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              {
                name: "Skincare",
                image: "https://images.unsplash.com/photo-1662036286468-96fefa8c5725?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDF8fHNraW5jYXJlfGVufDB8fDB8fHww",
                link: "/products/skincare"
              },
              {
                name: "Makeup",
                image: "https://images.unsplash.com/photo-1627384113972-f4c9896257df?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzR8fG1ha2V1cHxlbnwwfHwwfHx8MA%3D%3D",
                link: "/products/makeup"
              },
              {
                name: "Fragrance",
                image: "https://images.unsplash.com/photo-1617897903246-719242758050?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjF8fHBlcmZ1bWV8ZW58MHx8MHx8fDA%3D",
                link: "/products/fragrance"
              },
              {
                name: "Bath & Body",
                image: "https://images.unsplash.com/photo-1616118132534-381148898bb4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmF0aCUyMHByb2R1Y3RzfGVufDB8fDB8fHww",
                link: "/products/bath-body"
              }
            ].map((category, index) => (
              <Link 
                key={category.name} 
                to={category.link}
                className="group block"
                style={{ 
                  animation: `fade-in 0.6s ease-out ${index * 100 + 200}ms both` 
                }}
              >
                <div className="relative rounded-2xl overflow-hidden aspect-square bg-white shadow-product product-hover-effect hover:shadow-hover">
                  <img 
                    src={category.image} 
                    alt={category.name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                    <div className="p-4 md:p-6 w-full">
                      <h3 className="text-lg md:text-xl font-medium text-white mb-1">{category.name}</h3>
                      <p className="text-white/80 text-sm flex items-center group-hover:text-white">
                        Shop Now
                        <ArrowRight className="ml-1 h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* New Arrivals Section */}
      <section className="py-16">
        <FeaturedProducts 
          title="New Arrivals" 
          subtitle="Discover our latest products to enhance your beauty routine."
          products={newArrivals}
        />
      </section>
      
      {/* Featured Banner */}
      <section className="py-16 bg-cosmetic-cream">
        <div className="container mx-auto px-4 md:px-6">
          <div className="rounded-3xl overflow-hidden relative">
            <div className="relative aspect-[21/9] md:aspect-[3/1]">
              <img 
                src="https://images.unsplash.com/photo-1649020973735-0f8e54fbee15?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjR8fGx1eHVyeSUyMHNraW5jYXJlfGVufDB8fDB8fHww" 
                alt="Luxury skincare collection" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent flex items-center">
                <div className="p-6 md:p-12 max-w-md" style={{ animation: 'fade-in 1s ease-out both' }}>
                  <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-white mb-4">Summer Beauty Essentials</h2>
                  <p className="text-white/90 mb-6">Discover our curated collection of summer must-haves to keep your skin glowing and protected.</p>
                  <Link to="/products/summer-collection">
                    <Button 
                      className="rounded-full group flex items-center"
                    >
                      Shop the Collection
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Bestsellers Section */}
      <section className="py-16">
        <FeaturedProducts 
          title="Bestsellers" 
          subtitle="Our most popular products loved by customers worldwide."
          products={bestSellers}
        />
      </section>
      
      {/* Value Propositions */}
      <section className="py-16 bg-secondary/50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Sparkles className="h-8 w-8 text-primary" />,
                title: "Clean Beauty",
                description: "All products are formulated without harmful ingredients, ensuring they're safe for you and the environment."
              },
              {
                icon: <Gift className="h-8 w-8 text-primary" />,
                title: "Luxurious Experience",
                description: "From formulation to packaging, every detail is designed to elevate your beauty routine."
              },
              {
                icon: <ShoppingBag className="h-8 w-8 text-primary" />,
                title: "Free Shipping",
                description: "Enjoy complimentary shipping on orders over $50, with easy returns within 30 days."
              }
            ].map((item, index) => (
              <div 
                key={index} 
                className="text-center p-6 rounded-2xl bg-white shadow-md hover:shadow-lg transition-shadow duration-300"
                style={{ 
                  animation: `fade-in 0.6s ease-out ${index * 100 + 200}ms both` 
                }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                  {item.icon}
                </div>
                <h3 className="text-xl font-medium mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Limited Edition Section */}
      <section className="py-16">
        <FeaturedProducts 
          title="Limited Edition" 
          subtitle="Exclusive collections available for a limited time only."
          products={limitedEdition}
        />
      </section>
      
      {/* Newsletter */}
      <section className="py-16 bg-primary/5">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-medium tracking-tight mb-4">Join Our Community</h2>
            <p className="text-muted-foreground mb-6">
              Subscribe to our newsletter for exclusive offers, beauty tips, and first access to new products.
            </p>
            <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-1 rounded-full px-4 py-2 border border-border focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
              <Button className="rounded-full whitespace-nowrap">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-16 bg-secondary">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-medium mb-4">LUMIÈRE</h3>
              <p className="text-muted-foreground mb-4">
                Luxury skincare and beauty products crafted with the finest ingredients for radiant, healthy skin.
              </p>
            </div>
            
            <div>
              <h4 className="font-medium mb-4">Shop</h4>
              <ul className="space-y-2">
                <li><Link to="/products/skincare" className="text-muted-foreground hover:text-primary transition-colors">Skincare</Link></li>
                <li><Link to="/products/makeup" className="text-muted-foreground hover:text-primary transition-colors">Makeup</Link></li>
                <li><Link to="/products/fragrance" className="text-muted-foreground hover:text-primary transition-colors">Fragrance</Link></li>
                <li><Link to="/products/bath-body" className="text-muted-foreground hover:text-primary transition-colors">Bath & Body</Link></li>
                <li><Link to="/products/tools" className="text-muted-foreground hover:text-primary transition-colors">Tools & Accessories</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-4">About</h4>
              <ul className="space-y-2">
                <li><Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">Our Story</Link></li>
                <li><Link to="/ingredients" className="text-muted-foreground hover:text-primary transition-colors">Ingredients</Link></li>
                <li><Link to="/sustainability" className="text-muted-foreground hover:text-primary transition-colors">Sustainability</Link></li>
                <li><Link to="/blog" className="text-muted-foreground hover:text-primary transition-colors">Blog</Link></li>
                <li><Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">Contact Us</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-4">Customer Service</h4>
              <ul className="space-y-2">
                <li><Link to="/shipping" className="text-muted-foreground hover:text-primary transition-colors">Shipping & Returns</Link></li>
                <li><Link to="/faq" className="text-muted-foreground hover:text-primary transition-colors">FAQs</Link></li>
                <li><Link to="/track-order" className="text-muted-foreground hover:text-primary transition-colors">Track Order</Link></li>
                <li><Link to="/privacy" className="text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link></li>
                <li><Link to="/terms" className="text-muted-foreground hover:text-primary transition-colors">Terms & Conditions</Link></li>
              </ul>
            </div>
          </div>
          
          <Separator className="my-8" />
          
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground mb-4 md:mb-0">
              © {new Date().getFullYear()} LUMIÈRE. All rights reserved.
            </p>
            <div className="flex items-center space-x-4">
              <Link to="#" className="text-muted-foreground hover:text-primary transition-colors">
                <span className="sr-only">Instagram</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </Link>
              <Link to="#" className="text-muted-foreground hover:text-primary transition-colors">
                <span className="sr-only">Twitter</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-twitter"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
              </Link>
              <Link to="#" className="text-muted-foreground hover:text-primary transition-colors">
                <span className="sr-only">Facebook</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-facebook"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </Link>
              <Link to="#" className="text-muted-foreground hover:text-primary transition-colors">
                <span className="sr-only">Pinterest</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 12a4 4 0 1 0 8 0 4 4 0 1 0-8 0"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="M20 12h2"/><path d="M2 12h2"/><path d="m19.8 5.2-1.4 1.4"/><path d="m5.6 19.4-1.4 1.4"/><path d="m19.8 18.8-1.4-1.4"/><path d="m5.6 4.6-1.4 1.4"/></svg>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;

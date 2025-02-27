import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Heart, ShoppingBag, Star, ChevronRight, ChevronDown, ChevronUp, ArrowLeft, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Navbar } from '@/components/Navbar';
import { FeaturedProducts } from '@/components/FeaturedProducts';
import { Product } from '@/components/ProductCard';
import { useToast } from '@/hooks/use-toast';

const productData: { [key: number]: Product } = {
  1: {
    id: 1,
    name: "Radiance Renewal Serum",
    brand: "Lumière",
    description: "A powerful serum that brightens and revitalizes skin for a radiant complexion. Formulated with Vitamin C, Niacinamide, and Hyaluronic Acid to target dullness, uneven skin tone, and dehydration. Use morning and night for best results.",
    price: 65,
    rating: 4.8,
    reviewCount: 124,
    imageSrc: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c2VydW18ZW58MHx8MHx8fDA%3D",
    category: "skincare",
    isNew: true
  },
  7: {
    id: 7,
    name: "Vitamin C Brightening Serum",
    brand: "Lumière",
    description: "Potent serum with 15% vitamin C to brighten skin and reduce dark spots. This advanced formula combines pure Vitamin C (L-ascorbic acid) with ferulic acid and vitamin E to enhance effectiveness and stability. Perfect for addressing hyperpigmentation, dullness, and supporting collagen production.",
    price: 58,
    originalPrice: 72,
    rating: 4.9,
    reviewCount: 234,
    imageSrc: "https://images.unsplash.com/photo-1615397349754-cfa2066a298e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHNlcnVtfGVufDB8fDB8fHww",
    category: "skincare",
    isBestSeller: true
  }
};

const recommendedProducts: Product[] = [
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
  }
];

const reviews = [
  {
    id: 1,
    author: "Sophie L.",
    date: "2 months ago",
    rating: 5,
    title: "Amazing results!",
    content: "I've been using this serum for about a month now and the difference in my skin is incredible. My dark spots have faded noticeably, and my overall complexion is much brighter. Will definitely repurchase!",
    helpful: 24,
    verified: true
  },
  {
    id: 2,
    author: "James M.",
    date: "3 months ago",
    rating: 4,
    title: "Good but expensive",
    content: "This product definitely works - my skin looks more radiant and my fine lines seem reduced. It absorbs quickly and doesn't feel greasy. My only complaint is the price, but I suppose you get what you pay for with skincare.",
    helpful: 18,
    verified: true
  },
  {
    id: 3,
    author: "Emma T.",
    date: "1 month ago",
    rating: 5,
    title: "Holy grail product!",
    content: "After trying countless serums, I've finally found the one! This has transformed my skin in just weeks. The texture is perfect - lightweight but hydrating. My skin tone is more even, and I've received so many compliments. Worth every penny!",
    helpful: 35,
    verified: true
  }
];

interface Accordion {
  title: string;
  content: React.ReactNode;
}

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [expandedAccordion, setExpandedAccordion] = useState<number | null>(0);
  const { toast } = useToast();
  
  useEffect(() => {
    setTimeout(() => {
      if (id && productData[parseInt(id)]) {
        setProduct(productData[parseInt(id)]);
      } else {
        setProduct(productData[1]);
      }
      setIsLoaded(true);
    }, 500);
  }, [id]);
  
  const handleQuantityChange = (increment: boolean) => {
    setQuantity(prev => {
      const newQuantity = increment ? prev + 1 : prev - 1;
      return Math.max(1, newQuantity);
    });
  };
  
  const handleFavoriteToggle = () => {
    setIsFavorite(!isFavorite);
    
    toast({
      title: isFavorite ? "Removed from wishlist" : "Added to wishlist",
      description: `${product?.name} has been ${isFavorite ? 'removed from' : 'added to'} your wishlist.`,
    });
  };
  
  const handleAddToCart = () => {
    toast({
      title: "Added to cart",
      description: `${quantity} × ${product?.name} has been added to your cart.`,
    });
  };
  
  const accordionItems: Accordion[] = [
    {
      title: "Description",
      content: (
        <div className="prose prose-sm max-w-none text-muted-foreground">
          <p className="mb-4">{product?.description}</p>
          <p>Our signature formula combines powerful actives with soothing botanicals to deliver visible results without irritation.</p>
        </div>
      )
    },
    {
      title: "Ingredients",
      content: (
        <div className="prose prose-sm max-w-none text-muted-foreground">
          <p className="mb-4">Aqua, Niacinamide, Glycerin, Pentylene Glycol, Hydroxyethyl Acrylate/Sodium Acryloyldimethyl Taurate Copolymer, Ascorbic Acid, Sodium Hyaluronate, Panthenol, Tocopherol, Ferulic Acid, Rosa Damascena Flower Water, Centella Asiatica Extract, Chamomilla Recutita Flower Extract, Aloe Barbadensis Leaf Juice, Sodium PCA, Allantoin, Dipotassium Glycyrrhizate, Sodium Citrate, Citric Acid, Disodium EDTA, Phenoxyethanol, Ethylhexylglycerin.</p>
          <p>Free from: Parabens, Sulfates, Phthalates, Mineral Oil, Artificial Fragrances, Artificial Colors.</p>
        </div>
      )
    },
    {
      title: "How to Use",
      content: (
        <div className="prose prose-sm max-w-none text-muted-foreground">
          <p className="mb-4"><strong>Morning and Evening:</strong></p>
          <ol className="space-y-2">
            <li>Apply to clean, dry skin after cleansing and toning.</li>
            <li>Dispense 2-3 drops onto fingertips.</li>
            <li>Gently pat and press into face and neck, avoiding the eye area.</li>
            <li>Follow with moisturizer and SPF (morning routine).</li>
          </ol>
        </div>
      )
    }
  ];
  
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
  
  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h1 className="text-2xl font-medium mb-4">Product Not Found</h1>
        <p className="text-muted-foreground mb-6">The product you're looking for doesn't exist or has been removed.</p>
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
        <div className="mb-8 animate-fade-in">
          <nav className="flex items-center text-sm">
            <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">Home</Link>
            <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground" />
            <Link to={`/products/${product.category}`} className="text-muted-foreground hover:text-foreground transition-colors capitalize">{product.category}</Link>
            <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground" />
            <span className="truncate max-w-[200px]">{product.name}</span>
          </nav>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16">
          <div className="space-y-4 animate-fade-in">
            <div className="aspect-square bg-white rounded-2xl overflow-hidden shadow-product hover:shadow-hover transition-shadow duration-300">
              <motion.img 
                src={product.imageSrc} 
                alt={product.name} 
                className="w-full h-full object-cover"
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {[1, 2, 3, 4].map((_, idx) => (
                <button 
                  key={idx} 
                  className={`aspect-square rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow duration-300 border-2 ${idx === 0 ? 'border-primary' : 'border-transparent'}`}
                >
                  <img 
                    src={product.imageSrc} 
                    alt={`${product.name} view ${idx + 1}`} 
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
          
          <div className="animate-fade-in" style={{ animationDelay: '100ms' }}>
            <div className="flex flex-col h-full">
              <div className="mb-2">
                {product.isNew && (
                  <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary mb-2">
                    New
                  </span>
                )}
                {product.isBestSeller && (
                  <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-amber-500/10 text-amber-500 mb-2 ml-2">
                    Bestseller
                  </span>
                )}
                {product.isLimitedEdition && (
                  <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-purple-600/10 text-purple-600 mb-2 ml-2">
                    Limited Edition
                  </span>
                )}
              </div>
              
              <p className="text-lg text-muted-foreground">{product.brand}</p>
              <h1 className="text-3xl md:text-4xl font-medium tracking-tight mt-1 mb-4">{product.name}</h1>
              
              <div className="flex items-center mb-4">
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star 
                      key={star}
                      className={`h-4 w-4 ${star <= Math.round(product.rating) ? 'text-amber-500 fill-amber-500' : 'text-muted-foreground'}`} 
                    />
                  ))}
                  <span className="ml-2 text-sm font-medium">{product.rating}</span>
                </div>
                <span className="mx-2 text-muted-foreground">•</span>
                <span className="text-sm text-muted-foreground">{product.reviewCount} reviews</span>
              </div>
              
              <div className="flex items-baseline mb-6">
                {product.originalPrice && (
                  <span className="text-lg text-muted-foreground line-through mr-2">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
                <span className="text-2xl md:text-3xl font-medium">
                  ${product.price.toFixed(2)}
                </span>
                
                {product.originalPrice && (
                  <span className="ml-3 text-sm font-medium text-green-600 bg-green-100 px-2 py-0.5 rounded">
                    Save ${(product.originalPrice - product.price).toFixed(2)}
                  </span>
                )}
              </div>
              
              <p className="text-muted-foreground mb-6 max-w-md">
                {product.description.split('.')[0]}.
              </p>
              
              <div className="mb-6">
                <label htmlFor="quantity" className="block text-sm font-medium mb-2">
                  Quantity
                </label>
                <div className="flex items-center max-w-[140px]">
                  <button 
                    type="button"
                    onClick={() => handleQuantityChange(false)}
                    disabled={quantity <= 1}
                    className="w-10 h-10 flex items-center justify-center border rounded-l-lg hover:bg-secondary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    -
                  </button>
                  <input 
                    type="number" 
                    id="quantity" 
                    value={quantity}
                    readOnly
                    className="w-16 h-10 border-y text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                  <button 
                    type="button"
                    onClick={() => handleQuantityChange(true)}
                    className="w-10 h-10 flex items-center justify-center border rounded-r-lg hover:bg-secondary transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row gap-4 mb-8">
                <Button 
                  size="lg" 
                  className="flex-1 rounded-full flex items-center justify-center group"
                  onClick={handleAddToCart}
                >
                  <ShoppingBag className="mr-2 h-5 w-5" />
                  Add to Cart
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className={`h-12 w-12 rounded-full transition-colors ${
                    isFavorite 
                      ? 'bg-primary/10 text-primary border-primary' 
                      : 'bg-background text-foreground hover:text-primary hover:bg-primary/10 border-border'
                  }`}
                  onClick={handleFavoriteToggle}
                >
                  <Heart 
                    className={`h-5 w-5 ${isFavorite ? 'fill-primary' : ''}`} 
                  />
                  <span className="sr-only">Add to wishlist</span>
                </Button>
              </div>
              
              <div className="space-y-3 mb-8">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <Check className="h-4 w-4 text-green-600" />
                  </div>
                  <p className="ml-2 text-sm text-muted-foreground">Free shipping for orders over $50</p>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <Check className="h-4 w-4 text-green-600" />
                  </div>
                  <p className="ml-2 text-sm text-muted-foreground">In stock, ready to ship</p>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <Check className="h-4 w-4 text-green-600" />
                  </div>
                  <p className="ml-2 text-sm text-muted-foreground">30-day satisfaction guarantee</p>
                </div>
              </div>
              
              <div className="border rounded-lg overflow-hidden mt-auto">
                {accordionItems.map((item, index) => (
                  <div key={index} className="border-b last:border-b-0">
                    <button
                      className="flex items-center justify-between w-full p-4 text-left font-medium hover:bg-secondary/50 transition-colors"
                      onClick={() => setExpandedAccordion(expandedAccordion === index ? null : index)}
                    >
                      <span>{item.title}</span>
                      {expandedAccordion === index ? (
                        <ChevronUp className="h-5 w-5" />
                      ) : (
                        <ChevronDown className="h-5 w-5" />
                      )}
                    </button>
                    <div 
                      className={`overflow-hidden transition-all duration-300 ease-in-out ${
                        expandedAccordion === index ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
                      }`}
                    >
                      <div className="p-4 pt-0">{item.content}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-16 md:mt-24 animate-fade-in">
          <Tabs defaultValue="reviews" className="w-full">
            <TabsList className="w-full justify-start border-b rounded-none bg-transparent h-auto p-0">
              <TabsTrigger 
                value="reviews" 
                className="rounded-none py-2.5 data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none"
              >
                Reviews ({product.reviewCount})
              </TabsTrigger>
              <TabsTrigger 
                value="shipping" 
                className="rounded-none py-2.5 data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none"
              >
                Shipping & Returns
              </TabsTrigger>
              <TabsTrigger 
                value="faq" 
                className="rounded-none py-2.5 data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none"
              >
                FAQs
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="reviews" className="pt-6">
              <div className="space-y-8">
                <div className="flex flex-col md:flex-row justify-between md:items-center mb-8">
                  <div>
                    <h3 className="text-xl font-medium">Customer Reviews</h3>
                    <div className="flex items-center mt-2">
                      <div className="flex items-center">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star 
                            key={star}
                            className={`h-5 w-5 ${star <= Math.round(product.rating) ? 'text-amber-500 fill-amber-500' : 'text-muted-foreground'}`} 
                          />
                        ))}
                      </div>
                      <span className="ml-2 text-lg font-medium">{product.rating}</span>
                      <span className="mx-2 text-muted-foreground">•</span>
                      <span className="text-muted-foreground">{product.reviewCount} reviews</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 md:mt-0">
                    <Button className="rounded-full">Write a Review</Button>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-6">
                  {reviews.map((review) => (
                    <div key={review.id} className="p-6 border rounded-lg bg-white">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <div className="flex items-center mb-1">
                            <h4 className="font-medium">{review.author}</h4>
                            {review.verified && (
                              <span className="ml-2 text-xs text-green-600 bg-green-100 px-2 py-0.5 rounded-full">
                                Verified Purchase
                              </span>
                            )}
                          </div>
                          <span className="text-sm text-muted-foreground">{review.date}</span>
                        </div>
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star 
                              key={star}
                              className={`h-4 w-4 ${star <= review.rating ? 'text-amber-500 fill-amber-500' : 'text-muted-foreground'}`} 
                            />
                          ))}
                        </div>
                      </div>
                      <h5 className="font-medium mb-2">{review.title}</h5>
                      <p className="text-muted-foreground mb-4">{review.content}</p>
                      <div className="flex items-center justify-between">
                        <Button variant="outline" size="sm" className="text-xs h-8">
                          Helpful ({review.helpful})
                        </Button>
                        <Button variant="ghost" size="sm" className="text-xs h-8">
                          Report
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="flex justify-center">
                  <Button variant="outline" className="rounded-full">
                    Load More Reviews
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="shipping" className="pt-6">
              <div className="space-y-6 max-w-3xl">
                <div>
                  <h3 className="text-xl font-medium mb-4">Shipping Information</h3>
                  <p className="text-muted-foreground mb-4">
                    We offer a variety of shipping options to meet your needs. All orders are processed within 1-2 business days.
                  </p>
                  <ul className="space-y-2 text-muted-foreground list-disc pl-6">
                    <li>Free Standard Shipping on orders over $50 (5-7 business days)</li>
                    <li>Express Shipping: $9.95 (2-3 business days)</li>
                    <li>Next Day Delivery: $19.95 (order before 2pm)</li>
                    <li>International Shipping: Available to select countries, rates calculated at checkout</li>
                  </ul>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-xl font-medium mb-4">Return Policy</h3>
                  <p className="text-muted-foreground mb-4">
                    We want you to be completely satisfied with your purchase. If for any reason you're not happy with your order, we accept returns within 30 days of delivery.
                  </p>
                  <ul className="space-y-2 text-muted-foreground list-disc pl-6">
                    <li>Items must be unused and in original packaging</li>
                    <li>Return shipping is free for orders within the United States</li>
                    <li>Refunds are processed within 5-7 business days after we receive your return</li>
                    <li>For hygiene reasons, certain items like makeup brushes, lip products, and opened skincare are final sale</li>
                  </ul>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="faq" className="pt-6">
              <div className="space-y-6 max-w-3xl">
                <h3 className="text-xl font-medium mb-4">Frequently Asked Questions</h3>
                
                {[
                  {
                    question: "Is this product suitable for sensitive skin?",
                    answer: "Yes, our formula is dermatologist-tested and developed for all skin types, including sensitive skin. However, as with any skincare product, we recommend doing a patch test first if you have particularly reactive skin."
                  },
                  {
                    question: "How long does one bottle typically last?",
                    answer: "One bottle (30ml) typically lasts 2-3 months with regular daily use, applying the recommended amount of 2-3 drops for each application, both morning and evening."
                  },
                  {
                    question: "Can I use this product with other serums or treatments?",
                    answer: "Yes, this product is formulated to work well within a skincare routine. We recommend applying from thinnest to thickest consistency. If using with other active ingredients like retinol or exfoliating acids, you may want to alternate usage or consult with a dermatologist."
                  },
                  {
                    question: "Are your products cruelty-free and vegan?",
                    answer: "Yes, all of our products are cruelty-free and never tested on animals. This specific product is also vegan and does not contain any animal-derived ingredients."
                  },
                  {
                    question: "What is the shelf life of this product?",
                    answer: "The product has a shelf life of 12 months unopened. Once opened, we recommend using it within 6 months for optimal effectiveness. The packaging is designed to protect the active ingredients from light and air."
                  }
                ].map((faq, index) => (
                  <div key={index} className="border rounded-lg overflow-hidden">
                    <button
                      className="flex items-center justify-between w-full p-4 text-left font-medium hover:bg-secondary/50 transition-colors"
                      onClick={() => setExpandedAccordion(expandedAccordion === index + 10 ? null : index + 10)}
                    >
                      <span>{faq.question}</span>
                      {expandedAccordion === index + 10 ? (
                        <ChevronUp className="h-5 w-5 flex-shrink-0" />
                      ) : (
                        <ChevronDown className="h-5 w-5 flex-shrink-0" />
                      )}
                    </button>
                    <div 
                      className={`overflow-hidden transition-all duration-300 ease-in-out ${
                        expandedAccordion === index + 10 ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
                      }`}
                    >
                      <div className="p-4 pt-0 text-muted-foreground">{faq.answer}</div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        <section className="mt-16 md:mt-24">
          <FeaturedProducts 
            title="You May Also Like" 
            subtitle="Products that complement your selection."
            products={recommendedProducts}
          />
        </section>
      </div>
    </div>
  );
};

export default ProductDetail;

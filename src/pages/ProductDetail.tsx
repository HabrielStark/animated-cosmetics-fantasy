
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

// Sample product data (in a real app, this would be fetched from an API)
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

// Recommended products
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

// Sample reviews
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
  
  // In a real app, we would fetch product data from an API
  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      if (id && productData[parseInt(id)]) {
        setProduct(productData[parseInt(id)]);
      } else {
        // Fallback to first product if ID not found
        setProduct(productData[1]);
      }
      setIsLoaded(true);
    }, 500);
  }, [id]);
  
  const handleQuantityChange = (increment: boolean) => {
    setQuantity(prev => {
      const newQuantity = increment ? prev + 1 : prev - 1;
      return Math.max(1, newQuantity); // Ensure quantity doesn't go below 1
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
            <li>Follow with moisturizer and SPF (morning routine)

import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Search, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CartSidebar } from './CartSidebar';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);
  
  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/90 backdrop-blur-md shadow-sm py-4' 
            : 'bg-transparent py-6'
        }`}
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between">
            <Link 
              to="/" 
              className="text-2xl font-medium transition-colors hover:text-primary"
            >
              LUMIÈRE
            </Link>
            
            <nav className="hidden md:flex items-center space-x-8">
              <Link 
                to="/" 
                className="text-sm font-medium text-foreground/80 transition-colors hover:text-primary"
              >
                Home
              </Link>
              <Link 
                to="/products/skincare" 
                className="text-sm font-medium text-foreground/80 transition-colors hover:text-primary"
              >
                Skincare
              </Link>
              <Link 
                to="/products/makeup" 
                className="text-sm font-medium text-foreground/80 transition-colors hover:text-primary"
              >
                Makeup
              </Link>
              <Link 
                to="/products/fragrance" 
                className="text-sm font-medium text-foreground/80 transition-colors hover:text-primary"
              >
                Fragrance
              </Link>
              <Link 
                to="/products/bath-body" 
                className="text-sm font-medium text-foreground/80 transition-colors hover:text-primary"
              >
                Bath & Body
              </Link>
            </nav>
            
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="icon" 
                className="rounded-full hover:bg-secondary hover:text-primary transition-colors"
              >
                <Search className="h-5 w-5" />
                <span className="sr-only">Search</span>
              </Button>
              
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full hover:bg-secondary hover:text-primary transition-colors relative"
                onClick={() => setCartOpen(true)}
              >
                <ShoppingBag className="h-5 w-5" />
                <span className="sr-only">Cart</span>
                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground w-5 h-5 flex items-center justify-center rounded-full text-xs font-medium">3</span>
              </Button>
              
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden rounded-full hover:bg-secondary transition-colors"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
                <span className="sr-only">Menu</span>
              </Button>
            </div>
          </div>
        </div>
      </header>
      
      {/* Mobile menu */}
      <div 
        className={`fixed inset-0 z-40 bg-background/95 backdrop-blur-sm transition-all duration-300 md:hidden ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full space-y-8 p-4">
          <Link 
            to="/" 
            className="text-lg font-medium transition-colors hover:text-primary"
          >
            Home
          </Link>
          <Link 
            to="/products/skincare" 
            className="text-lg font-medium transition-colors hover:text-primary"
          >
            Skincare
          </Link>
          <Link 
            to="/products/makeup" 
            className="text-lg font-medium transition-colors hover:text-primary"
          >
            Makeup
          </Link>
          <Link 
            to="/products/fragrance" 
            className="text-lg font-medium transition-colors hover:text-primary"
          >
            Fragrance
          </Link>
          <Link 
            to="/products/bath-body" 
            className="text-lg font-medium transition-colors hover:text-primary"
          >
            Bath & Body
          </Link>
        </div>
      </div>
      
      <CartSidebar open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
};

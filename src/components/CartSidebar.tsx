
import { ShoppingBag, X, Trash2, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Link } from 'react-router-dom';

interface CartSidebarProps {
  open: boolean;
  onClose: () => void;
}

// Dummy cart items data
const cartItems = [
  {
    id: 1,
    name: "Radiance Renewal Serum",
    brand: "Lumière",
    price: 65,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c2VydW18ZW58MHx8MHx8fDA%3D"
  },
  {
    id: 2,
    name: "Hydra-Glow Cream",
    brand: "Lumière",
    price: 48,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1631730359585-38a4935cbec4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZmFjZSUyMGNyZWFtfGVufDB8fDB8fHww"
  },
  {
    id: 3,
    name: "Rose Petal Mist",
    brand: "Lumière",
    price: 28,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzB8fGZhY2UlMjBtaXN0fGVufDB8fDB8fHww"
  }
];

export const CartSidebar = ({ open, onClose }: CartSidebarProps) => {
  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const shipping = 5.00;
  const total = subtotal + shipping;
  
  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/30 backdrop-blur-sm z-50 transition-opacity duration-300 ${
          open ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />
      
      {/* Sidebar */}
      <div 
        className={`fixed right-0 top-0 h-full w-full max-w-md bg-background shadow-xl z-50 transition-transform duration-300 ease-in-out ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="px-6 py-4 flex items-center justify-between border-b">
            <div className="flex items-center">
              <ShoppingBag className="h-5 w-5 mr-2" />
              <h2 className="text-lg font-medium">Your Cart</h2>
              <span className="ml-2 text-sm text-muted-foreground">({cartItems.length} items)</span>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              className="rounded-full hover:bg-secondary" 
              onClick={onClose}
            >
              <X className="h-5 w-5" />
              <span className="sr-only">Close</span>
            </Button>
          </div>
          
          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto no-scrollbar py-4">
            {cartItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full p-6 text-center">
                <ShoppingBag className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">Your cart is empty</h3>
                <p className="text-muted-foreground mt-2 mb-4">
                  Looks like you haven't added anything to your cart yet.
                </p>
                <Button onClick={onClose} className="mt-2">
                  Continue Shopping
                </Button>
              </div>
            ) : (
              <ul className="space-y-4 px-6">
                {cartItems.map((item) => (
                  <li key={item.id} className="flex gap-4 py-3 animate-fade-in">
                    <div className="h-20 w-20 rounded-md overflow-hidden bg-secondary flex-shrink-0">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">{item.brand}</p>
                          <h4 className="font-medium text-base mt-0.5 line-clamp-1">{item.name}</h4>
                        </div>
                        <p className="font-medium">${item.price.toFixed(2)}</p>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center border rounded-full overflow-hidden">
                          <button className="px-2 py-1 hover:bg-secondary transition-colors">
                            -
                          </button>
                          <span className="px-3">{item.quantity}</span>
                          <button className="px-2 py-1 hover:bg-secondary transition-colors">
                            +
                          </button>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-7 w-7 rounded-full text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Remove</span>
                        </Button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
          
          {/* Cart Summary */}
          {cartItems.length > 0 && (
            <div className="border-t px-6 pt-4 pb-6 bg-secondary/50 animate-fade-in">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
              
              <Link to="/checkout" onClick={onClose}>
                <Button className="w-full mt-4 rounded-full flex items-center justify-center group">
                  <span>Proceed to Checkout</span>
                  <ChevronRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              
              <Button
                variant="outline"
                className="w-full mt-2 rounded-full bg-background border-border text-foreground hover:bg-background/80"
                onClick={onClose}
              >
                Continue Shopping
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

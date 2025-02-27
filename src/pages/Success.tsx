
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, ShoppingBag, Package, ArrowRight, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/Navbar';

const Success = () => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const orderNumber = `LUM-${Math.floor(100000 + Math.random() * 900000)}`;
  const orderDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  const estimatedDelivery = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <motion.div 
        className="container mx-auto px-4 py-16 md:py-24 max-w-3xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div 
          className="bg-white rounded-lg shadow-lg overflow-hidden"
          variants={itemVariants}
        >
          {/* Success Banner */}
          <div className="bg-primary/10 py-8 px-6 text-center">
            <motion.div 
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <CheckCircle className="h-16 w-16 text-primary mx-auto mb-4" />
            </motion.div>
            <h1 className="text-2xl md:text-3xl font-medium mb-2">Thank You for Your Order!</h1>
            <p className="text-muted-foreground">Your order has been received and is being processed.</p>
          </div>
          
          {/* Order Details */}
          <div className="p-6 md:p-8">
            <motion.div variants={itemVariants} className="mb-6">
              <h2 className="text-lg font-medium mb-4">Order Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <p><span className="text-muted-foreground">Order Number:</span> <span className="font-medium">{orderNumber}</span></p>
                  <p><span className="text-muted-foreground">Order Date:</span> <span className="font-medium">{orderDate}</span></p>
                </div>
                <div className="space-y-2">
                  <p><span className="text-muted-foreground">Payment Method:</span> <span className="font-medium">Credit Card (•••• 4242)</span></p>
                  <p><span className="text-muted-foreground">Shipping Method:</span> <span className="font-medium">Standard Shipping</span></p>
                </div>
              </div>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <h3 className="text-lg font-medium mb-4">Order Summary</h3>
              <div className="border rounded-lg overflow-hidden mb-6">
                <table className="min-w-full divide-y divide-border">
                  <thead className="bg-secondary">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Product</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Quantity</th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">Price</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-border">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0 rounded overflow-hidden bg-secondary">
                            <img 
                              src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c2VydW18ZW58MHx8MHx8fDA%3D" 
                              alt="Radiance Renewal Serum" 
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium">Radiance Renewal Serum</div>
                            <div className="text-sm text-muted-foreground">Lumière</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">1</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-right">$65.00</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0 rounded overflow-hidden bg-secondary">
                            <img 
                              src="https://images.unsplash.com/photo-1631730359585-38a4935cbec4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZmFjZSUyMGNyZWFtfGVufDB8fDB8fHww" 
                              alt="Hydra-Glow Cream" 
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium">Hydra-Glow Cream</div>
                            <div className="text-sm text-muted-foreground">Lumière</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">1</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-right">$48.00</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0 rounded overflow-hidden bg-secondary">
                            <img 
                              src="https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzB8fGZhY2UlMjBtaXN0fGVufDB8fDB8fHww" 
                              alt="Rose Petal Mist" 
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium">Rose Petal Mist</div>
                            <div className="text-sm text-muted-foreground">Lumière</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">1</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-right">$28.00</td>
                    </tr>
                  </tbody>
                  <tfoot className="bg-secondary">
                    <tr>
                      <td className="px-6 py-3 text-right text-sm font-medium" colSpan={2}>Subtotal:</td>
                      <td className="px-6 py-3 text-right text-sm font-medium">$141.00</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-3 text-right text-sm font-medium" colSpan={2}>Shipping:</td>
                      <td className="px-6 py-3 text-right text-sm font-medium">$0.00</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-3 text-right text-sm font-medium" colSpan={2}>Tax:</td>
                      <td className="px-6 py-3 text-right text-sm font-medium">$9.87</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-3 text-right text-sm font-bold" colSpan={2}>Total:</td>
                      <td className="px-6 py-3 text-right text-sm font-bold">$150.87</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </motion.div>
            
            <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="border rounded-lg p-4">
                <h3 className="font-medium mb-2">Shipping Address</h3>
                <p className="text-sm text-muted-foreground">
                  Jane Doe<br />
                  123 Main Street<br />
                  Apt 4B<br />
                  New York, NY 10001<br />
                  United States
                </p>
              </div>
              <div className="border rounded-lg p-4">
                <h3 className="font-medium mb-2">Billing Address</h3>
                <p className="text-sm text-muted-foreground">
                  Jane Doe<br />
                  123 Main Street<br />
                  Apt 4B<br />
                  New York, NY 10001<br />
                  United States
                </p>
              </div>
            </motion.div>
            
            <motion.div variants={itemVariants} className="mb-8">
              <div className="bg-primary/5 rounded-lg p-4 flex items-start space-x-4">
                <Package className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-medium">Shipping Information</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Your order is being processed and will ship soon. Estimated delivery date: <span className="font-medium">{estimatedDelivery}</span>
                  </p>
                </div>
              </div>
            </motion.div>
            
            <motion.div variants={itemVariants} className="flex flex-col md:flex-row gap-4">
              <Button className="flex-1 rounded-full">
                <ShoppingBag className="mr-2 h-4 w-4" />
                Continue Shopping
              </Button>
              <Button variant="outline" className="flex-1 rounded-full">
                <Mail className="mr-2 h-4 w-4" />
                Check Order Status
              </Button>
            </motion.div>
          </div>
        </motion.div>
        
        <motion.div variants={itemVariants} className="mt-8 text-center">
          <p className="text-sm text-muted-foreground mb-2">
            A confirmation email has been sent to jane.doe@example.com
          </p>
          <p className="text-sm text-muted-foreground">
            Questions? Contact our customer support at <a href="mailto:support@lumiere.com" className="text-primary hover:underline">support@lumiere.com</a>
          </p>
        </motion.div>
        
        <motion.div variants={itemVariants} className="mt-12">
          <h2 className="text-xl font-medium text-center mb-6">What's Next?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm text-center flex flex-col items-center">
              <div className="h-12 w-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4">
                <Package className="h-6 w-6" />
              </div>
              <h3 className="font-medium mb-2">Track Your Order</h3>
              <p className="text-sm text-muted-foreground mb-4">Follow your order's journey from our warehouse to your doorstep.</p>
              <Link to="/track-order" className="text-primary hover:underline text-sm font-medium inline-flex items-center">
                Track Order <ArrowRight className="ml-1 h-3 w-3" />
              </Link>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm text-center flex flex-col items-center">
              <div className="h-12 w-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-heart"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
              </div>
              <h3 className="font-medium mb-2">Join Our Rewards</h3>
              <p className="text-sm text-muted-foreground mb-4">Earn points with every purchase and receive exclusive offers.</p>
              <Link to="/rewards" className="text-primary hover:underline text-sm font-medium inline-flex items-center">
                Learn More <ArrowRight className="ml-1 h-3 w-3" />
              </Link>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm text-center flex flex-col items-center">
              <div className="h-12 w-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-message-circle"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/></svg>
              </div>
              <h3 className="font-medium mb-2">Share Your Experience</h3>
              <p className="text-sm text-muted-foreground mb-4">Write a review for your products and help others in their beauty journey.</p>
              <Link to="/account/reviews" className="text-primary hover:underline text-sm font-medium inline-flex items-center">
                Write a Review <ArrowRight className="ml-1 h-3 w-3" />
              </Link>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Success;

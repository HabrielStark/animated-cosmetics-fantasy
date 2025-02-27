
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, CreditCard, ShoppingBag, Check, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Navbar } from '@/components/Navbar';
import { useToast } from '@/hooks/use-toast';

// Dummy cart items
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

const Checkout = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState<'information' | 'shipping' | 'payment'>('information');
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    apartment: '',
    city: '',
    country: 'United States',
    state: '',
    zipCode: '',
    phone: '',
    saveInfo: true,
    shippingMethod: 'standard',
    paymentMethod: 'card',
    cardNumber: '',
    cardName: '',
    cardExpiry: '',
    cardCvc: '',
    sameAsShipping: true
  });
  
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const shipping = formData.shippingMethod === 'express' ? 9.95 : formData.shippingMethod === 'next-day' ? 19.95 : 0;
  const tax = subtotal * 0.07; // 7% tax
  const total = subtotal + shipping + tax;
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };
  
  const handleShippingMethodChange = (value: string) => {
    setFormData({
      ...formData,
      shippingMethod: value
    });
  };
  
  const handlePaymentMethodChange = (value: string) => {
    setFormData({
      ...formData,
      paymentMethod: value
    });
  };
  
  const handleContinueToShipping = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('shipping');
    window.scrollTo(0, 0);
  };
  
  const handleContinueToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('payment');
    window.scrollTo(0, 0);
  };
  
  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call/processing
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast({
      title: "Order received!",
      description: "Your order has been successfully placed."
    });
    
    navigate('/success');
  };
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
          {/* Left Column - Form */}
          <div className="flex-1 order-2 lg:order-1">
            <div className="max-w-2xl mx-auto">
              <Link to="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-8">
                <ArrowLeft className="h-4 w-4 mr-1" />
                Continue shopping
              </Link>
              
              <h1 className="text-3xl font-medium mb-8">Checkout</h1>
              
              {/* Checkout Progress */}
              <div className="mb-8">
                <div className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                    step === 'information' ? 'bg-primary text-white' : 
                    (step === 'shipping' || step === 'payment') ? 'bg-primary/20 text-primary' : 
                    'bg-muted text-muted-foreground'
                  }`}>
                    {(step === 'shipping' || step === 'payment') ? <Check className="h-4 w-4" /> : '1'}
                  </div>
                  <div className={`h-1 flex-1 ${(step === 'shipping' || step === 'payment') ? 'bg-primary/50' : 'bg-muted'}`}></div>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                    step === 'shipping' ? 'bg-primary text-white' :
                    step === 'payment' ? 'bg-primary/20 text-primary' :
                    'bg-muted text-muted-foreground'
                  }`}>
                    {step === 'payment' ? <Check className="h-4 w-4" /> : '2'}
                  </div>
                  <div className={`h-1 flex-1 ${step === 'payment' ? 'bg-primary/50' : 'bg-muted'}`}></div>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                    step === 'payment' ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'
                  }`}>
                    3
                  </div>
                </div>
                <div className="flex justify-between mt-2 text-xs text-muted-foreground px-1">
                  <span>Information</span>
                  <span>Shipping</span>
                  <span>Payment</span>
                </div>
              </div>
              
              {/* Information Step */}
              {step === 'information' && (
                <motion.form 
                  onSubmit={handleContinueToShipping}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-lg font-medium mb-4">Contact Information</h2>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="email">Email address</Label>
                          <Input 
                            id="email" 
                            name="email"
                            type="email" 
                            placeholder="your.email@example.com" 
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h2 className="text-lg font-medium mb-4">Shipping Address</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="firstName">First name</Label>
                          <Input 
                            id="firstName" 
                            name="firstName"
                            placeholder="First name" 
                            value={formData.firstName}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="lastName">Last name</Label>
                          <Input 
                            id="lastName" 
                            name="lastName"
                            placeholder="Last name" 
                            value={formData.lastName}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        <div className="md:col-span-2">
                          <Label htmlFor="address">Address</Label>
                          <Input 
                            id="address" 
                            name="address"
                            placeholder="Street address" 
                            value={formData.address}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        <div className="md:col-span-2">
                          <Label htmlFor="apartment">Apartment, suite, etc. (optional)</Label>
                          <Input 
                            id="apartment" 
                            name="apartment"
                            placeholder="Apartment, suite, etc." 
                            value={formData.apartment}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div>
                          <Label htmlFor="city">City</Label>
                          <Input 
                            id="city" 
                            name="city"
                            placeholder="City" 
                            value={formData.city}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="state">State</Label>
                            <Input 
                              id="state" 
                              name="state"
                              placeholder="State" 
                              value={formData.state}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="zipCode">ZIP code</Label>
                            <Input 
                              id="zipCode" 
                              name="zipCode"
                              placeholder="ZIP code" 
                              value={formData.zipCode}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                        </div>
                        <div className="md:col-span-2">
                          <Label htmlFor="phone">Phone</Label>
                          <Input 
                            id="phone" 
                            name="phone"
                            type="tel" 
                            placeholder="Phone number" 
                            value={formData.phone}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <input 
                        type="checkbox" 
                        id="saveInfo" 
                        name="saveInfo"
                        className="rounded border-gray-300 text-primary focus:ring-primary"
                        checked={formData.saveInfo}
                        onChange={handleInputChange}
                      />
                      <Label htmlFor="saveInfo" className="text-sm">Save this information for next time</Label>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row sm:justify-between gap-4 pt-4">
                      <Link to="/" className="order-2 sm:order-1">
                        <Button variant="outline" type="button" className="w-full sm:w-auto">
                          <ArrowLeft className="h-4 w-4 mr-2" />
                          Return to cart
                        </Button>
                      </Link>
                      <Button type="submit" className="order-1 sm:order-2 w-full sm:w-auto">
                        Continue to shipping
                      </Button>
                    </div>
                  </div>
                </motion.form>
              )}
              
              {/* Shipping Step */}
              {step === 'shipping' && (
                <motion.form 
                  onSubmit={handleContinueToPayment}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-lg font-medium mb-4">Shipping Information</h2>
                      
                      <div className="border rounded-lg p-4 mb-4 flex justify-between bg-secondary/30">
                        <div className="space-y-1">
                          <p><span className="text-muted-foreground">Contact:</span> {formData.email}</p>
                          <p><span className="text-muted-foreground">Ship to:</span> {formData.address}, {formData.city}, {formData.state} {formData.zipCode}</p>
                        </div>
                        <button 
                          type="button" 
                          className="text-sm text-primary hover:text-primary/80"
                          onClick={() => setStep('information')}
                        >
                          Change
                        </button>
                      </div>
                      
                      <h3 className="font-medium mb-3">Shipping Method</h3>
                      <div className="space-y-3">
                        <label className={`flex justify-between items-center border rounded-lg p-4 cursor-pointer ${formData.shippingMethod === 'standard' ? 'border-primary bg-primary/5' : ''}`}>
                          <div className="flex items-center">
                            <input 
                              type="radio" 
                              name="shippingMethod" 
                              value="standard"
                              className="mr-4"
                              checked={formData.shippingMethod === 'standard'}
                              onChange={() => handleShippingMethodChange('standard')}
                            />
                            <div>
                              <p className="font-medium">Standard Shipping</p>
                              <p className="text-sm text-muted-foreground">5-7 business days</p>
                            </div>
                          </div>
                          <p className="font-medium">Free</p>
                        </label>
                        
                        <label className={`flex justify-between items-center border rounded-lg p-4 cursor-pointer ${formData.shippingMethod === 'express' ? 'border-primary bg-primary/5' : ''}`}>
                          <div className="flex items-center">
                            <input 
                              type="radio" 
                              name="shippingMethod" 
                              value="express"
                              className="mr-4"
                              checked={formData.shippingMethod === 'express'}
                              onChange={() => handleShippingMethodChange('express')}
                            />
                            <div>
                              <p className="font-medium">Express Shipping</p>
                              <p className="text-sm text-muted-foreground">2-3 business days</p>
                            </div>
                          </div>
                          <p className="font-medium">$9.95</p>
                        </label>
                        
                        <label className={`flex justify-between items-center border rounded-lg p-4 cursor-pointer ${formData.shippingMethod === 'next-day' ? 'border-primary bg-primary/5' : ''}`}>
                          <div className="flex items-center">
                            <input 
                              type="radio" 
                              name="shippingMethod" 
                              value="next-day"
                              className="mr-4"
                              checked={formData.shippingMethod === 'next-day'}
                              onChange={() => handleShippingMethodChange('next-day')}
                            />
                            <div>
                              <p className="font-medium">Next Day Delivery</p>
                              <p className="text-sm text-muted-foreground">Next business day (order by 2pm)</p>
                            </div>
                          </div>
                          <p className="font-medium">$19.95</p>
                        </label>
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row sm:justify-between gap-4 pt-4">
                      <Button 
                        variant="outline" 
                        type="button" 
                        className="order-2 sm:order-1 w-full sm:w-auto"
                        onClick={() => setStep('information')}
                      >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Return to information
                      </Button>
                      <Button type="submit" className="order-1 sm:order-2 w-full sm:w-auto">
                        Continue to payment
                      </Button>
                    </div>
                  </div>
                </motion.form>
              )}
              
              {/* Payment Step */}
              {step === 'payment' && (
                <motion.form 
                  onSubmit={handleSubmitOrder}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-lg font-medium mb-4">Payment</h2>
                      
                      <div className="border rounded-lg p-4 mb-4 space-y-2 bg-secondary/30">
                        <div className="flex justify-between">
                          <p><span className="text-muted-foreground">Contact:</span> {formData.email}</p>
                          <button 
                            type="button" 
                            className="text-sm text-primary hover:text-primary/80"
                            onClick={() => setStep('information')}
                          >
                            Change
                          </button>
                        </div>
                        <div className="flex justify-between">
                          <p><span className="text-muted-foreground">Ship to:</span> {formData.address}, {formData.city}, {formData.state} {formData.zipCode}</p>
                          <button 
                            type="button" 
                            className="text-sm text-primary hover:text-primary/80"
                            onClick={() => setStep('information')}
                          >
                            Change
                          </button>
                        </div>
                        <div className="flex justify-between">
                          <p>
                            <span className="text-muted-foreground">Method:</span> 
                            {formData.shippingMethod === 'standard' && ' Standard Shipping (5-7 business days)'}
                            {formData.shippingMethod === 'express' && ' Express Shipping (2-3 business days)'}
                            {formData.shippingMethod === 'next-day' && ' Next Day Delivery (Next business day)'}
                          </p>
                          <button 
                            type="button" 
                            className="text-sm text-primary hover:text-primary/80"
                            onClick={() => setStep('shipping')}
                          >
                            Change
                          </button>
                        </div>
                      </div>
                      
                      <Tabs defaultValue="card" onValueChange={handlePaymentMethodChange}>
                        <TabsList className="grid grid-cols-3 mb-4">
                          <TabsTrigger value="card" className="data-[state=active]:bg-primary/10">
                            <CreditCard className="h-4 w-4 mr-2" />
                            Credit Card
                          </TabsTrigger>
                          <TabsTrigger value="paypal" className="data-[state=active]:bg-primary/10">
                            <span className="font-bold text-blue-600 mr-1">Pay</span>
                            <span className="font-bold text-blue-800">Pal</span>
                          </TabsTrigger>
                          <TabsTrigger value="apple" className="data-[state=active]:bg-primary/10">
                            <svg className="h-4 w-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19c-2.3 0-6.4-.2-8.1-1.4-.8-.5-1.9-1.4-1.9-3.5s1.1-3 1.9-3.5C5.6 9.2 9.7 9 12 9s6.4.2 8.1 1.4c.8.5 1.9 1.4 1.9 3.5s-1.1 3-1.9 3.5c-1.7 1.2-5.8 1.5-8.1 1.5M19 7c0-1.7-1.3-3-3-3s-3 1.3-3 3v2m0-2c0-1.7-1.3-3-3-3S7 5.3 7 7v2"></path></svg>
                            Apple Pay
                          </TabsTrigger>
                        </TabsList>
                        
                        <TabsContent value="card" className="mt-0">
                          <div className="space-y-4 border rounded-lg p-4">
                            <div>
                              <Label htmlFor="cardNumber">Card number</Label>
                              <Input 
                                id="cardNumber" 
                                name="cardNumber"
                                placeholder="1234 5678 9012 3456" 
                                value={formData.cardNumber}
                                onChange={handleInputChange}
                                required
                              />
                            </div>
                            <div>
                              <Label htmlFor="cardName">Name on card</Label>
                              <Input 
                                id="cardName" 
                                name="cardName"
                                placeholder="Full name as displayed on card" 
                                value={formData.cardName}
                                onChange={handleInputChange}
                                required
                              />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label htmlFor="cardExpiry">Expiration date (MM/YY)</Label>
                                <Input 
                                  id="cardExpiry" 
                                  name="cardExpiry"
                                  placeholder="MM/YY" 
                                  value={formData.cardExpiry}
                                  onChange={handleInputChange}
                                  required
                                />
                              </div>
                              <div>
                                <Label htmlFor="cardCvc">Security code (CVC)</Label>
                                <Input 
                                  id="cardCvc" 
                                  name="cardCvc"
                                  placeholder="CVC" 
                                  value={formData.cardCvc}
                                  onChange={handleInputChange}
                                  required
                                />
                              </div>
                            </div>
                          </div>
                        </TabsContent>
                        
                        <TabsContent value="paypal" className="mt-0">
                          <div className="border rounded-lg p-6 text-center">
                            <p className="mb-4">You'll be redirected to PayPal to complete your purchase securely.</p>
                            <button
                              type="button"
                              className="inline-flex items-center justify-center bg-[#0070ba] hover:bg-[#003087] text-white font-medium py-2 px-4 rounded transition-colors"
                            >
                              <span className="font-bold text-white mr-1">Pay</span>
                              <span className="font-bold text-white">Pal</span>
                              <span className="ml-2">Checkout</span>
                            </button>
                          </div>
                        </TabsContent>
                        
                        <TabsContent value="apple" className="mt-0">
                          <div className="border rounded-lg p-6 text-center">
                            <p className="mb-4">You'll be redirected to Apple Pay to complete your purchase securely.</p>
                            <button
                              type="button"
                              className="inline-flex items-center justify-center bg-black hover:bg-gray-800 text-white font-medium py-2 px-4 rounded transition-colors"
                            >
                              <svg className="h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19c-2.3 0-6.4-.2-8.1-1.4-.8-.5-1.9-1.4-1.9-3.5s1.1-3 1.9-3.5C5.6 9.2 9.7 9 12 9s6.4.2 8.1 1.4c.8.5 1.9 1.4 1.9 3.5s-1.1 3-1.9 3.5c-1.7 1.2-5.8 1.5-8.1 1.5M19 7c0-1.7-1.3-3-3-3s-3 1.3-3 3v2m0-2c0-1.7-1.3-3-3-3S7 5.3 7 7v2"></path></svg>
                              Pay with Apple Pay
                            </button>
                          </div>
                        </TabsContent>
                      </Tabs>
                      
                      <div className="mt-4 space-y-3">
                        <div className="flex items-center space-x-2">
                          <input 
                            type="checkbox" 
                            id="sameAsShipping" 
                            name="sameAsShipping"
                            className="rounded border-gray-300 text-primary focus:ring-primary"
                            checked={formData.sameAsShipping}
                            onChange={handleInputChange}
                          />
                          <Label htmlFor="sameAsShipping" className="text-sm">Billing address is the same as shipping address</Label>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row sm:justify-between gap-4 pt-4">
                      <Button 
                        variant="outline" 
                        type="button" 
                        className="order-2 sm:order-1 w-full sm:w-auto"
                        onClick={() => setStep('shipping')}
                      >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Return to shipping
                      </Button>
                      <Button 
                        type="submit" 
                        className="order-1 sm:order-2 w-full sm:w-auto"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <>
                            <div className="animate-spin mr-2 h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
                            Processing...
                          </>
                        ) : (
                          'Complete order'
                        )}
                      </Button>
                    </div>
                  </div>
                </motion.form>
              )}
            </div>
          </div>
          
          {/* Right Column - Order Summary */}
          <div className="lg:w-1/3 order-1 lg:order-2">
            <div className="bg-secondary/50 rounded-lg p-6 sticky top-24">
              <h2 className="text-lg font-medium mb-4">Order Summary</h2>
              
              <div className="max-h-96 overflow-y-auto mb-4 pr-2">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-4 py-3 border-b last:border-b-0">
                    <div className="h-16 w-16 rounded-md overflow-hidden bg-white flex-shrink-0 relative">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute -top-2 -right-2 w-5 h-5 bg-primary text-white text-xs rounded-full flex items-center justify-center">
                        {item.quantity}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-muted-foreground">{item.brand}</p>
                      <h4 className="font-medium text-sm mt-0.5 line-clamp-2">{item.name}</h4>
                      <p className="font-medium text-sm mt-1">${item.price.toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax (7%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
              </div>
              
              <Separator className="mb-4" />
              
              <div className="flex justify-between text-lg font-medium mb-4">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
              
              <div className="flex items-center text-sm text-muted-foreground">
                <ShoppingBag className="h-4 w-4 mr-2" />
                <span>Free shipping on orders over $50</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

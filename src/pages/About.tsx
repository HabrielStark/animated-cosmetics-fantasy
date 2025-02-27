import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/Navbar';

const About = () => {
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
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl md:text-4xl font-medium tracking-tight mb-4">
              Our Philosophy
            </h1>
            <p className="text-muted-foreground text-lg max-w-3xl">
              At Lumière, we believe in the transformative power of beauty and self-care.
            </p>
          </motion.div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6"
          >
            <div>
              <h2 className="text-2xl font-medium mb-4">Our Story</h2>
              <p className="text-muted-foreground">
                Founded in 2024, Lumière was born from a passion for creating luxurious, effective skincare and beauty products that enhance natural beauty. Our journey began with a simple belief: everyone deserves to feel confident and radiant in their own skin.
              </p>
            </div>
            
            <div>
              <h2 className="text-2xl font-medium mb-4">Our Mission</h2>
              <p className="text-muted-foreground">
                We're dedicated to developing innovative beauty solutions that combine the best of nature and science. Our mission is to empower individuals to embrace their unique beauty while providing them with products that deliver real results.
              </p>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="space-y-6"
          >
            <div>
              <h2 className="text-2xl font-medium mb-4">Our Values</h2>
              <ul className="space-y-4 text-muted-foreground">
                <li>
                  <strong className="text-foreground">Quality First</strong>
                  <p>We never compromise on the quality of our ingredients or formulations.</p>
                </li>
                <li>
                  <strong className="text-foreground">Sustainability</strong>
                  <p>Our commitment to the environment is reflected in our eco-friendly packaging and responsible sourcing practices.</p>
                </li>
                <li>
                  <strong className="text-foreground">Innovation</strong>
                  <p>We continuously research and develop new formulations that push the boundaries of beauty and skincare.</p>
                </li>
                <li>
                  <strong className="text-foreground">Transparency</strong>
                  <p>We believe in being open about our ingredients and processes, ensuring our customers can make informed decisions.</p>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-12 md:mt-16 text-center"
        >
          <h2 className="text-2xl font-medium mb-6">Experience Lumière</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Join us in our journey to redefine beauty and self-care. Discover our collection of thoughtfully crafted products designed to enhance your natural radiance.
          </p>
          <Link to="/products/skincare">
            <button className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-3 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90">
              Explore Our Products
            </button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default About; 
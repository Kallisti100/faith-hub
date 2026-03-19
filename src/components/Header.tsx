import { Link } from 'react-router-dom';
import { Menu, X, ShoppingCart } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '@/integrations';
import Cart from '@/components/Cart';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { itemCount, actions } = useCart();

  return (
    <>
      <Cart />
      <header className="bg-primary border-b border-angel-gold/20 sticky top-0 z-40 shadow-sm">
      <div className="max-w-[120rem] mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo/Brand */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="font-heading text-2xl lg:text-3xl text-primary-foreground">
              Belleville Food Bank
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link 
              to="/" 
              className="font-paragraph text-base text-primary-foreground/70 hover:text-secondary transition-colors"
            >
              Home
            </Link>
            <Link 
              to="/events" 
              className="font-paragraph text-base text-primary-foreground/70 hover:text-secondary transition-colors"
            >
              Events
            </Link>
            <Link 
              to="/donate" 
              className="font-paragraph text-base text-primary-foreground/70 hover:text-secondary transition-colors"
            >
              Donate
            </Link>
            <Link 
              to="/partners" 
              className="font-paragraph text-base text-primary-foreground/70 hover:text-secondary transition-colors"
            >
              Partners
            </Link>
            <Link 
              to="/spirit" 
              className="font-paragraph text-base text-primary-foreground/70 hover:text-secondary transition-colors"
            >
              Food for the Spirit
            </Link>
            <Link 
              to="/who-we-are" 
              className="font-paragraph text-base text-primary-foreground/70 hover:text-secondary transition-colors"
            >
              Who We Are
            </Link>
            <Link 
              to="/join-mission" 
              className="font-paragraph text-base text-primary-foreground/70 hover:text-secondary transition-colors"
            >
              Join Our Mission
            </Link>
            
            {/* Cart Icon */}
            <button
              onClick={actions.toggleCart}
              className="relative text-primary-foreground/70 hover:text-secondary transition-colors"
              aria-label="Shopping cart"
            >
              <ShoppingCart size={24} />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 bg-secondary text-white rounded-full flex items-center justify-center text-xs font-paragraph font-semibold">
                  {itemCount}
                </span>
              )}
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center space-x-4">
            <button
              onClick={actions.toggleCart}
              className="relative text-primary-foreground/70 hover:text-secondary transition-colors"
              aria-label="Shopping cart"
            >
              <ShoppingCart size={24} />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 bg-secondary text-white rounded-full flex items-center justify-center text-xs font-paragraph font-semibold">
                  {itemCount}
                </span>
              )}
            </button>
            
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-primary-foreground/70 hover:text-secondary transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="lg:hidden py-6 space-y-4 border-t border-angel-gold/20">
            <Link 
              to="/" 
              onClick={() => setIsMenuOpen(false)}
              className="block font-paragraph text-base text-primary-foreground/70 hover:text-secondary transition-colors py-2"
            >
              Home
            </Link>
            <Link 
              to="/events" 
              onClick={() => setIsMenuOpen(false)}
              className="block font-paragraph text-base text-primary-foreground/70 hover:text-secondary transition-colors py-2"
            >
              Events
            </Link>
            <Link 
              to="/donate" 
              onClick={() => setIsMenuOpen(false)}
              className="block font-paragraph text-base text-primary-foreground/70 hover:text-secondary transition-colors py-2"
            >
              Donate
            </Link>
            <Link 
              to="/partners" 
              onClick={() => setIsMenuOpen(false)}
              className="block font-paragraph text-base text-primary-foreground/70 hover:text-secondary transition-colors py-2"
            >
              Partners
            </Link>
            <Link 
              to="/spirit" 
              onClick={() => setIsMenuOpen(false)}
              className="block font-paragraph text-base text-primary-foreground/70 hover:text-secondary transition-colors py-2"
            >
              Food for the Spirit
            </Link>
            <Link 
              to="/who-we-are" 
              onClick={() => setIsMenuOpen(false)}
              className="block font-paragraph text-base text-primary-foreground/70 hover:text-secondary transition-colors py-2"
            >
              Who We Are
            </Link>
            <Link 
              to="/join-mission" 
              onClick={() => setIsMenuOpen(false)}
              className="block font-paragraph text-base text-primary-foreground/70 hover:text-secondary transition-colors py-2"
            >
              Join Our Mission
            </Link>
          </nav>
        )}
      </div>
    </header>
    </>
  );
}

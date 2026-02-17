import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-primary border-t border-bordersubtle">
      <div className="max-w-[120rem] mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* About Section */}
          <div>
            <h3 className="font-heading text-xl text-primary-foreground mb-4">
              Belleville SDA Food Bank
            </h3>
            <p className="font-paragraph text-base text-textbody leading-relaxed">
              A faith-centered ministry serving our community with compassion and care, providing both physical and spiritual nourishment.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading text-xl text-primary-foreground mb-4">
              Quick Links
            </h3>
            <nav className="space-y-3">
              <Link 
                to="/events" 
                className="block font-paragraph text-base text-textbody hover:text-primary-foreground transition-colors"
              >
                Events Calendar
              </Link>
              <Link 
                to="/donate" 
                className="block font-paragraph text-base text-textbody hover:text-primary-foreground transition-colors"
              >
                Make a Donation
              </Link>
              <Link 
                to="/partners" 
                className="block font-paragraph text-base text-textbody hover:text-primary-foreground transition-colors"
              >
                Our Partners
              </Link>
              <Link 
                to="/spirit" 
                className="block font-paragraph text-base text-textbody hover:text-primary-foreground transition-colors"
              >
                Food for the Spirit
              </Link>
            </nav>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="font-heading text-xl text-primary-foreground mb-4">
              Contact Us
            </h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin size={20} className="text-secondary mt-1 flex-shrink-0" />
                <span className="font-paragraph text-base text-textbody">
                  Belleville, Ontario, Canada
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone size={20} className="text-secondary flex-shrink-0" />
                <span className="font-paragraph text-base text-textbody">
                  (613) 555-0123
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={20} className="text-secondary flex-shrink-0" />
                <span className="font-paragraph text-base text-textbody">
                  info@bellevillesdafoodbank.org
                </span>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="font-heading text-xl text-primary-foreground mb-4">
              Connect With Us
            </h3>
            <div className="flex space-x-4">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-secondary hover:text-primary-foreground transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={24} />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-secondary hover:text-primary-foreground transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={24} />
              </a>
            </div>
            <p className="font-paragraph text-sm text-textbody mt-6 leading-relaxed">
              Stay updated with our latest events, programs, and ways to get involved in our ministry.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-bordersubtle">
          <p className="font-paragraph text-sm text-textbody text-center">
            © {new Date().getFullYear()} Belleville SDA Food Bank. All rights reserved. A ministry of faith, hope, and love.
          </p>
        </div>
      </div>
    </footer>
  );
}

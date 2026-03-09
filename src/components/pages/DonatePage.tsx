import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, DollarSign } from 'lucide-react';
import { BaseCrudService, useCart, useCurrency, formatPrice, DEFAULT_CURRENCY } from '@/integrations';
import { DonationFunds } from '@/entities';
import { Image } from '@/components/ui/image';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function DonatePage() {
  const [funds, setFunds] = useState<DonationFunds[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { addingItemId, actions } = useCart();
  const { currency } = useCurrency();

  useEffect(() => {
    loadFunds();
  }, []);

  const loadFunds = async () => {
    setIsLoading(true);
    try {
      const result = await BaseCrudService.getAll<DonationFunds>('donationfunds');
      setFunds(result.items.filter(fund => fund.isActive));
    } catch (error) {
      console.error('Failed to load donation funds:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDonate = async (fund: DonationFunds) => {
    await actions.addToCart({
      collectionId: 'donationfunds',
      itemId: fund._id,
      quantity: 1
    });
  };

  return (
    <div className="min-h-screen bg-primary">
      <Header />

      {/* Hero Section */}
      <section className="w-full bg-gradient-to-r from-background via-earth-warm/10 to-background py-20 lg:py-28">
        <div className="max-w-[100rem] mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 bg-earth-warm rounded-full mb-8">
              <Heart className="text-white" size={40} />
            </div>
            
            <h1 className="font-heading text-5xl lg:text-6xl text-primary-foreground mb-6">
              Support Our Ministry
            </h1>
            
            <p className="font-paragraph text-lg text-textbody leading-relaxed">
              Your generous donations help us continue serving our community with food assistance, spiritual programs, and compassionate care. Every contribution makes a meaningful difference in someone's life.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Impact Statement */}
      <section className="w-full py-16 bg-primary">
        <div className="max-w-[100rem] mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-r from-background to-earth-warm/5 border border-earth-warm/20 rounded-lg p-10 lg:p-12"
          >
            <h2 className="font-heading text-3xl lg:text-4xl text-primary-foreground mb-6 text-center">
              Your Impact
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
              <div className="text-center">
                <div className="font-heading text-5xl text-earth-warm mb-3">
                  500+
                </div>
                <p className="font-paragraph text-base text-textbody">
                  Families served monthly
                </p>
              </div>
              
              <div className="text-center">
                <div className="font-heading text-5xl text-earth-terracotta mb-3">
                  12
                </div>
                <p className="font-paragraph text-base text-textbody">
                  Community events annually
                </p>
              </div>
              
              <div className="text-center">
                <div className="font-heading text-5xl text-earth-sand mb-3">
                  100%
                </div>
                <p className="font-paragraph text-base text-textbody">
                  Of donations support our mission
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Donation Funds */}
      <section className="w-full py-20 min-h-[600px]">
        <div className="max-w-[100rem] mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-heading text-4xl lg:text-5xl text-primary-foreground mb-4">
              Choose Where to Give
            </h2>
            <p className="font-paragraph text-lg text-textbody max-w-3xl mx-auto">
              Select a fund that resonates with your heart. Each contribution directly supports our mission to serve and uplift our community.
            </p>
          </motion.div>

          {isLoading ? null : funds.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <DollarSign className="mx-auto mb-6 text-secondary" size={64} />
              <h3 className="font-heading text-3xl text-primary-foreground mb-4">
                Donation Options Coming Soon
              </h3>
              <p className="font-paragraph text-lg text-textbody max-w-2xl mx-auto">
                We're setting up our donation funds. Please check back soon or contact us directly to make a contribution.
              </p>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {funds.map((fund, index) => (
                <motion.div
                  key={fund._id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-background border border-bordersubtle rounded-lg overflow-hidden hover:border-earth-warm transition-colors"
                >
                  {fund.itemImage && (
                    <div className="aspect-video overflow-hidden">
                      <Image
                        src={fund.itemImage}
                        alt={fund.itemName || 'Donation fund'}
                        width={600}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  
                  <div className="p-8">
                    <h3 className="font-heading text-2xl text-primary-foreground mb-3">
                      {fund.itemName || 'General Fund'}
                    </h3>
                    
                    {fund.itemDescription && (
                      <p className="font-paragraph text-base text-textbody leading-relaxed mb-6">
                        {fund.itemDescription}
                      </p>
                    )}
                    
                    <div className="mb-6">
                      <div className="flex items-baseline space-x-2 mb-2">
                        <span className="font-heading text-3xl text-earth-warm">
                          {formatPrice(fund.itemPrice || 0, currency ?? DEFAULT_CURRENCY)}
                        </span>
                        <span className="font-paragraph text-base text-textbody">
                          suggested donation
                        </span>
                      </div>
                      
                      {fund.fundGoal && (
                        <p className="font-paragraph text-sm text-textbody">
                          Goal: {formatPrice(fund.fundGoal, currency ?? DEFAULT_CURRENCY)}
                        </p>
                      )}
                    </div>
                    
                    <button
                      onClick={() => handleDonate(fund)}
                      disabled={addingItemId === fund._id}
                      className="w-full px-6 py-3 bg-earth-warm text-white font-paragraph text-base rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
                    >
                      {addingItemId === fund._id ? 'Adding to Cart...' : 'Donate Now'}
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Additional Ways to Give */}
      <section className="w-full bg-gradient-to-r from-earth-warm via-earth-terracotta to-earth-sand py-20">
        <div className="max-w-[100rem] mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h2 className="font-heading text-4xl lg:text-5xl text-white mb-6">
              Other Ways to Help
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 border border-white/20">
                <h3 className="font-heading text-2xl text-white mb-4">
                  Volunteer Your Time
                </h3>
                <p className="font-paragraph text-base text-white/90 leading-relaxed mb-6">
                  Join our team of dedicated volunteers helping with food distribution, events, and community outreach.
                </p>
                <a 
                  href="mailto:info@bellevillefoodbank.org?subject=Volunteer Inquiry"
                  className="inline-block px-6 py-3 bg-white text-earth-warm font-paragraph text-base rounded-lg hover:opacity-90 transition-opacity font-semibold"
                >
                  Contact Us
                </a>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 border border-white/20">
                <h3 className="font-heading text-2xl text-white mb-4">
                  Donate Food Items
                </h3>
                <p className="font-paragraph text-base text-white/90 leading-relaxed mb-6">
                  Non-perishable food items and essential supplies are always needed to support our community.
                </p>
                <a 
                  href="mailto:info@bellevillefoodbank.org?subject=Food Donation"
                  className="inline-block px-6 py-3 bg-white text-earth-warm font-paragraph text-base rounded-lg hover:opacity-90 transition-opacity font-semibold"
                >
                  Learn More
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

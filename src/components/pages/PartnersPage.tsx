import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, ExternalLink } from 'lucide-react';
import { BaseCrudService } from '@/integrations';
import { Partners } from '@/entities';
import { Image } from '@/components/ui/image';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function PartnersPage() {
  const [partners, setPartners] = useState<Partners[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadPartners();
  }, []);

  const loadPartners = async () => {
    setIsLoading(true);
    try {
      const result = await BaseCrudService.getAll<Partners>('partners');
      setPartners(result.items);
    } catch (error) {
      console.error('Failed to load partners:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-primary">
      <Header />

      {/* Hero Section */}
      <section className="w-full bg-gradient-to-r from-background via-earth-sand/10 to-background py-20 lg:py-28">
        <div className="max-w-[100rem] mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 bg-earth-sand rounded-full mb-8">
              <Users className="text-white" size={40} />
            </div>
            
            <h1 className="font-heading text-5xl lg:text-6xl text-primary-foreground mb-6">
              Our Partner Organizations
            </h1>
            
            <p className="font-paragraph text-lg text-textbody leading-relaxed">
              We're grateful to collaborate with these wonderful organizations who share our commitment to serving the community. Together, we create a stronger network of support and care.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Partner - Specialty Food Bank */}
      <section className="w-full py-16 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://static.wixstatic.com/media/1560bb_757b469d76bb425496a3a33d50d388f7~mv2.png?originWidth=1200&originHeight=600"
            alt="Background pattern"
            className="w-full h-full object-cover opacity-5 grayscale mix-blend-overlay"
          />
        </div>
        <div className="max-w-[100rem] mx-auto px-6 lg:px-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-earth-warm rounded-lg overflow-hidden"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-10 lg:p-16 flex flex-col justify-center">
                <div className="inline-block px-4 py-2 bg-primary bg-opacity-30 rounded-full text-white font-paragraph text-sm mb-6 w-fit">
                  Featured Partner
                </div>
                
                <h2 className="font-heading text-4xl text-white mb-6">
                  Specialty Food Bank
                </h2>
                
                <p className="font-paragraph text-lg text-white leading-relaxed mb-8">
                  A sister organization dedicated to providing specialized food assistance and resources to those in need. Their innovative approach and commitment to dignity align perfectly with our mission.
                </p>
                
                <a
                  href="https://www.specialtyfoodbank.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 px-8 py-3 bg-primary text-textbody font-paragraph text-base rounded-lg hover:opacity-90 transition-opacity w-fit"
                >
                  <span>Visit Their Website</span>
                  <ExternalLink size={18} />
                </a>
              </div>
              
              <div className="bg-primary bg-opacity-20 p-10 lg:p-16 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-32 h-32 bg-primary rounded-full flex items-center justify-center mb-6 mx-auto">
                    <Users className="text-secondary" size={64} />
                  </div>
                  <p className="font-paragraph text-base text-secondary-foreground">
                    Working together to serve our communities with compassion and excellence
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* All Partners */}
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
              Community Partners
            </h2>
            <p className="font-paragraph text-lg text-textbody max-w-3xl mx-auto">
              These organizations work alongside us to create a comprehensive support network for our community.
            </p>
          </motion.div>

          {isLoading ? null : partners.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <Users className="mx-auto mb-6 text-secondary" size={64} />
              <h3 className="font-heading text-3xl text-primary-foreground mb-4">
                Building Our Network
              </h3>
              <p className="font-paragraph text-lg text-textbody max-w-2xl mx-auto">
                We're actively developing partnerships with local organizations. Check back soon to see our growing network of community partners.
              </p>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {partners.map((partner, index) => (
                <motion.div
                  key={partner._id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-background border border-bordersubtle rounded-lg overflow-hidden hover:border-earth-warm transition-colors"
                >
                  {partner.logo && (
                    <div className="aspect-video bg-primary bg-opacity-50 flex items-center justify-center p-8">
                      <Image
                        src={partner.logo}
                        alt={`${partner.organizationName} logo`}
                        width={400}
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                  )}
                  
                  <div className="p-8">
                    <h3 className="font-heading text-2xl text-primary-foreground mb-3">
                      {partner.organizationName || 'Partner Organization'}
                    </h3>
                    
                    {partner.partnershipFocus && (
                      <div className="inline-block px-3 py-1 bg-earth-warm bg-opacity-20 rounded-full text-earth-warm font-paragraph text-sm mb-4">
                        {partner.partnershipFocus}
                      </div>
                    )}
                    
                    {partner.description && (
                      <p className="font-paragraph text-base text-textbody leading-relaxed mb-6">
                        {partner.description}
                      </p>
                    )}
                    
                    {partner.websiteUrl && (
                      <a
                        href={partner.websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-2 text-earth-warm hover:text-primary-foreground transition-colors font-paragraph text-base"
                      >
                        <span>Visit Website</span>
                        <ExternalLink size={16} />
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Partnership Opportunities */}
      <section className="w-full bg-background py-20 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://static.wixstatic.com/media/1560bb_e0ee9499fd6a4d288399e67c05a7b6d9~mv2.png?originWidth=1200&originHeight=600"
            alt="Background pattern"
            className="w-full h-full object-cover opacity-5 grayscale mix-blend-overlay"
          />
        </div>
        <div className="max-w-[100rem] mx-auto px-6 lg:px-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h2 className="font-heading text-4xl lg:text-5xl text-primary-foreground mb-6">
              Become a Partner
            </h2>
            
            <p className="font-paragraph text-lg text-textbody leading-relaxed mb-10">
              Are you part of an organization that shares our values and mission? We'd love to explore partnership opportunities to better serve our community together.
            </p>
            
            <a
              href="mailto:info@bellevillefoodbank.org?subject=Partnership Inquiry"
              className="inline-block px-10 py-4 bg-earth-warm text-white font-paragraph text-lg rounded-lg hover:opacity-90 transition-opacity"
            >
              Contact Us About Partnerships
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

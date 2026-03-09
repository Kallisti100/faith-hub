import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Image } from '@/components/ui/image';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { BaseCrudService } from '@/integrations';
import { Partners } from '@/entities';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

export default function JoinMissionPage() {
  const [partners, setPartners] = useState<Partners[]>([]);
  const [isLoadingPartners, setIsLoadingPartners] = useState(true);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    organizationName: '',
    roleAffiliation: '',
    organizationEmail: '',
    phoneNumber: '',
    partnershipType: [] as string[],
    preferredInvolvement: '',
    resourcesAvailable: [] as string[],
    organizationContribution: [] as string[],
    organizationDescription: '',
    additionalComments: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    loadPartners();
  }, []);

  const loadPartners = async () => {
    try {
      const result = await BaseCrudService.getAll<Partners>('partners');
      setPartners(result.items || []);
    } catch (error) {
      console.error('Error loading partners:', error);
    } finally {
      setIsLoadingPartners(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field as keyof typeof prev].includes(value)
        ? (prev[field as keyof typeof prev] as string[]).filter(item => item !== value)
        : [...(prev[field as keyof typeof prev] as string[]), value]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await BaseCrudService.create('devotionalsubscriptions', {
        _id: crypto.randomUUID(),
        subscriberName: `${formData.firstName} ${formData.lastName}`,
        subscriberEmail: formData.organizationEmail,
        subscriberPhone: formData.phoneNumber,
        subscriptionDate: new Date(),
        isActive: true,
        devotionalTheme: formData.organizationName,
        deliveryFrequency: formData.preferredInvolvement,
        subscriptionMethod: formData.partnershipType.join(', ')
      });

      setSubmitSuccess(true);
      setFormData({
        firstName: '',
        lastName: '',
        organizationName: '',
        roleAffiliation: '',
        organizationEmail: '',
        phoneNumber: '',
        partnershipType: [],
        preferredInvolvement: '',
        resourcesAvailable: [],
        organizationContribution: [],
        organizationDescription: '',
        additionalComments: ''
      });

      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      {/* Hero Section with Background Image */}
      <section className="relative w-full max-w-[120rem] mx-auto px-4 py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://static.wixstatic.com/media/1560bb_757b469d76bb425496a3a33d50d388f7~mv2.png?originWidth=1200&originHeight=600"
            alt="Background pattern"
            className="w-full h-full object-cover opacity-10 grayscale mix-blend-overlay"
          />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center relative z-10"
        >
          <h1 className="font-heading text-6xl md:text-7xl mb-6 text-buttonbackground">
            Join Our Mission
          </h1>
          <p className="font-paragraph text-lg md:text-xl text-textlight max-w-2xl mx-auto">
            Partner with us to fight food insecurity and strengthen our community. Together, we can make a real difference.
          </p>
        </motion.div>
      </section>

      {/* Partnership Benefits Section */}
      <section className="w-full max-w-[120rem] mx-auto px-4 py-20 bg-primary/30 rounded-lg relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://static.wixstatic.com/media/1560bb_e0ee9499fd6a4d288399e67c05a7b6d9~mv2.png?originWidth=1200&originHeight=600"
            alt="Background pattern"
            className="w-full h-full object-cover opacity-5 grayscale mix-blend-overlay"
          />
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative z-10"
        >
          <h2 className="font-heading text-4xl md:text-5xl mb-12 text-buttonbackground text-center">
            Why Partner With Us?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Community Impact",
                description: "Make a tangible difference in the lives of families facing food insecurity in our community."
              },
              {
                title: "Brand Recognition",
                description: "Gain visibility and positive brand association through meaningful community engagement."
              },
              {
                title: "Employee Engagement",
                description: "Strengthen team culture through volunteer opportunities and shared purpose."
              },
              {
                title: "Corporate Recognition",
                description: "Be recognized as a community leader committed to social responsibility."
              },
              {
                title: "Flexible Partnerships",
                description: "Choose how you want to contribute—donations, volunteering, sponsorships, or collaboration."
              },
              {
                title: "Measurable Results",
                description: "See the direct impact of your contribution through our transparent reporting."
              }
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-background p-8 rounded-lg border border-bordersubtle"
              >
                <h3 className="font-heading text-xl mb-3 text-buttonbackground">
                  {benefit.title}
                </h3>
                <p className="font-paragraph text-textbody leading-relaxed">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Current Partners Section */}
      <section className="w-full max-w-[120rem] mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="font-heading text-4xl md:text-5xl mb-12 text-buttonbackground text-center">
            Our Partners Making an Impact
          </h2>
          {isLoadingPartners ? (
            <div className="flex justify-center py-12">
              <LoadingSpinner />
            </div>
          ) : partners.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {partners.map((partner, index) => (
                <motion.div
                  key={partner._id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-primary/20 border border-bordersubtle rounded-lg p-8 flex flex-col items-center text-center"
                >
                  {partner.logo && (
                    <Image
                      src={partner.logo}
                      alt={partner.organizationName || 'Partner logo'}
                      width={150}
                      height={100}
                      className="mb-4 max-h-24 object-contain"
                    />
                  )}
                  <h3 className="font-heading text-xl mb-2 text-buttonbackground">
                    {partner.organizationName}
                  </h3>
                  {partner.partnershipFocus && (
                    <p className="font-paragraph text-sm text-textlight mb-3">
                      {partner.partnershipFocus}
                    </p>
                  )}
                  {partner.description && (
                    <p className="font-paragraph text-textbody text-sm leading-relaxed mb-4">
                      {partner.description}
                    </p>
                  )}
                  {partner.websiteUrl && (
                    <a
                      href={partner.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-buttonbackground hover:text-secondary transition-colors text-sm font-paragraph"
                    >
                      Visit Website →
                    </a>
                  )}
                </motion.div>
              ))}
            </div>
          ) : (
            <p className="text-center text-textlight font-paragraph">
              No partners listed yet. Be the first to join our mission!
            </p>
          )}
        </motion.div>
      </section>

      {/* Sign-Up Form Section */}
      <section className="w-full max-w-[120rem] mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="font-heading text-4xl md:text-5xl mb-12 text-buttonbackground text-center">
            Sign Up to Partner With Us
          </h2>

          {submitSuccess && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-buttonbackground/20 border border-buttonbackground text-textbody p-4 rounded-lg mb-8 text-center font-paragraph"
            >
              Thank you for your interest! We'll be in touch soon to discuss partnership opportunities.
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="bg-primary/30 rounded-lg p-8 md:p-12 border border-bordersubtle">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <motion.div {...fadeInUp}>
                <label className="block font-paragraph text-textbody mb-2">
                  First Name *
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-background border border-bordersubtle rounded px-4 py-2 text-textbody font-paragraph focus:outline-none focus:border-buttonbackground"
                />
              </motion.div>

              <motion.div {...fadeInUp} transition={{ delay: 0.1 }}>
                <label className="block font-paragraph text-textbody mb-2">
                  Last Name *
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-background border border-bordersubtle rounded px-4 py-2 text-textbody font-paragraph focus:outline-none focus:border-buttonbackground"
                />
              </motion.div>

              <motion.div {...fadeInUp} transition={{ delay: 0.2 }}>
                <label className="block font-paragraph text-textbody mb-2">
                  Organization Name *
                </label>
                <input
                  type="text"
                  name="organizationName"
                  value={formData.organizationName}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-background border border-bordersubtle rounded px-4 py-2 text-textbody font-paragraph focus:outline-none focus:border-buttonbackground"
                />
              </motion.div>

              <motion.div {...fadeInUp} transition={{ delay: 0.3 }}>
                <label className="block font-paragraph text-textbody mb-2">
                  Role or Affiliation *
                </label>
                <input
                  type="text"
                  name="roleAffiliation"
                  value={formData.roleAffiliation}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-background border border-bordersubtle rounded px-4 py-2 text-textbody font-paragraph focus:outline-none focus:border-buttonbackground"
                />
              </motion.div>

              <motion.div {...fadeInUp} transition={{ delay: 0.4 }}>
                <label className="block font-paragraph text-textbody mb-2">
                  Organization Email *
                </label>
                <input
                  type="email"
                  name="organizationEmail"
                  value={formData.organizationEmail}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-background border border-bordersubtle rounded px-4 py-2 text-textbody font-paragraph focus:outline-none focus:border-buttonbackground"
                />
              </motion.div>

              <motion.div {...fadeInUp} transition={{ delay: 0.5 }}>
                <label className="block font-paragraph text-textbody mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-background border border-bordersubtle rounded px-4 py-2 text-textbody font-paragraph focus:outline-none focus:border-buttonbackground"
                />
              </motion.div>
            </div>

            {/* Partnership Type */}
            <motion.div {...fadeInUp} transition={{ delay: 0.6 }} className="mb-6">
              <label className="block font-paragraph text-textbody mb-3">
                Partnership Type (Select all that apply) *
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  'Sponsorship Opportunities',
                  'Food Donations',
                  'Volunteer Engagement',
                  'Fundraising',
                  'Collaboration',
                  'Event Sponsorship',
                  'Media and Public Relations'
                ].map(type => (
                  <label key={type} className="flex items-center font-paragraph text-textbody cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.partnershipType.includes(type)}
                      onChange={() => handleCheckboxChange('partnershipType', type)}
                      className="mr-3 w-4 h-4 rounded border-bordersubtle"
                    />
                    {type}
                  </label>
                ))}
              </div>
            </motion.div>

            {/* Preferred Level of Involvement */}
            <motion.div {...fadeInUp} transition={{ delay: 0.7 }} className="mb-6">
              <label className="block font-paragraph text-textbody mb-2">
                Preferred Level of Involvement *
              </label>
              <select
                name="preferredInvolvement"
                value={formData.preferredInvolvement}
                onChange={handleInputChange}
                required
                className="w-full bg-background border border-bordersubtle rounded px-4 py-2 text-textbody font-paragraph focus:outline-none focus:border-buttonbackground"
              >
                <option value="">Select an option</option>
                <option value="one-time">One-Time Partnership</option>
                <option value="ongoing">Ongoing Partnership</option>
              </select>
            </motion.div>

            {/* Resources Available */}
            <motion.div {...fadeInUp} transition={{ delay: 0.8 }} className="mb-6">
              <label className="block font-paragraph text-textbody mb-3">
                Estimated Resources You Can Provide (Select all that apply) *
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  'Monetary Donation',
                  'Surplus Food',
                  'Volunteer Hours',
                  'Event Hosting Support',
                  'Other'
                ].map(resource => (
                  <label key={resource} className="flex items-center font-paragraph text-textbody cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.resourcesAvailable.includes(resource)}
                      onChange={() => handleCheckboxChange('resourcesAvailable', resource)}
                      className="mr-3 w-4 h-4 rounded border-bordersubtle"
                    />
                    {resource}
                  </label>
                ))}
              </div>
            </motion.div>

            {/* How Organization Can Contribute */}
            <motion.div {...fadeInUp} transition={{ delay: 0.9 }} className="mb-6">
              <label className="block font-paragraph text-textbody mb-3">
                How Do You See Your Organization Contributing? (Select all that apply) *
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  'Financial Support',
                  'Food or Resource Donations',
                  'Volunteer Services',
                  'Logistic Transport Assistance',
                  'Other'
                ].map(contribution => (
                  <label key={contribution} className="flex items-center font-paragraph text-textbody cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.organizationContribution.includes(contribution)}
                      onChange={() => handleCheckboxChange('organizationContribution', contribution)}
                      className="mr-3 w-4 h-4 rounded border-bordersubtle"
                    />
                    {contribution}
                  </label>
                ))}
              </div>
            </motion.div>

            {/* Organization Description */}
            <motion.div {...fadeInUp} transition={{ delay: 1 }} className="mb-6">
              <label className="block font-paragraph text-textbody mb-2">
                Tell Us About Your Organization *
              </label>
              <textarea
                name="organizationDescription"
                value={formData.organizationDescription}
                onChange={handleInputChange}
                required
                rows={4}
                className="w-full bg-background border border-bordersubtle rounded px-4 py-2 text-textbody font-paragraph focus:outline-none focus:border-buttonbackground"
                placeholder="Share your organization's mission, values, and why you want to partner with us..."
              />
            </motion.div>

            {/* Additional Comments */}
            <motion.div {...fadeInUp} transition={{ delay: 1.1 }} className="mb-8">
              <label className="block font-paragraph text-textbody mb-2">
                Additional Comments
              </label>
              <textarea
                name="additionalComments"
                value={formData.additionalComments}
                onChange={handleInputChange}
                rows={3}
                className="w-full bg-background border border-bordersubtle rounded px-4 py-2 text-textbody font-paragraph focus:outline-none focus:border-buttonbackground"
                placeholder="Any additional information you'd like to share..."
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              viewport={{ once: true }}
            >
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-buttonbackground hover:bg-secondary text-buttonforeground font-paragraph py-3 rounded transition-colors"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Partnership Application'}
              </Button>
            </motion.div>
          </form>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}

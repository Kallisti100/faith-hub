import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Mail, Phone, Heart } from 'lucide-react';
import { BaseCrudService } from '@/integrations';
import { BibleStudies, DevotionalSubscriptions } from '@/entities';
import { Image } from '@/components/ui/image';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { format } from 'date-fns';

export default function SpiritPage() {
  const [bibleStudies, setBibleStudies] = useState<BibleStudies[]>([]);
  const [isLoadingStudies, setIsLoadingStudies] = useState(true);
  const [isSubmittingStudy, setIsSubmittingStudy] = useState(false);
  const [isSubmittingDevotional, setIsSubmittingDevotional] = useState(false);
  const [selectedStudy, setSelectedStudy] = useState<string | null>(null);

  const [studyFormData, setStudyFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const [devotionalFormData, setDevotionalFormData] = useState({
    name: '',
    email: '',
    phone: '',
    theme: 'Daily Inspiration',
    frequency: 'Daily',
    emailDelivery: true,
    smsDelivery: false,
  });

  useEffect(() => {
    loadBibleStudies();
  }, []);

  const loadBibleStudies = async () => {
    setIsLoadingStudies(true);
    try {
      const result = await BaseCrudService.getAll<BibleStudies>('biblestudies');
      setBibleStudies(result.items);
    } catch (error) {
      console.error('Failed to load bible studies:', error);
    } finally {
      setIsLoadingStudies(false);
    }
  };

  const handleStudySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStudy) return;
    
    setIsSubmittingStudy(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    alert('Successfully registered for Bible study! You will receive confirmation and details soon.');
    setStudyFormData({ name: '', email: '', phone: '' });
    setSelectedStudy(null);
    setIsSubmittingStudy(false);
  };

  const handleDevotionalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingDevotional(true);
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    alert('Successfully subscribed to devotionals! You will start receiving them according to your preferences.');
    setDevotionalFormData({
      name: '',
      email: '',
      phone: '',
      theme: 'Daily Inspiration',
      frequency: 'Daily',
      emailDelivery: true,
      smsDelivery: false,
    });
    setIsSubmittingDevotional(false);
  };

  const formatDate = (dateString?: Date | string) => {
    if (!dateString) return 'Date TBA';
    try {
      const date = typeof dateString === 'string' ? new Date(dateString) : dateString;
      return format(date, 'MMMM d, yyyy');
    } catch {
      return 'Date TBA';
    }
  };

  return (
    <div className="min-h-screen bg-primary">
      <Header />

      {/* Hero Section with Background Image */}
      <section className="relative w-full bg-background py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://static.wixstatic.com/media/1560bb_e0ee9499fd6a4d288399e67c05a7b6d9~mv2.png?originWidth=1200&originHeight=600"
            alt="Background pattern"
            className="w-full h-full object-cover opacity-10 grayscale mix-blend-overlay"
          />
        </div>
        <div className="max-w-[100rem] mx-auto px-6 lg:px-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 bg-secondary rounded-full mb-8">
              <BookOpen className="text-secondary-foreground" size={40} />
            </div>
            
            <h1 className="font-heading text-5xl lg:text-6xl text-primary-foreground mb-6">
              Food for the Spirit
            </h1>
            
            <p className="font-paragraph text-lg text-textbody leading-relaxed">
              Nourish your soul with our spiritual growth programs. Join Bible study groups or receive daily devotionals to strengthen your faith and deepen your relationship with God.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Bible Studies Section */}
      <section className="w-full py-20 bg-primary relative overflow-hidden">
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
            className="text-center mb-12"
          >
            <h2 className="font-heading text-4xl lg:text-5xl text-primary-foreground mb-4">
              Bible Study Programs
            </h2>
            <p className="font-paragraph text-lg text-textbody max-w-3xl mx-auto">
              Join our community in exploring Scripture together. Our Bible studies offer fellowship, learning, and spiritual growth.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Bible Studies List */}
            <div className="min-h-[400px]">
              {isLoadingStudies ? null : bibleStudies.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-background border border-bordersubtle rounded-lg p-10 text-center"
                >
                  <BookOpen className="mx-auto mb-4 text-secondary" size={48} />
                  <h3 className="font-heading text-2xl text-primary-foreground mb-3">
                    New Studies Coming Soon
                  </h3>
                  <p className="font-paragraph text-base text-textbody">
                    We're preparing new Bible study programs. Check back soon or contact us for more information.
                  </p>
                </motion.div>
              ) : (
                <div className="space-y-6">
                  {bibleStudies.map((study, index) => (
                    <motion.div
                      key={study._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className={`bg-background border-2 rounded-lg p-6 cursor-pointer transition-all ${
                        selectedStudy === study._id
                          ? 'border-secondary'
                          : 'border-bordersubtle hover:border-secondary'
                      }`}
                      onClick={() => setSelectedStudy(study._id)}
                    >
                      {study.studyImage && (
                        <div className="mb-4 rounded-lg overflow-hidden">
                          <Image
                            src={study.studyImage}
                            alt={study.studyTopic || 'Bible study'}
                            width={600}
                            className="w-full h-48 object-cover"
                          />
                        </div>
                      )}
                      
                      <h3 className="font-heading text-2xl text-primary-foreground mb-3">
                        {study.studyTopic || 'Bible Study'}
                      </h3>
                      
                      {study.description && (
                        <p className="font-paragraph text-base text-textbody leading-relaxed mb-4">
                          {study.description}
                        </p>
                      )}
                      
                      <div className="space-y-2 text-sm">
                        {study.leaderName && (
                          <p className="font-paragraph text-textbody">
                            <span className="text-secondary">Leader:</span> {study.leaderName}
                          </p>
                        )}
                        {study.meetingSchedule && (
                          <p className="font-paragraph text-textbody">
                            <span className="text-secondary">Schedule:</span> {study.meetingSchedule}
                          </p>
                        )}
                        {study.startDate && (
                          <p className="font-paragraph text-textbody">
                            <span className="text-secondary">Starts:</span> {formatDate(study.startDate)}
                          </p>
                        )}
                      </div>
                      
                      {study.signUpUrl && (
                        <a
                          href={study.signUpUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block mt-4 text-secondary hover:text-primary-foreground transition-colors font-paragraph text-sm underline"
                          onClick={(e) => e.stopPropagation()}
                        >
                          External Sign-up Link
                        </a>
                      )}
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Bible Study Registration Form */}
            <div>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-background border border-bordersubtle rounded-lg p-8 lg:sticky lg:top-24"
              >
                <h3 className="font-heading text-3xl text-primary-foreground mb-6">
                  Register for Bible Study
                </h3>
                
                <p className="font-paragraph text-base text-textbody mb-8 leading-relaxed">
                  {selectedStudy 
                    ? 'Fill out the form below to join this Bible study program.'
                    : 'Select a Bible study from the list to register.'}
                </p>

                <form onSubmit={handleStudySubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="study-name" className="font-paragraph text-base text-textbody mb-2 block">
                      Full Name *
                    </Label>
                    <Input
                      id="study-name"
                      type="text"
                      required
                      disabled={!selectedStudy}
                      value={studyFormData.name}
                      onChange={(e) => setStudyFormData({ ...studyFormData, name: e.target.value })}
                      className="bg-primary border-bordersubtle text-textbody"
                      placeholder="Enter your name"
                    />
                  </div>

                  <div>
                    <Label htmlFor="study-email" className="font-paragraph text-base text-textbody mb-2 block">
                      Email Address *
                    </Label>
                    <Input
                      id="study-email"
                      type="email"
                      required
                      disabled={!selectedStudy}
                      value={studyFormData.email}
                      onChange={(e) => setStudyFormData({ ...studyFormData, email: e.target.value })}
                      className="bg-primary border-bordersubtle text-textbody"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <div>
                    <Label htmlFor="study-phone" className="font-paragraph text-base text-textbody mb-2 block">
                      Phone Number
                    </Label>
                    <Input
                      id="study-phone"
                      type="tel"
                      disabled={!selectedStudy}
                      value={studyFormData.phone}
                      onChange={(e) => setStudyFormData({ ...studyFormData, phone: e.target.value })}
                      className="bg-primary border-bordersubtle text-textbody"
                      placeholder="(123) 456-7890"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={!selectedStudy || isSubmittingStudy}
                    className="w-full bg-buttonbackground text-buttonforeground hover:opacity-90 font-paragraph text-lg py-6 rounded-lg"
                  >
                    {isSubmittingStudy ? 'Registering...' : 'Register for Study'}
                  </Button>
                </form>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Devotional Subscription Section */}
      <section className="w-full py-20 bg-secondary relative overflow-hidden">
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
            className="text-center mb-12"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-full mb-6">
              <Heart className="text-secondary" size={32} />
            </div>
            
            <h2 className="font-heading text-4xl lg:text-5xl text-secondary-foreground mb-4">
              Daily Devotionals
            </h2>
            <p className="font-paragraph text-lg text-secondary-foreground max-w-3xl mx-auto">
              Receive inspiring devotional messages delivered directly to your inbox or phone. Start each day with spiritual encouragement and biblical wisdom.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-2xl mx-auto bg-primary rounded-lg p-8 lg:p-12"
          >
            <h3 className="font-heading text-3xl text-primary-foreground mb-8 text-center">
              Subscribe to Devotionals
            </h3>

            <form onSubmit={handleDevotionalSubmit} className="space-y-6">
              <div>
                <Label htmlFor="dev-name" className="font-paragraph text-base text-textbody mb-2 block">
                  Full Name *
                </Label>
                <Input
                  id="dev-name"
                  type="text"
                  required
                  value={devotionalFormData.name}
                  onChange={(e) => setDevotionalFormData({ ...devotionalFormData, name: e.target.value })}
                  className="bg-background border-bordersubtle text-textbody"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <Label htmlFor="dev-email" className="font-paragraph text-base text-textbody mb-2 block">
                  Email Address *
                </Label>
                <Input
                  id="dev-email"
                  type="email"
                  required
                  value={devotionalFormData.email}
                  onChange={(e) => setDevotionalFormData({ ...devotionalFormData, email: e.target.value })}
                  className="bg-background border-bordersubtle text-textbody"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <Label htmlFor="dev-phone" className="font-paragraph text-base text-textbody mb-2 block">
                  Phone Number
                </Label>
                <Input
                  id="dev-phone"
                  type="tel"
                  value={devotionalFormData.phone}
                  onChange={(e) => setDevotionalFormData({ ...devotionalFormData, phone: e.target.value })}
                  className="bg-background border-bordersubtle text-textbody"
                  placeholder="(123) 456-7890"
                />
              </div>

              <div>
                <Label htmlFor="dev-theme" className="font-paragraph text-base text-textbody mb-2 block">
                  Devotional Theme
                </Label>
                <select
                  id="dev-theme"
                  value={devotionalFormData.theme}
                  onChange={(e) => setDevotionalFormData({ ...devotionalFormData, theme: e.target.value })}
                  className="w-full px-4 py-2 bg-background border border-bordersubtle text-textbody rounded-lg font-paragraph text-base"
                >
                  <option value="Daily Inspiration">Daily Inspiration</option>
                  <option value="Prayer & Meditation">Prayer & Meditation</option>
                  <option value="Scripture Study">Scripture Study</option>
                  <option value="Faith & Life">Faith & Life</option>
                </select>
              </div>

              <div>
                <Label htmlFor="dev-frequency" className="font-paragraph text-base text-textbody mb-2 block">
                  Delivery Frequency
                </Label>
                <select
                  id="dev-frequency"
                  value={devotionalFormData.frequency}
                  onChange={(e) => setDevotionalFormData({ ...devotionalFormData, frequency: e.target.value })}
                  className="w-full px-4 py-2 bg-background border border-bordersubtle text-textbody rounded-lg font-paragraph text-base"
                >
                  <option value="Daily">Daily</option>
                  <option value="Weekly">Weekly</option>
                  <option value="Monthly">Monthly</option>
                </select>
              </div>

              <div className="space-y-4 pt-4 border-t border-bordersubtle">
                <p className="font-paragraph text-base text-primary-foreground font-semibold">
                  Delivery Method
                </p>

                <div className="flex items-center space-x-3">
                  <Checkbox
                    id="emailDelivery"
                    checked={devotionalFormData.emailDelivery}
                    onCheckedChange={(checked) => 
                      setDevotionalFormData({ ...devotionalFormData, emailDelivery: checked as boolean })
                    }
                  />
                  <Label 
                    htmlFor="emailDelivery" 
                    className="font-paragraph text-base text-textbody cursor-pointer flex items-center space-x-2"
                  >
                    <Mail size={18} className="text-secondary" />
                    <span>Email delivery</span>
                  </Label>
                </div>

                <div className="flex items-center space-x-3">
                  <Checkbox
                    id="smsDelivery"
                    checked={devotionalFormData.smsDelivery}
                    onCheckedChange={(checked) => 
                      setDevotionalFormData({ ...devotionalFormData, smsDelivery: checked as boolean })
                    }
                  />
                  <Label 
                    htmlFor="smsDelivery" 
                    className="font-paragraph text-base text-textbody cursor-pointer flex items-center space-x-2"
                  >
                    <Phone size={18} className="text-secondary" />
                    <span>SMS/Text delivery</span>
                  </Label>
                </div>
              </div>

              <Button
                type="submit"
                disabled={isSubmittingDevotional}
                className="w-full bg-buttonbackground text-buttonforeground hover:opacity-90 font-paragraph text-lg py-6 rounded-lg"
              >
                {isSubmittingDevotional ? 'Subscribing...' : 'Subscribe Now'}
              </Button>
            </form>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

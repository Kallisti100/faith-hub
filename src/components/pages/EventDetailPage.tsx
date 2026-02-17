import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Users, ArrowLeft, Mail, Phone } from 'lucide-react';
import { BaseCrudService } from '@/integrations';
import { Events } from '@/entities';
import { Image } from '@/components/ui/image';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { format } from 'date-fns';

export default function EventDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<Events | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    emailNotifications: true,
    smsNotifications: false,
  });

  useEffect(() => {
    loadEvent();
  }, [id]);

  const loadEvent = async () => {
    if (!id) return;
    setIsLoading(true);
    try {
      const data = await BaseCrudService.getById<Events>('events', id);
      setEvent(data);
    } catch (error) {
      console.error('Failed to load event:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    alert('Registration successful! You will receive notifications about this event.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      emailNotifications: true,
      smsNotifications: false,
    });
    setIsSubmitting(false);
  };

  const formatEventDate = (dateString?: Date | string) => {
    if (!dateString) return 'Date TBA';
    try {
      const date = typeof dateString === 'string' ? new Date(dateString) : dateString;
      return format(date, 'EEEE, MMMM d, yyyy');
    } catch {
      return 'Date TBA';
    }
  };

  const formatEventTime = (timeValue?: any) => {
    if (!timeValue) return 'Time TBA';
    if (typeof timeValue === 'string') return timeValue;
    return 'Time TBA';
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-primary">
        <Header />
        <div className="flex items-center justify-center py-32 min-h-[600px]">
          <LoadingSpinner />
        </div>
        <Footer />
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-primary">
        <Header />
        <div className="max-w-[100rem] mx-auto px-6 lg:px-12 py-20 min-h-[600px]">
          <div className="text-center">
            <h1 className="font-heading text-4xl text-primary-foreground mb-6">
              Event Not Found
            </h1>
            <p className="font-paragraph text-lg text-textbody mb-8">
              The event you're looking for doesn't exist or has been removed.
            </p>
            <Link 
              to="/events"
              className="inline-block px-8 py-3 bg-buttonbackground text-buttonforeground font-paragraph text-base rounded-lg hover:opacity-90 transition-opacity"
            >
              Back to Events
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary">
      <Header />

      {/* Back Button */}
      <div className="w-full bg-background py-6">
        <div className="max-w-[100rem] mx-auto px-6 lg:px-12">
          <Link 
            to="/events"
            className="inline-flex items-center space-x-2 text-textbody hover:text-primary-foreground transition-colors font-paragraph text-base"
          >
            <ArrowLeft size={20} />
            <span>Back to Events</span>
          </Link>
        </div>
      </div>

      {/* Event Details */}
      <section className="w-full py-16">
        <div className="max-w-[100rem] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Column - Event Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              {event.eventImage && (
                <div className="mb-8 rounded-lg overflow-hidden">
                  <Image
                    src={event.eventImage}
                    alt={event.eventName || 'Event image'}
                    width={800}
                    className="w-full"
                  />
                </div>
              )}

              <h1 className="font-heading text-4xl lg:text-5xl text-primary-foreground mb-6">
                {event.eventName || 'Untitled Event'}
              </h1>

              <div className="space-y-4 mb-8">
                <div className="flex items-center space-x-4">
                  <Calendar className="text-secondary flex-shrink-0" size={24} />
                  <span className="font-paragraph text-lg text-textbody">
                    {formatEventDate(event.eventDate)}
                  </span>
                </div>

                <div className="flex items-center space-x-4">
                  <Clock className="text-secondary flex-shrink-0" size={24} />
                  <span className="font-paragraph text-lg text-textbody">
                    {formatEventTime(event.eventTime)}
                  </span>
                </div>

                {event.location && (
                  <div className="flex items-start space-x-4">
                    <MapPin className="text-secondary flex-shrink-0 mt-1" size={24} />
                    <span className="font-paragraph text-lg text-textbody">
                      {event.location}
                    </span>
                  </div>
                )}

                {event.isRegistrationRequired && (
                  <div className="flex items-center space-x-4">
                    <Users className="text-secondary flex-shrink-0" size={24} />
                    <span className="font-paragraph text-lg text-textbody">
                      Registration Required
                    </span>
                  </div>
                )}
              </div>

              {event.description && (
                <div className="bg-background border border-bordersubtle rounded-lg p-8">
                  <h2 className="font-heading text-2xl text-primary-foreground mb-4">
                    About This Event
                  </h2>
                  <p className="font-paragraph text-base text-textbody leading-relaxed whitespace-pre-wrap">
                    {event.description}
                  </p>
                </div>
              )}
            </motion.div>

            {/* Right Column - Registration Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-background border border-bordersubtle rounded-lg p-8 lg:sticky lg:top-24">
                <h2 className="font-heading text-3xl text-primary-foreground mb-6">
                  Register for This Event
                </h2>
                
                <p className="font-paragraph text-base text-textbody mb-8 leading-relaxed">
                  Sign up to receive notifications and updates about this event via email or text message.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="name" className="font-paragraph text-base text-textbody mb-2 block">
                      Full Name *
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="bg-primary border-bordersubtle text-textbody"
                      placeholder="Enter your name"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email" className="font-paragraph text-base text-textbody mb-2 block">
                      Email Address *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="bg-primary border-bordersubtle text-textbody"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone" className="font-paragraph text-base text-textbody mb-2 block">
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="bg-primary border-bordersubtle text-textbody"
                      placeholder="(123) 456-7890"
                    />
                  </div>

                  <div className="space-y-4 pt-4 border-t border-bordersubtle">
                    <p className="font-paragraph text-base text-primary-foreground font-semibold">
                      Notification Preferences
                    </p>

                    <div className="flex items-center space-x-3">
                      <Checkbox
                        id="emailNotifications"
                        checked={formData.emailNotifications}
                        onCheckedChange={(checked) => 
                          setFormData({ ...formData, emailNotifications: checked as boolean })
                        }
                      />
                      <Label 
                        htmlFor="emailNotifications" 
                        className="font-paragraph text-base text-textbody cursor-pointer flex items-center space-x-2"
                      >
                        <Mail size={18} className="text-secondary" />
                        <span>Email notifications</span>
                      </Label>
                    </div>

                    <div className="flex items-center space-x-3">
                      <Checkbox
                        id="smsNotifications"
                        checked={formData.smsNotifications}
                        onCheckedChange={(checked) => 
                          setFormData({ ...formData, smsNotifications: checked as boolean })
                        }
                      />
                      <Label 
                        htmlFor="smsNotifications" 
                        className="font-paragraph text-base text-textbody cursor-pointer flex items-center space-x-2"
                      >
                        <Phone size={18} className="text-secondary" />
                        <span>SMS/Text notifications</span>
                      </Label>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-buttonbackground text-buttonforeground hover:opacity-90 font-paragraph text-lg py-6 rounded-lg"
                  >
                    {isSubmitting ? 'Registering...' : 'Complete Registration'}
                  </Button>
                </form>

                {event.registrationLink && (
                  <div className="mt-6 pt-6 border-t border-bordersubtle">
                    <p className="font-paragraph text-sm text-textbody mb-3">
                      Or register through our external form:
                    </p>
                    <a
                      href={event.registrationLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block text-secondary hover:text-primary-foreground transition-colors font-paragraph text-base underline"
                    >
                      External Registration Link
                    </a>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

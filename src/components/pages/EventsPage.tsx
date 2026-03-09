import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Users } from 'lucide-react';
import { BaseCrudService } from '@/integrations';
import { Events } from '@/entities';
import { Image } from '@/components/ui/image';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { format } from 'date-fns';

export default function EventsPage() {
  const [events, setEvents] = useState<Events[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    setIsLoading(true);
    try {
      const result = await BaseCrudService.getAll<Events>('events');
      setEvents(result.items);
    } catch (error) {
      console.error('Failed to load events:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatEventDate = (dateString?: Date | string) => {
    if (!dateString) return 'Date TBA';
    try {
      const date = typeof dateString === 'string' ? new Date(dateString) : dateString;
      return format(date, 'MMMM d, yyyy');
    } catch {
      return 'Date TBA';
    }
  };

  const formatEventTime = (timeValue?: any) => {
    if (!timeValue) return 'Time TBA';
    if (typeof timeValue === 'string') return timeValue;
    return 'Time TBA';
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
            <h1 className="font-heading text-5xl lg:text-6xl text-primary-foreground mb-6">
              Upcoming Events
            </h1>
            <p className="font-paragraph text-lg text-textbody leading-relaxed">
              Join us for our community events, food distribution programs, and special gatherings. Register today to receive notifications and stay connected with our ministry.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Events Listing */}
      <section className="w-full py-20 min-h-[600px]">
        <div className="max-w-[100rem] mx-auto px-6 lg:px-12">
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <LoadingSpinner />
            </div>
          ) : events.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <Calendar className="mx-auto mb-6 text-secondary" size={64} />
              <h2 className="font-heading text-3xl text-primary-foreground mb-4">
                No Events Scheduled
              </h2>
              <p className="font-paragraph text-lg text-textbody max-w-2xl mx-auto">
                Check back soon for upcoming events and programs. You can also contact us directly for more information about our services.
              </p>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {events.map((event, index) => (
                <motion.div
                  key={event._id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link 
                    to={`/events/${event._id}`}
                    className="block bg-background border border-bordersubtle rounded-lg overflow-hidden hover:border-earth-warm transition-colors group"
                  >
                    {event.eventImage && (
                      <div className="aspect-video overflow-hidden">
                        <Image
                          src={event.eventImage}
                          alt={event.eventName || 'Event image'}
                          width={800}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    
                    <div className="p-8">
                      <h2 className="font-heading text-2xl lg:text-3xl text-primary-foreground mb-4 group-hover:text-earth-warm transition-colors">
                        {event.eventName || 'Untitled Event'}
                      </h2>
                      
                      <div className="space-y-3 mb-6">
                        <div className="flex items-center space-x-3">
                          <Calendar className="text-earth-sand flex-shrink-0" size={20} />
                          <span className="font-paragraph text-base text-textbody">
                            {formatEventDate(event.eventDate)}
                          </span>
                        </div>
                        
                        <div className="flex items-center space-x-3">
                          <Clock className="text-earth-clay flex-shrink-0" size={20} />
                          <span className="font-paragraph text-base text-textbody">
                            {formatEventTime(event.eventTime)}
                          </span>
                        </div>
                        
                        {event.location && (
                          <div className="flex items-start space-x-3">
                            <MapPin className="text-earth-taupe flex-shrink-0 mt-1" size={20} />
                            <span className="font-paragraph text-base text-textbody">
                              {event.location}
                            </span>
                          </div>
                        )}
                        
                        {event.isRegistrationRequired && (
                          <div className="flex items-center space-x-3">
                            <Users className="text-earth-warm flex-shrink-0" size={20} />
                            <span className="font-paragraph text-base text-textbody">
                              Registration Required
                            </span>
                          </div>
                        )}
                      </div>
                      
                      {event.description && (
                        <p className="font-paragraph text-base text-textbody leading-relaxed line-clamp-3 mb-6">
                          {event.description}
                        </p>
                      )}
                      
                      <div className="inline-block px-6 py-2 bg-earth-warm text-white font-paragraph text-base rounded-lg group-hover:opacity-90 transition-opacity">
                        View Details & Register
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}\n            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}

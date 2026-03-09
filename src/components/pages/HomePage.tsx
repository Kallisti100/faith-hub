// HPI 1.7-V
import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { Heart, Calendar, Users, BookOpen, ArrowRight, Leaf, Utensils, Mail, Phone } from 'lucide-react';
import { Image } from '@/components/ui/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// --- Types & Interfaces ---
interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}

interface EventItemProps {
  date: string;
  title: string;
  location: string;
  time: string;
}

// --- Components ---

const SectionDivider = () => (
  <div className="w-full flex justify-center items-center py-12 opacity-30">
    <div className="h-px w-24 bg-bordersubtle" />
    <Leaf className="mx-4 text-primary-foreground w-4 h-4" />
    <div className="h-px w-24 bg-bordersubtle" />
  </div>
);

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, icon, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  // Rotate through earthy accent colors
  const accentColors = ['earth-warm', 'earth-sand', 'earth-clay', 'earth-taupe'];
  const accentColor = accentColors[index % accentColors.length];
  const bgColors = ['bg-earth-warm/5', 'bg-earth-sand/5', 'bg-earth-clay/5', 'bg-earth-taupe/5'];
  const bgColor = bgColors[index % bgColors.length];
  const borderColors = ['border-earth-warm/30', 'border-earth-sand/30', 'border-earth-clay/30', 'border-earth-taupe/30'];
  const borderColor = borderColors[index % borderColors.length];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`group relative p-8 border ${borderColor} ${bgColor} hover:bg-secondary/10 transition-colors duration-500 rounded-sm overflow-hidden`}
    >
      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
        {icon}
      </div>
      <div className="relative z-10">
        <div className={`mb-6 inline-block p-3 bg-background/30 rounded-full border border-bordersubtle/20`}>
          {React.cloneElement(icon as React.ReactElement, { className: `w-8 h-8 text-${accentColor}` })}
        </div>
        <h3 className="font-heading text-2xl text-primary-foreground mb-4">{title}</h3>
        <p className="font-paragraph text-textbody/80 leading-relaxed mb-6">
          {description}
        </p>
        <div className={`flex items-center text-sm font-bold text-${accentColor} uppercase tracking-widest group-hover:text-primary-foreground transition-colors`}>
          Learn More <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </motion.div>
  );
};

const EventRow: React.FC<EventItemProps> = ({ date, title, location, time }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="flex flex-col md:flex-row md:items-center justify-between py-8 border-b border-bordersubtle/30 group hover:bg-white/5 transition-colors px-4"
    >
      <div className="flex items-start md:items-center gap-6 mb-4 md:mb-0">
        <span className="font-heading text-3xl text-secondary w-24">{date}</span>
        <div>
          <h4 className="font-heading text-xl text-primary-foreground group-hover:text-white transition-colors">{title}</h4>
          <p className="font-paragraph text-sm text-textbody/60 mt-1">{location}</p>
        </div>
      </div>
      <div className="flex items-center justify-between md:justify-end gap-8 w-full md:w-auto">
        <span className="font-paragraph text-sm text-textbody/80 bg-background/40 px-3 py-1 rounded-full border border-bordersubtle/20">{time}</span>
        <button className="p-2 rounded-full border border-bordersubtle/50 text-primary-foreground hover:bg-secondary hover:text-white hover:border-secondary transition-all">
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </motion.div>
  );
};

export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <div ref={containerRef} className="min-h-screen bg-background overflow-clip selection:bg-secondary selection:text-white">
      <Header />

      {/* --- HERO SECTION --- */}
      {/* Replicating the layout of the inspiration image: Split screen, Left Text, Right Image */}
      <section className="relative w-full min-h-[90vh] flex flex-col lg:flex-row border-b border-bordersubtle/20">
        
        {/* Left Panel: Content */}
        <div className="w-full lg:w-1/2 bg-primary flex flex-col justify-center px-8 md:px-16 lg:px-24 py-20 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-xl"
          >
            <div className="flex items-center gap-3 mb-8">
              <span className="h-px w-12 bg-secondary"></span>
              <span className="font-paragraph text-sm uppercase tracking-[0.2em] text-secondary">Belleville Food Bank</span>
            </div>
            
            <h1 className="font-heading text-6xl md:text-7xl lg:text-8xl text-primary-foreground leading-[0.95] mb-8">
              Nourishing <br />
              <span className="text-secondary italic">Body</span> & Soul
            </h1>
            
            <p className="font-paragraph text-lg text-textbody/80 leading-relaxed mb-12 max-w-md">
              A sanctuary where faith meets action. We provide essential sustenance, spiritual growth, and a compassionate community for all who seek it.
            </p>

            <div className="flex flex-wrap gap-6">
              <Link 
                to="/donate"
                className="group relative px-8 py-4 bg-buttonbackground text-buttonforeground font-paragraph text-sm uppercase tracking-widest overflow-hidden"
              >
                <span className="relative z-10 group-hover:text-white transition-colors">Support Our Mission</span>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
              </Link>
              
              <Link 
                to="/events"
                className="group px-8 py-4 border border-bordersubtle text-primary-foreground font-paragraph text-sm uppercase tracking-widest hover:bg-bordersubtle/10 transition-colors"
              >
                View Calendar
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Right Panel: Image */}
        <div className="w-full lg:w-1/2 relative min-h-[50vh] lg:min-h-auto overflow-hidden bg-[#3A4A3A]">
          <motion.div 
            style={{ y }}
            className="absolute inset-0 w-full h-[120%]"
          >
            <Image 
              src="https://static.wixstatic.com/media/1560bb_7b29c69f0f9246ae8c7c3d647226d2aa~mv2.png?originWidth=1280&originHeight=704"
              alt="Fresh produce and community gathering"
              className="w-full h-full object-cover opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent lg:bg-gradient-to-l lg:from-transparent lg:to-primary/20" />
          </motion.div>

          {/* Floating Badge */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="absolute bottom-12 left-12 lg:left-12 bg-background/90 backdrop-blur-md p-6 border border-bordersubtle/30 max-w-xs"
          >
            <span className="block font-heading text-secondary text-lg mb-1">Next Distribution</span>
            <span className="block font-paragraph text-textbody text-sm mb-3">Join us this Saturday for our weekly community meal.</span>
            <Link to="/events" className="text-xs uppercase tracking-widest text-primary-foreground border-b border-primary-foreground/50 pb-1 hover:text-white hover:border-white transition-colors">
              Get Details
            </Link>
          </motion.div>
        </div>
      </section>

      {/* --- MARQUEE SEPARATOR --- */}
      <div className="w-full bg-gradient-to-r from-secondary via-earth-warm to-earth-sand py-4 overflow-hidden flex items-center">
        <motion.div 
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 20 }}
          className="flex whitespace-nowrap gap-12 px-6"
        >
          {[...Array(8)].map((_, i) => (
            <div key={i} className="flex items-center gap-12">
              <span className="font-heading text-2xl text-secondary-foreground/90">Faith in Action</span>
              <span className="w-2 h-2 rounded-full bg-secondary-foreground/50" />
              <span className="font-heading text-2xl text-secondary-foreground/90">Community Service</span>
              <span className="w-2 h-2 rounded-full bg-secondary-foreground/50" />
              <span className="font-heading text-2xl text-secondary-foreground/90">Spiritual Growth</span>
              <span className="w-2 h-2 rounded-full bg-secondary-foreground/50" />
            </div>
          ))}
        </motion.div>
      </div>

      {/* --- MISSION & SERVICES (Sticky Layout) --- */}
      <section className="w-full max-w-[120rem] mx-auto px-6 md:px-12 py-24 lg:py-32">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          
          {/* Sticky Sidebar */}
          <div className="lg:w-1/3">
            <div className="sticky top-32">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="font-heading text-4xl md:text-5xl text-primary-foreground mb-8 leading-tight">
                  Serving the <br />
                  <span className="text-secondary">Whole Person</span>
                </h2>
                <p className="font-paragraph text-textbody/70 text-lg mb-10 leading-relaxed">
                  Our ministry extends beyond the plate. We believe in nurturing the spirit just as we nourish the body, creating a cycle of hope and renewal.
                </p>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-4 text-textbody/60">
                    <div className="w-12 h-px bg-bordersubtle"></div>
                    <span className="text-sm uppercase tracking-widest">Our Core Pillars</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Scrolling Grid */}
          <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6">
            <ServiceCard 
              index={0}
              title="Meals on Wheels"
              description="Delivering nutritious, hot meals directly to the doorsteps of our elderly and homebound neighbors, ensuring no one goes hungry."
              icon={<Utensils className="w-8 h-8 text-secondary" />}
            />
            <ServiceCard 
              index={1}
              title="Quarterly Events"
              description="Large-scale community gatherings featuring food distribution, health screenings, and family activities to strengthen local bonds."
              icon={<Calendar className="w-8 h-8 text-secondary" />}
            />
            <ServiceCard 
              index={2}
              title="Partner Network"
              description="Collaborating with local farms, businesses, and organizations like Specialty Food Bank to maximize our reach and resources."
              icon={<Users className="w-8 h-8 text-secondary" />}
            />
            <ServiceCard 
              index={3}
              title="Food for the Spirit"
              description="Weekly bible studies, prayer groups, and devotional subscriptions sent via text or email to uplift your soul."
              icon={<BookOpen className="w-8 h-8 text-secondary" />}
            />
          </div>
        </div>
      </section>

      {/* --- FEATURE: FOOD FOR THE SPIRIT (Parallax Background) --- */}
      <section className="relative w-full py-32 lg:py-40 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://static.wixstatic.com/media/1560bb_e0ee9499fd6a4d288399e67c05a7b6d9~mv2.png?originWidth=1152&originHeight=576"
            alt="Open bible on a wooden table"
            className="w-full h-full object-cover opacity-20 grayscale mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-primary/80" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Leaf className="w-12 h-12 text-secondary mx-auto mb-8" />
            <h2 className="font-heading text-4xl md:text-6xl text-primary-foreground mb-8">
              Food for the Spirit
            </h2>
            <p className="font-paragraph text-xl text-textbody/80 mb-12 max-w-2xl mx-auto leading-relaxed">
              "Man shall not live by bread alone." Join our digital ministry to receive daily devotionals, prayer requests, and bible study invitations directly to your phone or inbox.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Link 
                to="/spirit"
                className="inline-flex items-center justify-center px-8 py-4 bg-secondary text-white font-paragraph font-semibold rounded-sm hover:bg-secondary/90 transition-colors"
              >
                <Mail className="w-5 h-5 mr-3" />
                Subscribe to Devotionals
              </Link>
              <Link 
                to="/spirit"
                className="inline-flex items-center justify-center px-8 py-4 border border-bordersubtle text-primary-foreground font-paragraph font-semibold rounded-sm hover:bg-white/5 transition-colors"
              >
                <BookOpen className="w-5 h-5 mr-3" />
                Join Bible Study
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- UPCOMING EVENTS (List Layout) --- */}
      <section className="w-full max-w-[100rem] mx-auto px-6 md:px-12 py-24">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-bordersubtle/20 pb-8">
          <div>
            <h2 className="font-heading text-4xl text-primary-foreground mb-4">Community Calendar</h2>
            <p className="font-paragraph text-textbody/60">Join us at our upcoming gatherings and distributions.</p>
          </div>
          <Link to="/events" className="hidden md:flex items-center text-secondary hover:text-white transition-colors mt-4 md:mt-0">
            View Full Calendar <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </div>

        <div className="flex flex-col">
          <EventRow 
            date="OCT 12"
            title="Fall Harvest Distribution"
            location="Belleville Church Hall"
            time="10:00 AM - 2:00 PM"
          />
          <EventRow 
            date="OCT 15"
            title="Virtual Bible Study: Hope"
            location="Online (Zoom)"
            time="7:00 PM - 8:30 PM"
          />
          <EventRow 
            date="NOV 01"
            title="Community Thanksgiving Prep"
            location="Volunteer Center"
            time="9:00 AM - 4:00 PM"
          />
          <EventRow 
            date="NOV 05"
            title="Wellness & Health Screening"
            location="Community Center Annex"
            time="11:00 AM - 3:00 PM"
          />
        </div>
        
        <div className="mt-8 md:hidden">
          <Link to="/events" className="flex items-center justify-center text-secondary hover:text-white transition-colors w-full py-4 border border-bordersubtle/30 rounded-sm">
            View Full Calendar <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* --- PARTNERS & IMPACT (Grid) --- */}
      <section className="w-full bg-[#2A382A] py-24 border-t border-bordersubtle/10">
        <div className="max-w-[120rem] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-heading text-3xl md:text-4xl text-primary-foreground mb-6">
                Stronger Together
              </h2>
              <p className="font-paragraph text-textbody/70 mb-8 leading-relaxed">
                We are proud to work alongside dedicated organizations that share our vision of a hunger-free community. Through these partnerships, we extend our reach and deepen our impact.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-6 bg-primary border border-bordersubtle/20 flex items-center justify-center h-32 opacity-70 hover:opacity-100 transition-opacity">
                  <span className="font-heading text-xl text-center text-primary-foreground">Specialty<br/>Food Bank</span>
                </div>
                <div className="p-6 bg-primary border border-bordersubtle/20 flex items-center justify-center h-32 opacity-70 hover:opacity-100 transition-opacity">
                  <span className="font-heading text-xl text-center text-primary-foreground">Local<br/>Farms Co-op</span>
                </div>
                <div className="p-6 bg-primary border border-bordersubtle/20 flex items-center justify-center h-32 opacity-70 hover:opacity-100 transition-opacity">
                  <span className="font-heading text-xl text-center text-primary-foreground">Community<br/>Health Alliance</span>
                </div>
                <div className="p-6 bg-primary border border-bordersubtle/20 flex items-center justify-center h-32 opacity-70 hover:opacity-100 transition-opacity">
                  <span className="font-heading text-xl text-center text-primary-foreground">Belleville<br/>Outreach</span>
                </div>
              </div>
            </div>
            
            <div className="relative h-[500px] w-full overflow-hidden rounded-sm">
               <Image 
                src="https://static.wixstatic.com/media/1560bb_757b469d76bb425496a3a33d50d388f7~mv2.png?originWidth=768&originHeight=448"
                alt="Volunteers working together"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-transparent flex items-center p-12">
                <div className="max-w-xs">
                  <div className="text-5xl font-heading text-secondary mb-2">1,200+</div>
                  <div className="text-xl text-primary-foreground mb-6">Families Served Monthly</div>
                  <div className="h-px w-16 bg-secondary mb-6"></div>
                  <p className="text-textbody/80 text-sm">Your donations make this possible. Every dollar contributes directly to purchasing fresh food and supplies.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="w-full py-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-secondary/10" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-heading text-5xl md:text-7xl text-primary-foreground mb-8">
              Sow a Seed of Hope
            </h2>
            <p className="font-paragraph text-xl text-textbody/80 mb-12 max-w-2xl mx-auto">
              Whether through volunteering your time or providing financial support, your contribution plants the seeds for a healthier, more spiritually connected community.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Link 
                to="/donate"
                className="px-10 py-5 bg-secondary text-white font-paragraph text-lg font-semibold rounded-sm hover:bg-secondary/90 transition-all shadow-lg shadow-secondary/20 hover:shadow-secondary/40 hover:-translate-y-1"
              >
                Donate Now
              </Link>
              <Link 
                to="/events"
                className="px-10 py-5 bg-transparent border-2 border-bordersubtle text-primary-foreground font-paragraph text-lg font-semibold rounded-sm hover:border-primary-foreground hover:text-white transition-all"
              >
                Volunteer With Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
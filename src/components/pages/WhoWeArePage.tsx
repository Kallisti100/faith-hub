import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Image } from '@/components/ui/image';
import { motion } from 'framer-motion';

export default function WhoWeArePage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

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
            src="https://static.wixstatic.com/media/1560bb_51a3fcae5b3f4abdba35d1236fcdac96~mv2.png?originWidth=1200&originHeight=600"
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
            Who We Are
          </h1>
          <p className="font-paragraph text-lg md:text-xl text-textlight max-w-2xl mx-auto">
            Driven by faith and compassion, we're building a stronger community through food security and human dignity.
          </p>
        </motion.div>
      </section>

      {/* Our Story Section */}
      <section id="story" className="w-full max-w-[120rem] mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div {...fadeInUp}>
            <h2 className="font-heading text-4xl md:text-5xl mb-6 text-buttonbackground">
              Our Story
            </h2>
            <p className="font-paragraph text-base md:text-lg text-textbody mb-4 leading-relaxed">
              Founded on the belief that no one should go hungry, our food bank has grown into a vital resource for our community. What started as a small initiative has blossomed into a comprehensive network dedicated to fighting food insecurity.
            </p>
            <p className="font-paragraph text-base md:text-lg text-textbody leading-relaxed">
              Every day, we work tirelessly to ensure that families in need have access to nutritious food and the support they deserve. Our mission is rooted in compassion, dignity, and the conviction that together, we can create lasting change.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Image
              src="https://static.wixstatic.com/media/1560bb_51a3fcae5b3f4abdba35d1236fcdac96~mv2.png?originWidth=448&originHeight=384"
              alt="Our story - community gathering"
              width={500}
              height={400}
              className="rounded-lg w-full"
            />
          </motion.div>
        </div>
      </section>

      {/* Team in Action Section */}
      <section id="team" className="w-full max-w-[120rem] mx-auto px-4 py-20 bg-primary/30 rounded-lg relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://static.wixstatic.com/media/1560bb_49a020e0166d4855958fef2033d9abf2~mv2.png?originWidth=1200&originHeight=600"
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
            Team in Action
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Dedicated Staff",
                description: "Our passionate team members work every day to distribute food, support families, and build community connections."
              },
              {
                title: "Committed Volunteers",
                description: "Hundreds of volunteers give their time and energy to sort, pack, and distribute food to those in need."
              },
              {
                title: "Community Partners",
                description: "We collaborate with local organizations, businesses, and faith communities to maximize our impact."
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-background p-8 rounded-lg border border-bordersubtle"
              >
                <h3 className="font-heading text-2xl mb-4 text-buttonbackground">
                  {item.title}
                </h3>
                <p className="font-paragraph text-textbody leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Faith in Action Section */}
      <section id="faith" className="w-full max-w-[120rem] mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Image
              src="https://static.wixstatic.com/media/1560bb_49a020e0166d4855958fef2033d9abf2~mv2.png?originWidth=448&originHeight=384"
              alt="Faith in action - community service"
              width={500}
              height={400}
              className="rounded-lg w-full"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h2 className="font-heading text-4xl md:text-5xl mb-6 text-buttonbackground">
              Faith in Action
            </h2>
            <p className="font-paragraph text-base md:text-lg text-textbody mb-4 leading-relaxed">
              Our work is guided by faith and the belief that we are called to serve the most vulnerable among us. We see every person we serve as a reflection of our shared humanity.
            </p>
            <p className="font-paragraph text-base md:text-lg text-textbody mb-4 leading-relaxed">
              Whether through prayer, service, or community action, we embody the values of compassion, justice, and hope. Our faith motivates us to go beyond charity and work toward systemic change.
            </p>
            <p className="font-paragraph text-base md:text-lg text-textbody leading-relaxed">
              Together, we're not just feeding people—we're building a community where everyone has dignity, opportunity, and hope.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Impact Section */}
      <section id="impact" className="w-full max-w-[120rem] mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="font-heading text-4xl md:text-5xl mb-12 text-buttonbackground text-center">
            Our Impact
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { number: "50K+", label: "Meals Distributed" },
              { number: "5K+", label: "Families Served" },
              { number: "500+", label: "Active Volunteers" },
              { number: "100+", label: "Community Partners" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-buttonbackground/10 border border-buttonbackground/30 rounded-lg p-8 text-center"
              >
                <div className="font-heading text-4xl md:text-5xl text-buttonbackground mb-2">
                  {stat.number}
                </div>
                <p className="font-paragraph text-textbody">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}

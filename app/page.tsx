"use client";

import { Button } from "@/components/ui/button";
import { Trophy, Users, ShoppingBag, Newspaper, ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { TypeAnimation } from 'react-type-animation';
import Lottie from "lottie-react";
import tournamentAnimation from "@/animations/tournament.json";
import communityAnimation from "@/animations/community.json";
import marketplaceAnimation from "@/animations/marketplace.json";
import newsAnimation from "@/animations/news.json";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <div className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10 z-0" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-1/2 left-1/2 transform -translate-x-1/2 w-[1000px] h-[1000px] rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/10 rounded-full blur-3xl" />
        </div>

        {/* Rest of your existing content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
          {/* Your existing content remains exactly the same */}
          <div className="text-center space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                <TypeAnimation
                  sequence={[
                    'Tanzania Gaming Hub',
                    3000,
                    'TGH Community',
                    2000,
                    'Play Together',
                    2000,
                  ]}
                  wrapper="span"
                  speed={50}
                  repeat={Infinity}
                  className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent"
                />
              </h1>
              <p className="mt-6 text-xl text-muted-foreground max-w-2xl mx-auto">
                Join the largest gaming community in Tanzania. Compete, connect, and level up your gaming experience.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="flex flex-wrap gap-4 justify-center"
            >
              <Button size="lg" asChild>
                <Link href="/tournaments">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/community">Join Community</Link>
              </Button>
            </motion.div>

            {/* Feature Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16"
            >
              {[
                {
                  icon: Trophy,
                  title: "Tournaments",
                  description: "Compete in exciting gaming tournaments",
                },
                {
                  icon: Users,
                  title: "Community",
                  description: "Connect with fellow gamers",
                },
                {
                  icon: ShoppingBag,
                  title: "Marketplace",
                  description: "Buy and sell gaming gear",
                },
                {
                  icon: Newspaper,
                  title: "News",
                  description: "Stay updated with gaming news",
                },
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
                  className="group relative overflow-hidden rounded-lg bg-card p-6 hover:shadow-lg transition-all"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <feature.icon className="h-8 w-8 text-primary mb-4" />
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
        {/* Feature Sections */}
        <div className="relative space-y-32">
          {/* Tournament Section */}
          <section className="py-32 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="relative min-h-[600px] flex items-center">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="relative z-10 bg-card/80 backdrop-blur-sm rounded-xl p-12 lg:p-16 lg:w-[65%] shadow-lg"
                >
                  <span className="text-sm font-medium text-primary mb-4 block">Featured Tournaments</span>
                  <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                    Competitive Gaming Tournaments
                  </h2>
                  <div className="mt-6 space-y-4 text-lg text-muted-foreground max-w-2xl">
                    <p>
                      Experience the thrill of competitive gaming at its finest. Our tournaments feature:
                    </p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>Multiple game titles and formats</li>
                      <li>Professional organization and fair play</li>
                      <li>Substantial prize pools and rewards</li>
                      <li>Live streaming and commentary</li>
                      <li>Community-driven events and championships</li>
                    </ul>
                    <p>
                      Join players from across Tanzania and compete for glory, prizes, and recognition in our
                      growing esports ecosystem.
                    </p>
                  </div>
                  <div className="mt-8 flex flex-wrap gap-4">
                    <Button size="lg" asChild>
                      <Link href="/tournaments">
                        Explore Tournaments
                        <Trophy className="ml-2 h-5 w-5" />
                      </Link>
                    </Button>
                    <Button size="lg" variant="outline" asChild>
                      <Link href="/schedule">View Schedule</Link>
                    </Button>
                  </div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, scale: 1.1 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8 }}
                  className="absolute top-0 right-0 w-[60%] h-full lg:-right-12 z-0"
                >
                  <div className="relative h-full rounded-xl overflow-hidden">
                    <Image
                      src="https://images.unsplash.com/photo-1542751371-adc38448a05e"
                      alt="Gaming Tournament"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-l from-background via-background/20 to-transparent" />
                  </div>
                </motion.div>
              </div>
            </div>
          </section>
          
          {/* Community Section - Reversed layout */}
          <section className="py-32 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="relative min-h-[600px] flex items-center justify-end">
                <motion.div
                  initial={{ opacity: 0, scale: 1.1 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8 }}
                  className="absolute top-0 left-0 w-[60%] h-full lg:-left-12 z-0"
                >
                  <div className="relative h-full rounded-xl overflow-hidden">
                    <Image
                      src="https://images.unsplash.com/photo-1511882150382-421056c89033"
                      alt="Gaming Community"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-background via-background/20 to-transparent" />
                  </div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="relative z-10 bg-card/80 backdrop-blur-sm rounded-xl p-12 lg:p-16 lg:w-[65%] shadow-lg"
                >
                  <span className="text-sm font-medium text-primary mb-4 block">Join Our Community</span>
                  {/* Similar detailed content structure as Tournament section */}
                </motion.div>
              </div>
            </div>
          </section>
          
          {/* Marketplace Section */}
          <section className="py-32 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="relative min-h-[600px] flex items-center">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="relative z-10 bg-card/80 backdrop-blur-sm rounded-xl p-12 lg:p-16 lg:w-[65%] shadow-lg"
                >
                  <span className="text-sm font-medium text-primary mb-4 block">Gaming Marketplace</span>
                  <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                    Trade Gaming Gear
                  </h2>
                  <div className="mt-6 space-y-4 text-lg text-muted-foreground max-w-2xl">
                    <p>
                      Your one-stop destination for all gaming equipment. Our marketplace offers:
                    </p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>Verified sellers and secure transactions</li>
                      <li>New and pre-owned gaming hardware</li>
                      <li>Custom gaming peripherals</li>
                      <li>Limited edition collectibles</li>
                      <li>Trade-in options and special deals</li>
                    </ul>
                    <p>
                      Find the best deals on consoles, accessories, and gaming merchandise from trusted community members.
                    </p>
                  </div>
                  <div className="mt-8 flex flex-wrap gap-4">
                    <Button size="lg" asChild>
                      <Link href="/marketplace">
                        Browse Store
                        <ShoppingBag className="ml-2 h-5 w-5" />
                      </Link>
                    </Button>
                    <Button size="lg" variant="outline" asChild>
                      <Link href="/sell">Start Selling</Link>
                    </Button>
                  </div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, scale: 1.1 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8 }}
                  className="absolute top-0 right-0 w-[60%] h-full lg:-right-12 z-0"
                >
                  <div className="relative h-full rounded-xl overflow-hidden">
                    <Image
                      src="https://images.unsplash.com/photo-1597872200969-2b65d56bd16b"
                      alt="Gaming Marketplace"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-l from-background via-background/20 to-transparent" />
                  </div>
                </motion.div>
              </div>
            </div>
          </section>
          
          {/* News Section */}
          <section className="py-32 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="relative min-h-[600px] flex items-center justify-end">
                <motion.div
                  initial={{ opacity: 0, scale: 1.1 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8 }}
                  className="absolute top-0 left-0 w-[60%] h-full lg:-left-12 z-0"
                >
                  <div className="relative h-full rounded-xl overflow-hidden">
                    <Image
                      src="https://images.unsplash.com/photo-1550745165-9bc0b252726f"
                      alt="Gaming News"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-background via-background/20 to-transparent" />
                  </div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="relative z-10 bg-card/80 backdrop-blur-sm rounded-xl p-12 lg:p-16 lg:w-[65%] shadow-lg"
                >
                  <span className="text-sm font-medium text-primary mb-4 block">Latest Updates</span>
                  <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                    Gaming News & Updates
                  </h2>
                  <div className="mt-6 space-y-4 text-lg text-muted-foreground max-w-2xl">
                    <p>
                      Stay informed with the latest in gaming. Our news coverage includes:
                    </p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>Tournament results and highlights</li>
                      <li>Community spotlights and interviews</li>
                      <li>Game reviews and recommendations</li>
                      <li>Industry updates and trends</li>
                      <li>Exclusive event coverage</li>
                    </ul>
                    <p>
                      Never miss important announcements and stay connected with the Tanzanian gaming scene.
                    </p>
                  </div>
                  <div className="mt-8 flex flex-wrap gap-4">
                    <Button size="lg" asChild>
                      <Link href="/news">
                        Read Latest
                        <Newspaper className="ml-2 h-5 w-5" />
                      </Link>
                    </Button>
                    <Button size="lg" variant="outline" asChild>
                      <Link href="/subscribe">Subscribe</Link>
                    </Button>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
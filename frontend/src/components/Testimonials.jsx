
import React from 'react';
import { motion } from 'framer-motion';
import { Star, Music2 } from 'lucide-react';

const Testimonials = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 10,
      },
    },
  };

  const testimonials = [
    {
      quote: "BeatPlayr is a game changer for my commute! Finally, an offline music app that's simple, beautiful, and respects my battery life. No more ads or buffering!",
      author: "Alex Rivera",
      role: "Daily Commuter",
      rating: 5,
      avatar: "alex-rivera-commuter"
    },
    {
      quote: "I love the clean interface of BeatPlayr. It's so easy to find and play my downloaded songs. The sound quality is fantastic too. Highly recommend for Android users.",
      author: "Mia Khalifa",
      role: "Music Enthusiast",
      rating: 5,
      avatar: "mia-khalifa-music-lover"
    },
    {
      quote: "As someone who travels a lot, BeatPlayr is essential. I can load up all my playlists and listen for hours without needing Wi-Fi. A must-have app!",
      author: "Jordan Lee",
      role: "Frequent Traveler",
      rating: 5,
      avatar: "jordan-lee-traveler"
    },
    {
      quote: "The best offline music player I've used on Android. It's lightweight, fast, and does exactly what it promises. The deep blue-purple theme is also very cool.",
      author: "Casey Williams",
      role: "Android Power User",
      rating: 5,
      avatar: "casey-williams-android-user"
    },
    {
      quote: "BeatPlayr's focus on offline playback is perfect for my workouts at the gym where reception is spotty. Plus, no annoying interruptions from ads!",
      author: "Dana Scully",
      role: "Fitness Buff",
      rating: 5,
      avatar: "dana-scully-fitness"
    },
    {
      quote: "I was looking for a simple, elegant offline music player, and BeatPlayr delivered. It's a joy to use, and I can't wait for it to hit the Play Store.",
      author: "Fox Mulder",
      role: "Student",
      rating: 5,
      avatar: "fox-mulder-student"
    },
  ];

  const CustomIcon = ({ className }) => (
  <svg 
    className={className}
    viewBox="0 0 276.164 276.164"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g>
      <path d="M156.716,61.478c-4.111,6.276-8.881,11.511-14.212,15.609l-8.728,6.962c-13.339,11.855-22.937,21.433-28.542,28.464
        c-10.209,12.788-15.806,25.779-16.65,38.611c-0.942,14.473,3.187,28.21,12.275,40.84c9.636,13.458,21.8,20.754,36.164,21.69
        c3.291,0.218,6.897,0.182,9.896-0.015l-1.121-10.104c-2.09,0.192-4.306,0.223-6.628,0.068c-9.437-0.617-17.864-4.511-25.064-11.573
        c-7.524-7.333-10.895-15.415-10.287-24.7c1.149-17.59,12.562-35.004,33.925-51.792l9.543-7.599
        c8.394-7.174,15.192-16.191,20.216-26.825c4.971-10.556,7.886-21.983,8.673-33.96c0.466-7.037-0.513-15.775-2.874-25.965
        c-3.241-13.839-7.854-20.765-14.136-21.179c-2.232-0.138-4.676,0.986-7.658,3.617c-7.252,6.548-12.523,14.481-15.683,23.542
        c-2.438,6.926-4.057,16.189-4.805,27.529c-0.313,4.72,0.313,13.438,1.805,23.962l8.844-8.192c-0.028-1.183,0.005-2.413,0.096-3.703
        c0.466-7.221,2.289-15.062,5.394-23.293c3.956-10.296,7.689-13.409,10.133-14.204c0.668-0.218,1.32-0.298,2.015-0.254
        c3.185,0.212,6.358,1.559,5.815,9.979C164.664,46.132,161.831,53.693,156.716,61.478z"/>
      <path d="M164.55,209.161c5.728-2.568,10.621-6.478,14.576-11.651c5.055-6.561,7.897-14.316,8.467-23.047
        c0.72-10.719-1.854-20.438-7.617-28.895c-6.322-9.264-14.98-14.317-25.745-15.026c-1.232-0.081-2.543-0.075-3.895,0.025
        l-2.304-17.191l-9.668,7.112l1.483,12.194c-5.789,2.393-10.827,6.17-15.017,11.255c-4.823,5.924-7.508,12.443-7.964,19.382
        c-0.466,7.208,1.142,13.81,4.782,19.583c1.895,3.081,4.507,5.82,7.498,8.058c4.906,3.65,10.563,3.376,11.459,1.393
        c0.906-1.983-2.455-5.095-5.09-9.248c-1.502-2.351-2.242-5.173-2.242-8.497c0-7.053,4.256-13.116,10.317-15.799l5.673,44.211
        l1.325,10.258c0.864,4.873,1.719,9.725,2.537,14.52c1,6.488,1.352,12.112,1.041,16.715c-0.419,6.375-2.408,11.584-5.919,15.493
        c-2.234,2.485-4.844,4.055-7.795,4.925c3.961-3.962,6.414-9.43,6.414-15.478c0-12.075-9.792-21.872-21.87-21.872
        c-3.353,0-6.491,0.812-9.329,2.159c-0.36,0.155-0.699,0.388-1.054,0.574c-0.779,0.425-1.559,0.85-2.286,1.362
        c-0.249,0.187-0.487,0.403-0.732,0.605c-4.888,3.816-8.091,9.616-8.375,16.229c0,0.01-0.011,0.021-0.011,0.031
        c0,0.005,0,0.01,0,0.016c-0.013,0.311-0.09,0.59-0.09,0.896c0,0.259,0.067,0.492,0.078,0.74
        c-0.011,7.084,2.933,13.179,8.839,18.118c5.584,4.666,12.277,7.28,19.892,7.777c4.327,0.28,8.505-0.217,12.407-1.485
        c3.189-1.041,6.275-2.62,9.149-4.687c6.96-5.022,10.75-11.584,11.272-19.532c0.399-6.063,0.094-13.235-0.937-21.411l-2.838-18.429
        l-7.156-52.899c7.984,1.532,14.027,8.543,14.027,16.968c0,5.986-1.937,15.431-5.551,20.376L164.55,209.161z"/>
    </g>
  </svg>
  );

  return (
    <section id="testimonials" className="py-20 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.15),transparent_50%)]"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <CustomIcon className="h-24 w-24 text-indigo-400 mx-auto mb-4" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            What <span className="gradient-text">Music Lovers</span> Say
          </h2>
          <p className="text-lg text-foreground/80">
            Hear from users who enjoy their tunes offline with BeatPlayr.
          </p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div 
              key={index} 
              className="testimonial-card"
              variants={itemVariants}
            >
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              
              <blockquote className="mb-6">
                <p className="text-foreground/90 italic">"{testimonial.quote}"</p>
              </blockquote>
              
              <div className="flex items-center">
                <div className="mr-4">
                   <img  class="h-12 w-12 rounded-full object-cover" alt={`Avatar of ${testimonial.author}`} src="https://images.unsplash.com/photo-1694278963813-47ab53e23e58" />
                </div>
                <div>
                  <p className="font-semibold">{testimonial.author}</p>
                  <p className="text-sm text-foreground/70">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;

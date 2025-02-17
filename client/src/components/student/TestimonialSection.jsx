import React from "react";
import { assets, dummyTestimonial } from "../../assets/assets";
import { motion } from "framer-motion";

function TestimonialSection() {
  // Animation Variants
  const slideInFromLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const slideInFromRight = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  return (
    <motion.div
      className="pb-14 px-8 md:px-0"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={staggerContainer}>
      <motion.h2
        className="text-3xl font-medium text-gray-800"
        variants={slideInFromLeft}>
        Testimonials
      </motion.h2>
      <motion.p
        className="md:text-base text-gray-500 mt-3"
        variants={slideInFromLeft}>
        Hear from our learners as they share their journeys of transformation,
        success and how our <br />
        platform has made a difference in their lives
      </motion.p>
      <motion.div
        className="grid grid-cols-[repeat(auto-fit,_minmax(200px,_1fr))] gap-8 mt-14"
        variants={staggerContainer}>
        {dummyTestimonial.map((testimonial, idx) => (
          <motion.div
            key={idx}
            className="text-sm text-left border border-gray-500/30 pb-6 rounded-lg bg-white shadow-[0px_4px_15px_0px] overflow-hidden shadow-black/5 transform transition-transform duration-300 hover:scale-105"
            variants={idx % 2 === 0 ? slideInFromLeft : slideInFromRight} // Alternate left/right
          >
            <div className="flex items-center gap-4 px-5 py-4 bg-gray-500/10">
              <img
                className="h-12 w-12 rounded-full"
                src={testimonial.image}
                alt={`${testimonial.name}_testimonial_img`}
              />
              <div>
                <h1 className="text-lg font-medium text-gray-800">
                  {testimonial.name}
                </h1>
                <p className="text-gray-800/80">{testimonial.role}</p>
              </div>
            </div>
            <div className="p-5 pb-7">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, idx) => (
                  <img
                    className="h-5"
                    key={idx}
                    src={
                      idx < Math.floor(testimonial.rating)
                        ? assets.star
                        : assets.star_blank
                    }
                    alt="star_icon"
                  />
                ))}
              </div>
              <p className="text-gray-500 mt-5">{testimonial.feedback}</p>
            </div>
            <a
              href="#"
              className="text-blue-500 underline px-5 hover:text-blue-300">
              Read more
            </a>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}

export default TestimonialSection;

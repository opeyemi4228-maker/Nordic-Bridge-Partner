'use client'
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Subscribe from "@/components/Subscribe";
import Service from "@/components/Service";
import Education from "@/components/Education";
import About from "@/components/About";
import Testimonials from "@/components/Testimonials";
import Events from "@/components/Event";

const Home = () => {
  return (
    <>
     
      <div className="">
       <Hero />
       <About />
       <Education />
       <Service />
       <Events />
       <Testimonials />
       <Subscribe />
      </div>
 
    </>
  );
};

export default Home;

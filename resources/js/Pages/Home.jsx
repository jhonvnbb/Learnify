import React from 'react';
import Navbar from '../Navbar';
import Hero from '../Hero';
import About from '../About';
// import Packages from '../Packages';
import Testimonials from '../Testimonials';
import Contact from '../Contact';
import Footer from '../Footer';

export default function Home() {
    return (
        <>
            <Navbar />
            <Hero />
            <About />
            {/* <Packages /> */}
            <Testimonials />
            <Contact />
            <Footer />
        </>
    );
}

import Navbar from "./Navbar";
import Hero from "./Hero";
import About from "./About";
import Packages from "./Packages";
import Testimonials from "./Testimonials";
import Contact from "./Contact";
import Footer from "./Footer";

import ReactDOM from "react-dom/client";

const App = () => {

    return (
        <div className="font-sans scroll-smooth bg-white text-gray-800">

            <Navbar />
            <Hero />
            <About />
            <Packages />
            <Testimonials />
            <Contact />
            <Footer />

        </div>
    );
};

ReactDOM.createRoot(document.getElementById("root")).render(<App />);

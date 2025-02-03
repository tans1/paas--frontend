import Footer from "../components/home/footer/footer";
import Navbar from "../components/home/header/navbar";
import Features from "../components/home/info/features";
import Info from "../components/home/info/info";
import Intro from "../components/home/intro/intro";
import Pricing from "../components/home/pricing/pricing";
function Home(){
    window.scrollTo(0, 0);
    return (
        <div className="bg-gradient-to-tr from-indigo-100 to-white">
            <Navbar />
            <Intro />
            <Pricing />
            <Info />
            <Features />
            <Footer />
        </div>
    )
}

export default Home;
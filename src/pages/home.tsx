import Contact from "@/components/molecules/contact";
import Domain from "@/components/molecules/domain";
import Features from "@/components/molecules/features";
import Footer from "@/components/molecules/footer";
import Header from "@/components/molecules/header";
import Hosting from "@/components/molecules/hosting";
import Info from "@/components/molecules/info";
import Intro from "@/components/molecules/intro";
import Prices from "@/components/molecules/prices";

function Home() {
  return (
    <div>
      <Header />
      <Intro />
      <Prices />
      <Info />
      <Domain />
      <Hosting />
      <Features />
      <Contact />
      <Footer />
    </div>
  );
}

export default Home;

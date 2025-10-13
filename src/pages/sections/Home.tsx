import HeroSection from "./HeroSection"
import MainFeatureSection from "./MainFeatureSection"
import Containers from "@/components/ui/Containers";

const Home = () => {

  return (
    <>
      <Containers maxWidth="lg">
        <HeroSection />
        <div className="mt-4">
          <MainFeatureSection />
          
        </div>
      </Containers>
    </>
  );
}

export default Home
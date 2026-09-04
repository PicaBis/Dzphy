import HeroSection from "@/components/home/HeroSection";
import StartHere from "@/components/home/StartHere";
import GradeCards from "@/components/home/GradeCards";
import PlatformGuide from "@/components/home/PlatformGuide";
import StatsCounter from "@/components/home/StatsCounter";
import LatestContent from "@/components/home/LatestContent";
import AppsSection from "@/components/home/AppsSection";
import VideosSection from "@/components/home/VideosSection";
import HomeSocial from "@/components/home/HomeSocial";
import CoursesSection from "@/components/home/CoursesSection";
import WhyDzPhy from "@/components/home/WhyDzPhy";
import AboutSection from "@/components/home/AboutSection";
import Newsletter from "@/components/home/Newsletter";
import SectionDivider from "@/components/ui/SectionDivider";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <SectionDivider type="wave" />
      <StartHere />
      <SectionDivider type="dots" />
      <GradeCards />
      <SectionDivider type="curve" flip />
      <PlatformGuide />
      <SectionDivider type="wave" flip />
      <StatsCounter />
      <SectionDivider type="gradient" />
      <VideosSection />
      <SectionDivider type="zigzag" />
      <HomeSocial />
      <SectionDivider type="wave" flip />
      <LatestContent />
      <SectionDivider type="curve" flip />
      <CoursesSection />
      <SectionDivider type="triangle" />
      <AppsSection />
      <SectionDivider type="wave" dark />
      <WhyDzPhy />
      <SectionDivider type="curve" />
      <Newsletter />
      <SectionDivider type="wave" />
      <AboutSection />
    </>
  );
}

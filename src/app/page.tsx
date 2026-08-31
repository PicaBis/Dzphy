import HeroSection from "@/components/home/HeroSection";
import GradeCards from "@/components/home/GradeCards";
import LatestContent from "@/components/home/LatestContent";
import AppsSection from "@/components/home/AppsSection";
import VideosSection from "@/components/home/VideosSection";
import CoursesSection from "@/components/home/CoursesSection";
import WhyDzPhy from "@/components/home/WhyDzPhy";
import AboutSection from "@/components/home/AboutSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <GradeCards />
      <LatestContent />
      <CoursesSection />
      <AppsSection />
      <VideosSection />
      <WhyDzPhy />
      <AboutSection />
    </>
  );
}

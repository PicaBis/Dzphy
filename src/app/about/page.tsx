import AboutSection from "@/components/home/AboutSection";

export default function AboutPage() {
  return (
    <div className="pt-14 sm:pt-16">
      <div className="bg-gradient-to-br from-orange-500 to-orange-700 text-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-black mb-2 sm:mb-3">من نحن؟</h1>
          <p className="text-orange-100 text-base sm:text-lg">تعرف على الفريق وراء منصة DzPhy</p>
        </div>
      </div>
      <AboutSection />
    </div>
  );
}

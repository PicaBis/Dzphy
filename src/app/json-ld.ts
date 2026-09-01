// JSON-LD structured data for SEO (schema.org WebSite).
export default function jsonLd(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "منصة الأستاذ بيكا للفيزياء",
    alternateName: "منصة الأستاذ بيكا للفيزياء",
    description: "منصة تعليمية جزائرية للفيزياء للطلاب الثانوي",
    url: "https://dzphy.vercel.app",
    inLanguage: "ar-DZ",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://dzphy.vercel.app/search?q={search_term_string}",
      },
      queryInput: "required name=search_term_string",
    },
    author: {
      "@type": "Person",
      name: "Medjahed Abdelhadi",
      url: "https://github.com/PicaBis",
    },
    publisher: {
      "@type": "Person",
      name: "Medjahed Abdelhadi",
    },
  };
}

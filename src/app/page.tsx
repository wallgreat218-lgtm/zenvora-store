import HomeLanding from "../components/HomeLanding";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://www.zenvoraelectronics.store/#organization",
      name: "Zenvora Electronics",
      url: "https://www.zenvoraelectronics.store/",
      logo: "https://www.zenvoraelectronics.store/brand/zenvora-logo.png"
    },
    {
      "@type": "WebSite",
      "@id": "https://www.zenvoraelectronics.store/#website",
      url: "https://www.zenvoraelectronics.store/",
      name: "Zenvora Electronics",
      publisher: { "@id": "https://www.zenvoraelectronics.store/#organization" },
      potentialAction: {
        "@type": "SearchAction",
        target: "https://www.zenvoraelectronics.store/shop?q={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    }
  ]
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <HomeLanding />
    </>
  );
}

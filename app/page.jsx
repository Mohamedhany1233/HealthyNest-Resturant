import Navbar from "../src/shared/components/layout/navbar";
import Hero from "../src/features/hero/components/hero";
import FeaturedSection from "../src/features/hero/components/featured-section";
import CtaSection from "../src/features/hero/components/cta-section";
import Footer from "../src/shared/components/layout/footer";

export const dynamic = "force-dynamic";

function loading(delay) {
  return new Promise((res) => {
    setTimeout(() => {
      res("done");
    }, delay);
  });
}

export default async function Home() {
  await loading(550);
  return (
    <main>
      <Navbar />
      <Hero />
      <FeaturedSection />
      <CtaSection />
      <Footer />
    </main>
  );
}

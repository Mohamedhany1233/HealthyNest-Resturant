import Navbar from "../../src/shared/components/layout/navbar";
import AboutContent from "../../src/features/about/components/about-content";
import Footer from "../../src/shared/components/layout/footer";

export const metadata = {
  title: "عن Healthy Nest | أكل صحي، طعم مميز",
  description:
    "اعرف أكتر عن Healthy Nest - قصتنا، قيمنا، وإزاي بنحضرلك أجود الوجبات الصحية",
};

export const dynamic = "force-dynamic";

function loading(delay) {
  return new Promise((res) => {
    setTimeout(() => {
      res("done");
    }, delay);
  });
}

export default async function AboutPage() {
  await loading(550);
  return (
    <main>
      <Navbar />
      <div className="pt-20">
        <AboutContent />
      </div>
      <Footer />
    </main>
  );
}

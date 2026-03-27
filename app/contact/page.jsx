import Navbar from "../../src/shared/components/layout/navbar";
import ContactContent from "../../src/features/contact/components/contact-content";
import Footer from "../../src/shared/components/layout/footer";

export const metadata = {
  title: "تواصل معانا | Healthy Nest",
  description:
    "تواصل مع Healthy Nest عن طريق واتساب أو التليفون. اطلب أكلك الصحي دلوقتي!",
};

export const dynamic = "force-dynamic";

function loading(delay) {
  return new Promise((res) => {
    setTimeout(() => {
      res("done");
    }, delay);
  });
}

export default async function ContactPage() {
  await loading(550);
  return (
    <main>
      <Navbar />
      <div className="pt-20">
        <ContactContent />
      </div>
      <Footer />
    </main>
  );
}

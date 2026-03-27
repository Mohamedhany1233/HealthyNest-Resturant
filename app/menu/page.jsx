import Navbar from "../../src/shared/components/layout/navbar";
import MenuGrid from "../../src/features/menu/components/menu-grid";
import Footer from "../../src/shared/components/layout/footer";
export const metadata = {
  title: "مينيو هيلثي نيست | Healthy Nest",
  description:
    "اكتشف وجباتنا الصحية اللذيذة - سلطات، بروتين، بولز، مشروبات صحية وأكتر",
};

export const dynamic = "force-dynamic";

function loading(delay) {
  return new Promise((res) => {
    setTimeout(() => {
      res("done");
    }, delay);
  });
}

export default async function MenuPage() {
  await loading(550);
  return (
    <main>
      <Navbar />
      <div className="pt-20">
        <MenuGrid />
      </div>
      <Footer />
    </main>
  );
}

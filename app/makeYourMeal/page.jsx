import Navbar from "../../src/shared/components/layout/navbar";
import MakeYourMeal from "../../src/features/makeYourMeal/components/makeYourMeal";
import Footer from "../../src/shared/components/layout/footer";

export const dynamic = "force-dynamic";

function loading(delay) {
  return new Promise((res) => {
    setTimeout(() => {
      res("done");
    }, delay);
  });
}

export default async function MakeYourMealPage() {
  await loading(550);
  return (
    <main>
      <Navbar />
      <div className="pt-20">
        <MakeYourMeal />
      </div>
      <Footer />
    </main>
  );
}

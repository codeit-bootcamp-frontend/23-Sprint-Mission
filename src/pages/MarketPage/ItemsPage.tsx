import BestSection from "./components/BestSection/BestSection";
import AllSection from "./components/Allsection/AllSection";
import "./ItemsPage.css";

export default function Items() {
  return (
    <main className="itemsPage">
      {/* 베스트 상품 */}
      <section>
        <BestSection />
      </section>

      {/* 전체 상품 */}
      <section>
        <AllSection />
      </section>
    </main>
  );
}
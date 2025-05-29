import Sidebar from "../components/Sidebar";
import Top from "../components/Top";
import "../App.css";
import Background from "../components/Background";
import Card from "../components/Card";

function HomePage() {
  return (
    <>
      <div className="relative z-40">
        <Top />
      </div>
      <main className="flex-1 min-h-screen">
        <section className="flex flex-col items-center justify-center">
          <Card
            title="Camo Tee"
            description="A placeholder t-shirt. Lorem Ipsum."
            image="/camo_placeholder.jpeg"
          />
        </section>
      </main>
    </>
  );
}

export default HomePage;

import Background from "../components/Background";
import Sidebar from "../components/Sidebar";
import Card from "../components/Card";

const FeaturedPage = () => {
  return (
    <>
      <div>
        <Background />
        FeaturedPage
        <Sidebar />
        <Card
          title="Camo Tee"
          description="A placeholder t-shirt. Lorem Ipsum."
          image="/camo_placeholder.jpeg"
        />
      </div>
    </>
  );
};

export default FeaturedPage;

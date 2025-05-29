import Card from "../components/Card";

const FeaturedPage = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center">
        FeaturedPage
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

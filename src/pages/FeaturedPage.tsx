import Card from "../components/Card";

const FeaturedPage = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <div className="flex flex-col p-6 mt-2">
          <h2 className="text-2xl font-semibold text-gray-200">
            Featured Items
          </h2>
        </div>
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

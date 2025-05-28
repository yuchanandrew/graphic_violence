interface CardProps {
  title: string;
  description: string;
  image: string;
}

function Card(props: CardProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-4 transition-all transform hover:scale-105 hover:-translate-y-1">
      <img
        src={props.image}
        alt={props.title}
        className="w-full h-40 object-cover rounded-md"
      />
      <h2 className="text-lg font-semibold mt-2">{props.title}</h2>
      <p className="text-gray-600 text-sm">{props.description}</p>
    </div>
  );
}

export default Card;

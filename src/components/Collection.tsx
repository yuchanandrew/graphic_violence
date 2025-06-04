import { useEffect, useState } from "react";
import axios from "axios";
import Card from "./Card";

axios.defaults.withCredentials = true;

interface Item {
  id: number;
  name: string;
  description: string;
  image_url: string;
  price: string;
}

const Collection = () => {
  const [items, setItems] = useState<Item[]>([]);
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await axios.get("http://localhost:3000/getItems");
        setItems(res.data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchItems();
  }, []);
  return (
    <div className="grid grid-cols-2 gap-4 items-start">
      {items.map((item) => (
        <Card
          key={item.id}
          id={item.id}
          title={item.name}
          description={item.description}
          image={item.image_url}
          price={item.price}
        />
      ))}
    </div>
  );
};

export default Collection;

import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div>
      404 Not Found!
      <Link to="/">Home</Link>
    </div>
  );
};

export default NotFoundPage;

import logo from "../assets/grocket.png";
import { Button } from "../components/tools/buttons/Button";
import { Link } from "@tanstack/react-router";

const NotFoundPage = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <img src={logo} className="w-[100px]" />
      <p className="mt-8 text-4xl font-bold">Oops!</p>
      <p className="mt-2 italic opacity-60">Page not found</p>
      <Link to={"/"} className="mt-8">
        <Button type="button">Go back</Button>
      </Link>
    </div>
  );
};

export default NotFoundPage;

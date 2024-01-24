import { useNavigate } from "@tanstack/react-router";
import { Button } from "../../components/tools/buttons/Button";

const Index = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate({ to: "/prospects/find" });
  };

  return (
    <div>
      <div className="flex justify-end">
        <Button type="button" onClick={handleNavigate}>
          Find Prospects
        </Button>
      </div>
    </div>
  );
};

export default Index;

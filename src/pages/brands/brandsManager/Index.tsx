import { useNavigate } from "@tanstack/react-router";
import BrandsCard from "../../../components/brands/BrandsCard";
import { Button } from "../../../components/tools/buttons/Button";

const Index: React.FC = () => {
  const navigate = useNavigate();

  const handleAdd = () => {
    navigate({ to: "/brands/brands_manager/new" });
  };

  return (
    <>
      <div className="flex mt-4 justify-between mb-6">
        <div>
          <span className="flex gap-2">
            <p>Brands</p> / <p className="text-[#41B2E9]">Brands Management</p>
          </span>
        </div>

        <Button type="button" variant="lightBlue" onClick={handleAdd}>
          Create Brand
        </Button>
      </div>
      <div className="grid grid-cols-3 mt-24 gap-16 ml-9 max-lg:grid-cols-2 max-md:grid-cols-1 max-sm:grid-cols-1">
        <BrandsCard />
      </div>
    </>
  );
};

export default Index;

import { useNavigate } from "@tanstack/react-router";
import BrandsCard from "../../../components/brands/BrandsCard";
import { Button } from "../../../components/tools/buttons/Button";
import { useGetAllBrand } from "../../../services/queries/brandsQueries";
import Spinner from "../../../components/tools/spinner/Spinner";

const Index: React.FC = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useGetAllBrand();

  const handleAdd = () => {
    navigate({ to: "/brands/brands_manager/new" });
  };

  if (isLoading) {
    return (
      <>
        <div className="flex justify-center">
          <Spinner />
        </div>
      </>
    );
  }

  if (!data || !Array.isArray(data)) {
    return <p className="text-center">Error loading brands</p>;
  }

  return (
    <>
      <div className="flex mt-4 justify-between mb-6">
        <div>
          <span className="flex gap-2">
            <p>Brands</p> / <p className="text-[#41B2E9]">Brands Manager</p>
          </span>
        </div>

        <Button type="button" variant="lightBlue" onClick={handleAdd}>
          Create Brand
        </Button>
      </div>
      <div className="grid grid-cols-3 mt-24 gap-16 ml-9 max-lg:grid-cols-2 max-md:grid-cols-1 max-sm:grid-cols-1">
        <BrandsCard brands={data} />
      </div>
    </>
  );
};

export default Index;

import BrandsForm from "../../../components/brands/brandsManager/BrandsForm";
import BrandsPhotoForm from "../../../components/brands/brandsManager/BrandsPhotoForm";
import { useGetBrand } from "../../../services/queries/brandsQueries";
import { brandRoute } from "../../routeTree";

const CreateBrands: React.FC = () => {
  const { brandId } = brandRoute.useParams();
  const { data: brand } = useGetBrand(brandId);
  return (
    <div>
      <div className="flex mt-4 justify-between mb-6">
        <div>
          <span className="flex gap-2">
            <p>Brands</p> / <p>Brands Manager</p> /
            <p className="text-[#41B2E9]">
              {brandId ? brand?.name : "Create Brand"}
            </p>
          </span>
        </div>
      </div>
      <div className="mt-8 flex gap-x-12">
        <BrandsForm brands={brand} brandId={brandId} />
        <BrandsPhotoForm brands={brand} />
      </div>
    </div>
  );
};

export default CreateBrands;

import {
  BarcodeIcon,
  DollarIcon,
  IdcardIcon,
  PencilAlt2,
  TrashIcon2,
} from "../tools/svg/BrandsLogo";
import { Brands, useDeleteBrands } from "../../services/queries/brandsQueries";
import { Link } from "@tanstack/react-router";

type FormProps = {
  brands: Brands[];
};

const BrandsCard: React.FC<FormProps> = ({ brands }) => {
  const { mutate: deleteBrands } = useDeleteBrands();

  const handleDelete = (brandId: number) => {
    deleteBrands(brandId);
  };
  return (
    <>
      {brands.length === 0 && <p>No data found</p>}
      {brands.map((data, i) => (
        <div key={i} className="bg-white">
          <div className="py-20 px-24 pb-0 pt-16">
            <img src={data.logo} alt="Logo" />
          </div>
          <div className="mt-4 px-28 text-black font-bold text-base leading-7">
            {data.name}
          </div>

          <div className=" flex ml-6 mt-4 ">
            <div> {BarcodeIcon}</div>

            <p className="text-base leading-6 text-grGray-light  ml-2">
              Brand Code: {data.code}
            </p>
          </div>
          <div className=" flex ml-6 mt-4 text-base leading-6">
            <div className="mt-1">{DollarIcon}</div>
            <p className="text-base leading-6 text-grGray-light ml-2">
              Currency: {data.currency}
            </p>
          </div>
          <div className="flex ml-6 mt-4 text-base leading-6">
            <div className="mt-1"> {IdcardIcon}</div>
            <p className="text-base leading-6 text-grGray-light  ml-2">
              Address: {data.address}
            </p>
          </div>
          <div className="flex justify-between mb-4 mt-11">
            <div className="flex mt-4  left-10 bg-[#8A99AF] text-base leading-6 w-content">
              <p className="text-base px-5 leading-6 text-white  ml-2">ID: 1</p>
            </div>

            <div className="flex mt-4 gap-4 mr-4 ">
              <button>
                <div className="text-black ">
                  <Link
                    to="/brands/brands_manager/$brandId"
                    params={{ brandId: data.id }}
                  >
                    {PencilAlt2}
                  </Link>
                </div>
              </button>
              <button onClick={() => handleDelete(data.id)}>
                <div>{TrashIcon2}</div>
              </button>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default BrandsCard;

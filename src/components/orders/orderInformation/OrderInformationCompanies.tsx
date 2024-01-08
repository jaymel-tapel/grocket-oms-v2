import React from "react";
import logo from "../../../assets/grocket.png";
import StarsIcons from "../../tools/stars/StarIcons";
import CompanyLinksTable from "./CompanyLinksTable";

const company = {
  name: "Grocket",
  url: "https://g-rocket.me",
};

const scrapedStats = {
  placeInfo: {
    title: "Rechtsanwalt Dr. Dr. Iranbomy",
    address: "Bockenheimer Landstraße 17-19, 60325 Frankfurt am Main",
    business_link: "https://iranbomy.com/",
    telephone: "069 15028264",
    rating: "4.8",
    reviews: 84,
  },
  reviews: [78, 2, 0, 0, 4],
};

const companyLinks = [
  {
    id: 1359,
    status: 1,
    created_at: "2023-03-21T19:38:17.000000Z",
    updated_at: "2023-12-27T02:34:51.000000Z",
    name: "RECHTSANWALT DR. DR. IRANBOMY ",
    latest_check: 0,
    check_url: 1,
    valid_url: 1,
    url: "https://g.page/Rechtsanwalt-Iranbomy?share",
    client_id: 1696,
  },
];

const OrderInformationCompanies: React.FC = () => {
  return (
    <div className="border-b border-grGray-dark">
      <div className="my-8 flex gap-2 items-center">
        <img className="object-cover w-20 mr-2" src={logo} />
        <div className="text-sm flex flex-col">
          <span className="font-medium">{company.name}</span>
          <span>{company.url}</span>
        </div>
      </div>

      <div className="py-4">
        <span className="font-medium">Company</span>
        <div className="mt-4 flex gap-4 lg:gap-8 flex-col lg:flex-row">
          <div className="grid grid-cols-1 lg:w-60">
            <span>{scrapedStats.placeInfo.address}</span>
            <div className="flex gap-4">
              <span className="font-medium">Current Rating:</span>
              {scrapedStats.placeInfo.rating}
            </div>
            <div className="flex gap-4">
              <span className="font-medium">No. of Reviews:</span>
              {scrapedStats.placeInfo.reviews}
            </div>
          </div>

          <div>
            {scrapedStats.reviews.map((review, index) => (
              <StarsIcons
                key={index}
                showLabels={true}
                stars={scrapedStats.reviews.length - index}
                value={review}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="py-4 flex flex-col">
        <span className="font-medium">Client Links</span>
        <CompanyLinksTable companies={companyLinks} />
      </div>
    </div>
  );
};

export default OrderInformationCompanies;

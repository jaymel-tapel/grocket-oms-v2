import SellerReportsDataBox from "../../components/accounts/sellerReports/SellerReportsDataBox";
import SellersReportChart from "../../components/accounts/sellerReports/SellersReportChart";

const SellerReports: React.FC = () => {
  return (
    <>
      <SellerReportsDataBox />

      <div className="mt-4 mb-4 grid grid-cols-12 gap-2  md:mt-4 md:gap-4 2xl:mt-6.5 2xl:gap-6.5">
        <SellersReportChart />
      </div>
    </>
  );
};

export default SellerReports;

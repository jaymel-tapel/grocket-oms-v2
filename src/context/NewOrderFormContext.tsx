import React, { ReactNode, createContext, useContext, useState } from "react";
import { Company, PendingReview } from "../services/queries/companyQueries";

// If you’re familiar with the context API before Hooks,
// useContext(OrderFormContext) is equivalent to static
// contextType = OrderFormContext in a class, or to <OrderFormContext.Consumer>.
// useContext(OrderFormContext) only LETS YOU READ THE 'CONTEXT' & SUBSCRIBE TO IT'S CHANGES.
// You still need a <OrderFormContext.Provider> above in the tree TO PROVIDE THE VALUE FOR THIS CONTEXT.

type SelectSeller = {
  id?: number;
  name: string;
  email: string;
};

type SelectClient = {
  id?: number;
  name: string;
  email: string;
  phone: string;
  third_party_id?: string;
  origin: number;
  industry: number;
  unit_cost: number;
};

type SelectCompany = {
  name: string;
  url: string;
};

type Reviews = PendingReview[];

export type OrderFormContext = {
  step: number;
  seller: SelectSeller;
  client: SelectClient;
  company: SelectCompany;
  companies: SelectCompany[] | Company[];
  reviews: Reviews;
  orderDate: string;
  remarks: string;
  sendConfirmation: boolean;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  setSeller: React.Dispatch<React.SetStateAction<SelectSeller>>;
  setClient: React.Dispatch<React.SetStateAction<SelectClient>>;
  setCompany: React.Dispatch<React.SetStateAction<SelectCompany>>;
  setCompanies: React.Dispatch<
    React.SetStateAction<SelectCompany[] | Company[]>
  >;
  setReviews: React.Dispatch<React.SetStateAction<Reviews>>;
  setOrderDate: React.Dispatch<React.SetStateAction<string>>;
  setRemarks: React.Dispatch<React.SetStateAction<string>>;
  setConfirmation: React.Dispatch<React.SetStateAction<boolean>>;
};

export const OrderFormContext = createContext<OrderFormContext>({
  step: 1,
  seller: { name: "", email: "" },
  client: {
    name: "",
    email: "",
    origin: 1,
    industry: 1,
    unit_cost: 10,
    phone: "",
    third_party_id: "",
  },
  company: { name: "", url: "" },
  companies: [],
  reviews: [],
  orderDate: "",
  remarks: "",
  sendConfirmation: false,
  setStep: () => {},
  setSeller: () => {},
  setClient: () => {},
  setCompany: () => {},
  setCompanies: () => {},
  setReviews: () => {},
  setOrderDate: () => {},
  setRemarks: () => {},
  setConfirmation: () => {},
});

// eslint-disable-next-line react-refresh/only-export-components
export const useOrderForm = () => useContext(OrderFormContext);

type ProviderProps = {
  children: ReactNode;
};

export const OrderFormProvider: React.FC<ProviderProps> = ({ children }) => {
  const [step, setStep] = useState(1);
  const [seller, setSeller] = useState<SelectSeller>({
    name: "",
    email: "",
  });
  const [client, setClient] = useState<SelectClient>({
    name: "",
    email: "",
    origin: 1,
    industry: 1,
    unit_cost: 10,
    phone: "",
    third_party_id: "",
  });
  const [company, setCompany] = useState<SelectCompany>({ name: "", url: "" });
  const [companies, setCompanies] = useState<SelectCompany[] | Company[]>([]);
  const [reviews, setReviews] = useState<Reviews>([]);
  const [orderDate, setOrderDate] = useState("");
  const [remarks, setRemarks] = useState("");
  const [sendConfirmation, setConfirmation] = useState(false);

  return (
    <OrderFormContext.Provider
      value={{
        step,
        seller,
        client,
        company,
        companies,
        reviews,
        orderDate,
        remarks,
        sendConfirmation,
        setStep,
        setSeller,
        setClient,
        setCompany,
        setCompanies,
        setReviews,
        setOrderDate,
        setRemarks,
        setConfirmation,
      }}
    >
      {children}
    </OrderFormContext.Provider>
  );
};

export default OrderFormProvider;

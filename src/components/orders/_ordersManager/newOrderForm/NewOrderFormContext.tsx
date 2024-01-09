import React, { ReactNode, createContext, useContext, useState } from "react";
import { Review } from "../../orderInformation/OrderReviewsTable";

// If you’re familiar with the context API before Hooks,
// useContext(OrderFormContext) is equivalent to static
// contextType = OrderFormContext in a class, or to <OrderFormContext.Consumer>.
// useContext(OrderFormContext) only LETS YOU READ THE 'CONTEXT' & SUBSCRIBE TO IT'S CHANGES.
// You still need a <OrderFormContext.Provider> above in the tree TO PROVIDE THE VALUE FOR THIS CONTEXT.

type SelectSeller = {
  date: string;
  name: string;
  email: string;
};

type SelectClient = {
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

type Reviews = Review[];

export type OrderFormContext = {
  step: number;
  seller: SelectSeller;
  client: SelectClient;
  company: SelectCompany;
  reviews: Reviews;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  setSeller: React.Dispatch<React.SetStateAction<SelectSeller>>;
  setClient: React.Dispatch<React.SetStateAction<SelectClient>>;
  setCompany: React.Dispatch<React.SetStateAction<SelectCompany>>;
  setReviews: React.Dispatch<React.SetStateAction<Reviews>>;
};

export const OrderFormContext = createContext<OrderFormContext>({
  step: 1,
  seller: { name: "", email: "", date: "" },
  client: {
    name: "",
    email: "",
    origin: 1,
    industry: 0,
    unit_cost: 0,
    phone: "",
    third_party_id: "",
  },
  company: { name: "", url: "" },
  reviews: [],
  setStep: () => {},
  setSeller: () => {},
  setClient: () => {},
  setCompany: () => {},
  setReviews: () => {},
});

export const useOrderForm = () => useContext(OrderFormContext);

type ProviderProps = {
  children: ReactNode;
};

export const OrderFormProvider: React.FC<ProviderProps> = ({ children }) => {
  const [step, setStep] = useState(1);
  const [seller, setSeller] = useState<SelectSeller>({
    name: "",
    email: "",
    date: "",
  });
  const [client, setClient] = useState<SelectClient>({
    name: "",
    email: "",
    origin: 0,
    industry: 0,
    unit_cost: 0,
    phone: "",
    third_party_id: "",
  });
  const [company, setCompany] = useState<SelectCompany>({ name: "", url: "" });
  const [reviews, setReviews] = useState<Reviews>([]);

  return (
    <OrderFormContext.Provider
      value={{
        step,
        seller,
        client,
        company,
        reviews,
        setStep,
        setSeller,
        setClient,
        setCompany,
        setReviews,
      }}
    >
      {children}
    </OrderFormContext.Provider>
  );
};

export default OrderFormProvider;

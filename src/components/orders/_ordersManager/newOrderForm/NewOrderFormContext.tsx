import React, { ReactNode, createContext, useContext, useState } from "react";

// If you’re familiar with the context API before Hooks,
// useContext(MyContext) is equivalent to static
// contextType = MyContext in a class, or to <MyContext.Consumer>.
// useContext(MyContext) only LETS YOU READ THE 'CONTEXT' & SUBSCRIBE TO IT'S CHANGES.
// You still need a <MyContext.Provider> above in the tree TO PROVIDE THE VALUE FOR THIS CONTEXT.

type SelectSeller = {
  date: string;
  name: string;
  email: string;
};

type SelectClient = {
  name: string;
  email: string;
  phone: string;
  third_party_id: string;
  client_origin: number;
  industry: number;
  unit_cost: number;
};

type SelectCompany = {
  name: string;
  url: string;
};

export type OrderFormContext = {
  step: number;
  seller: SelectSeller;
  client: SelectClient;
  company: SelectCompany;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  setSeller: React.Dispatch<React.SetStateAction<SelectSeller>>;
  setClient: React.Dispatch<React.SetStateAction<SelectClient>>;
  setCompany: React.Dispatch<React.SetStateAction<SelectCompany>>;
};

export const OrderFormContext = createContext<OrderFormContext>({
  step: 1,
  seller: { name: "", email: "", date: "" },
  client: {
    name: "",
    email: "",
    client_origin: 1,
    industry: 0,
    unit_cost: 0,
    phone: "",
    third_party_id: "",
  },
  company: { name: "", url: "" },
  setStep: () => {},
  setSeller: () => {},
  setClient: () => {},
  setCompany: () => {},
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
    client_origin: 1,
    industry: 0,
    unit_cost: 0,
    phone: "",
    third_party_id: "",
  });
  const [company, setCompany] = useState<SelectCompany>({ name: "", url: "" });

  return (
    <OrderFormContext.Provider
      value={{
        step,
        seller,
        client,
        company,
        setStep,
        setSeller,
        setClient,
        setCompany,
      }}
    >
      {children}
    </OrderFormContext.Provider>
  );
};

export default OrderFormProvider;

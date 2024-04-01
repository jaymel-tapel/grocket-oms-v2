import { useEffect, useMemo, useState } from "react";
import { Button } from "../../tools/buttons/Button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../tools/dialog/Dialog";
import TransferSellersSelector from "./TransferSellersSelector";
import {
  Seller,
  useGetAllSellers,
  useTransferOrders,
} from "../../../services/queries/sellerQueries";
import Pill from "../../tools/pill/Pill";
import { Cross2Icon } from "@radix-ui/react-icons";
import { debounce } from "lodash";
import Spinner from "../../tools/spinner/Spinner";

type Props = {
  onSuccessHandler: () => void;
};

const TransferOrderForm: React.FC<Props> = ({ onSuccessHandler }) => {
  const [step, setStep] = useState(1);
  const [selectedSellers, setSelectedSellers] = useState<Seller[]>([]);
  const [receiverSeller, setReceiverSeller] = useState<Seller[]>([]);
  const [keyword, setKeyword] = useState("");
  const [sellerDraft, setSellerDraft] = useState("");

  const { data: sellers } = useGetAllSellers({
    keyword,
  });

  const { mutateAsync: transferOrders, isPending } = useTransferOrders();

  const isDisabled = useMemo(() => {
    if (step === 1) {
      return selectedSellers.length === 0;
    }

    return receiverSeller.length === 0;
  }, [step, selectedSellers, receiverSeller]);

  const handleRemoveSeller = (sellerId: number) => {
    const newSelectedSellers = selectedSellers.filter(
      (seller) => seller.id !== sellerId
    );
    setSelectedSellers(newSelectedSellers);
  };

  const filteredSellers = useMemo(() => {
    return sellers?.data.filter(
      (seller) => !selectedSellers.some((selected) => seller.id === selected.id)
    );
  }, [sellers, selectedSellers]);

  const handleSubmit = async () => {
    if (step === 1) {
      setStep(2);
      return;
    }

    const response = await transferOrders({
      to_seller_email: receiverSeller[0].email,
      emails: selectedSellers.map((seller) => seller.email),
    });

    if (response.status === 201) {
      onSuccessHandler();
      setSelectedSellers([]);
      setReceiverSeller([]);
    }
  };

  useEffect(() => {
    const debounceSeller = debounce(() => {
      setKeyword(sellerDraft);
    }, 500);

    debounceSeller();
    return () => debounceSeller.cancel();
  }, [sellerDraft]);

  return (
    <DialogContent className="sm:max-w-[450px]">
      <DialogHeader className="gap-2">
        <DialogTitle className="pb-2 text-center font-bold text-[1.25rem] relative before:absolute before:bottom-[0] before:ml-[25%] before:w-[50%] before:flex before:m-0-auto before:content-[''] before:border-b before:border-2 before:border-grBlue-dark">
          You are about to transfer Orders
        </DialogTitle>
        <DialogDescription className="text-center">
          {step === 1
            ? "Step 1: Select email address/es you want to transfer orders from."
            : "Step 2: Select email address you want to send orders to"}
        </DialogDescription>
      </DialogHeader>

      {step === 1 && (
        <>
          <div>
            <TransferSellersSelector
              sellers={filteredSellers ?? []}
              setSelectedSellers={setSelectedSellers}
              setSearchInput={setSellerDraft}
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {selectedSellers.map((seller) => {
              return (
                <Pill key={seller.id} bgColor={"green"}>
                  {seller.email}
                  <Cross2Icon
                    className="size-4 cursor-pointer"
                    onClick={() => handleRemoveSeller(seller.id)}
                  />
                </Pill>
              );
            })}
          </div>
        </>
      )}

      {step === 2 && (
        <div>
          <TransferSellersSelector
            buttonLabel={
              receiverSeller[0]?.email ?? "Select seller to receive orders"
            }
            sellers={sellers?.data ?? []}
            setSelectedSellers={setReceiverSeller}
            setSearchInput={setSellerDraft}
          />
        </div>
      )}

      <DialogFooter>
        {step === 2 && (
          <Button type="button" variant={"green"} onClick={() => setStep(1)}>
            Previous
          </Button>
        )}
        <Button
          type="button"
          onClick={handleSubmit}
          disabled={isDisabled || isPending}
        >
          {isPending ? (
            <>
              <Spinner /> Submitting
            </>
          ) : step === 1 ? (
            "Next"
          ) : (
            "Submit"
          )}
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};

export default TransferOrderForm;

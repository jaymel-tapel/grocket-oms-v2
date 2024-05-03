import React from "react";
import { Button } from "../../tools/buttons/Button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../tools/dialog/Dialog";
import {
  Client,
  useTransferClients,
} from "../../../services/queries/clientsQueries";
import TransferSellersSelector from "../../accounts/usersManager/TransferSellersSelector";
import { Seller, useGetSellers } from "../../../services/queries/sellerQueries";
import { debounce } from "lodash";

type Props = {
  clients: Client[];
  onSuccessHandler: () => void;
};

const TransferClientsForm: React.FC<Props> = ({
  clients = [],
  onSuccessHandler,
}) => {
  const [keyword, setKeyword] = React.useState("");
  const [sellerDraft, setSellerDraft] = React.useState("");
  const [receiverSeller, setReceiverSeller] = React.useState<Seller[]>([]);
  const { data: sellers } = useGetSellers({
    keyword,
  });

  const { mutateAsync: transferClients } = useTransferClients();

  const handleSubmit = async () => {
    const response = await transferClients({
      to_seller_email: receiverSeller[0].email,
      ids: clients.map((client) => client.id),
    });

    if (response.status === 201) {
      onSuccessHandler();
    }
  };

  React.useEffect(() => {
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
          You are about to transfer {clients.length} clients
        </DialogTitle>
        <DialogDescription className="text-center">
          Sellect seller that you want to receive the clients.
        </DialogDescription>
      </DialogHeader>

      <div>
        <TransferSellersSelector
          buttonLabel={
            receiverSeller[0]?.email ?? "Select seller to receive clients"
          }
          sellers={sellers?.data ?? []}
          setSelectedSellers={setReceiverSeller}
          setSearchInput={setSellerDraft}
        />
      </div>

      <DialogFooter>
        <Button
          type="button"
          onClick={handleSubmit}
          disabled={receiverSeller.length === 0}
        >
          Submit
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};

export default TransferClientsForm;

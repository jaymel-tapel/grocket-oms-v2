import React from "react";
import { Button } from "../../tools/buttons/Button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../tools/dialog/Dialog";
import { Client } from "../../../services/queries/clientsQueries";
import TransferSellersSelector from "../../accounts/usersManager/TransferSellersSelector";
import {
  Seller,
  useGetAllSellers,
} from "../../../services/queries/sellerQueries";

type Props = {
  clients: Client[];
};

const TransferClientsForm: React.FC<Props> = ({ clients }) => {
  const [receiverSeller, setReceiverSeller] = React.useState<Seller[]>([]);
  const { data: sellers } = useGetAllSellers();

  const handleSubmit = () => {
    console.log(receiverSeller[0]);
  };

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

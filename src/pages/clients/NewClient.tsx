import ClientForm from "../../components/clients/clientsManager/ClientForm";
import { useGetClient } from "../../services/queries/clientsQueries";
import { clientRoute } from "../routeTree";

const NewClient = () => {
  const { clientId } = clientRoute.useParams();
  const { data: client } = useGetClient(clientId);

  return (
    <>
      <div className="mt-4">
        <span className="flex gap-2">
          <p>Clients / Clients Manager / </p>
          <p className="text-[#41B2E9]">
            {clientId ? client?.name : "New Client"}
          </p>
        </span>
      </div>
      <div className="mt-8">
        <ClientForm client={clientId ? client : undefined} />
      </div>
    </>
  );
};

export default NewClient;

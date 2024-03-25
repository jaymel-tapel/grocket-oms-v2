import UserForm from "../../../components/accounts/usersManager/UserForm";
import UserPhotoForm from "../../../components/accounts/usersManager/UserPhotoForm";
import { useGetUser } from "../../../services/queries/accountsQueries";
import { userRoute } from "../../routeTree";

const User = () => {
  const { userId } = userRoute.useParams();
  const { data: user } = useGetUser(userId);

  return (
    <div>
      <div className="mt-4">
        <span className="flex gap-2">
          <p>Accounts / Users Manager / </p>
          <p className="text-[#41B2E9]">
            {userId ? user?.name : "New Account"}
          </p>
        </span>
      </div>

      <div className="mt-8 flex gap-x-12">
        <UserForm userId={userId} user={user} />
        {userId && <UserPhotoForm user={user} />}
      </div>
    </div>
  );
};

export default User;

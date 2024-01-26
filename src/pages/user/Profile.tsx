import { useGetUserProfile } from "../../services/queries/userQueries";
import UserForm from "../../components/accounts/usersManager/UserForm";
import UserPhotoForm from "../../components/accounts/usersManager/UserPhotoForm";
import LoggedSection from "../../components/sections/LoggedSection";

const Profile = () => {
  const { data: user } = useGetUserProfile();

  return (
    <LoggedSection>
      <div className="mt-4">
        <span className="flex gap-2">
          <p>Profile / </p>
          <p className="text-[#41B2E9]">Edit</p>
        </span>
      </div>

      <div className="mt-8 flex gap-x-12">
        <UserForm userId={user?.id} user={user} />
        {user && <UserPhotoForm user={user} />}
      </div>
    </LoggedSection>
  );
};

export default Profile;

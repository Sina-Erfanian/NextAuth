import UserProfile from "../components/profile/user-profile";
import { getSession } from "next-auth/client";

function ProfilePage() {
  return <UserProfile />;
}

// here we have a route that we should show the user if the user authenticated
// so we shouldn't show it into users that not authenticated
// we se that we can use getSession for that in the client side code and also in getServerSideProps
// here in the below code we check that if the user NOT authenticated redirect it to some other page
// and if it pass the first if statement check that means the user has authenticated and show the component for the user
export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        destination: "/auth",
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}

export default ProfilePage;

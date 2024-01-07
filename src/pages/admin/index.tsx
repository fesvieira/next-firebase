import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/firebase/config";
import { signOut } from "firebase/auth";
import Router from "next/router";

function Page() {
  const user = auth.currentUser;
  const router = useRouter();

  useEffect(() => {
    if (user == null) router.push("/");
    console.log(user);
  }, [user]);

  return (
    <>
      <h1>Private Session</h1>
      <p>{user?.displayName}</p>
      <p>{user?.email}</p>
      <button
        onClick={() => {
          signOut(auth)
            .then(() => {
              Router.push("/");
              console.log("Signed out successfully");
            })
            .catch((error) => {
              // An error happened.
            });
        }}
      >
        Logout
      </button>
    </>
  );
}

export default Page;

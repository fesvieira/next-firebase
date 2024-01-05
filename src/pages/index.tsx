import { Inter } from "next/font/google";
import Router, { useRouter } from "next/router";
import signUp from "@/firebase/auth/signup";
import React from "react";
import { Column, Container } from "@/styles/global";

const inter = Inter({ subsets: ["latin"] });

function Home() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const router = useRouter();

  const handleForm = async (event: React.FormEvent) => {
    event.preventDefault();

    const { result, error } = await signUp(email, password);

    if (error) {
      return console.log(error);
    }

    // else successful
    console.log(result);
    return router.push("/admin");
  };
  return (
    <Container>
      <Column>
        <button
          onClick={() => {
            Router.push("/signup");
          }}
        >
          Sign Up
        </button>

        <button
          onClick={() => {
            Router.push("/signin");
          }}
        >
          Sign In
        </button>
      </Column>
    </Container>
  );
}

export default Home;

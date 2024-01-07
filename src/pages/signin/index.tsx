import React from "react";
import signIn from "@/firebase/auth/signIn";
import { useRouter } from "next/navigation";
import { Container } from "@/styles/global";
import { signInWithGoogle } from "@/firebase/auth/signInWithGoogle";

function SignInPage() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const router = useRouter();

  const handleForm = async (event: React.FormEvent) => {
    event.preventDefault();

    const { result, error } = await signIn(email, password);

    if (error) {
      return console.log(error);
    }

    // else successful
    console.log(result);
    return router.push("/admin");
  };

  const signInGoogle = async () => {
    const didLogIn = await signInWithGoogle();

    if (didLogIn) {
      router.push("/admin");
    }
  };
  
  return (
    <Container>
      <h1>Sign in</h1>
      <form onSubmit={handleForm}>
        <input
          onChange={(e) => setEmail(e.target.value)}
          required
          type="email"
          name="email"
          id="email"
          placeholder="example@mail.com"
        />

        <input
          onChange={(e) => setPassword(e.target.value)}
          required
          type="password"
          name="password"
          id="password"
          placeholder="password"
        />
        <button type="submit">Sign in</button>
      </form>

      <button onClick={signInGoogle}>Sign In With Google</button>
    </Container>
  );
}

export default SignInPage;

import React, { use, useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/firebase/config";
import { signOut } from "firebase/auth";
import Router from "next/router";
import { Container, Row, WordsColumn } from "@/styles/global";
import getPrivateWords from "@/firebase/firestore/getPrivateWords";
import { WordsResponse } from "@/models/WordsResponse";
import addPrivateWord from "@/firebase/firestore/addPrivateWord";

function Page() {
  const user = auth.currentUser;
  const router = useRouter();
  const [words, setWords] = useState<string[]>([]);
  const [newWord, setNewWord] = useState<string>("");

  const getUserWords = async () => {
    if (user?.uid) {
      const { result, error } = await getPrivateWords(user?.uid);

      if (error) {
        setWords([`Error ${error}`]);
      } else {
        try {
          const { words } = result?.data() as WordsResponse;
          setWords(words ?? []);
        } catch {
          console.log("Error casting database return");
        }
      }
    } else {
      setWords(["Error: uid undefined"]);
    }
  };

  const addUserWord = async () => {
    if (user?.uid) {
      const { result, error } = await addPrivateWord(newWord, words, user?.uid);

      if (error) {
        setWords([`Error adding word: ${error}`]);
      }
      getUserWords();
    }
  };

  const addNewWord = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();

      addUserWord();
    },
    [newWord]
  );

  useEffect(() => {
    if (user == null) router.push("/");
    console.log(user);

    getUserWords();
  }, [user]);

  return (
    <Container>
      <h1>Private Session</h1>
      <p>{user?.displayName}</p>
      <p>{user?.email}</p>

      <h3>Add Word</h3>

      <form className="horizontal" onSubmit={addNewWord}>
        <input
          required
          placeholder="word"
          value={newWord}
          onChange={(e) => setNewWord(e.target.value)}
        />

        <button type="submit">Add Word</button>
      </form>

      <h3>My Words</h3>

      <WordsColumn>
        {words.map((word) => {
          return <p>{word}</p>;
        })}
      </WordsColumn>

      <button
        onClick={() => {
          signOut(auth)
            .then(() => {
              Router.push("/");
              console.log("Signed out successfully");
            })
            .catch((error) => {
              console.log(error);
            });
        }}
      >
        Logout
      </button>
    </Container>
  );
}

export default Page;

import Router from "next/router";
import React, { useEffect, useState } from "react";
import { Column, Container, Row, WordsColumn } from "@/styles/global";
import getPublicWords from "@/firebase/firestore/getPublicWords";
import { WordsResponse } from "@/models/WordsResponse";
import addPublicWord from "@/firebase/firestore/addPublicWord";
import { auth } from "@/firebase/config";
import { onAuthStateChanged } from "firebase/auth";

function Home() {
  const [publicWords, setPublicWords] = useState<string[]>([]);
  const [wordInput, setWordInput] = useState<string>("");

  const fetchPublicWords = async () => {
    try {
      const result = await getPublicWords();
      const { words } = result.result?.data() as WordsResponse;
      setPublicWords(words ?? []);
    } catch {
      console.log("Error casting database return");
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        Router.push("/admin");
      } else {
        fetchPublicWords();
      }
    });
  }, []);

  const handleForm = async () => {
    await addPublicWord(wordInput, publicWords);
    fetchPublicWords();
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

        <Row>
          <input
            value={wordInput}
            onChange={(e) => {
              setWordInput(e.target.value);
            }}
            required
            placeholder="New Word"
          />

          <button onClick={handleForm}>Add Data</button>
        </Row>

        <h2>Public Words</h2>

        <WordsColumn>
          {publicWords &&
            publicWords?.length > 0 &&
            publicWords?.map((word) => {
              return <p key={word}>{word}</p>;
            })}
        </WordsColumn>
      </Column>
    </Container>
  );
}

export default Home;

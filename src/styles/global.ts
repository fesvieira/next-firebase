import { styled } from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  align-items: center;

  padding: 1rem;
  gap: 1rem;

  height: 100dvh;
  width: 100%;

  & > form {
    display: flex;
    flex-direction: column;

    gap: 1rem;
    
  }
`;

export const WordsColumn = styled.div`
  display: flex;
  flex-direction: column;

  align-items: center;

  gap: 0.25rem;

  & > p {
    padding: 0;
    margin: 0;
  }
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;

  gap: 1rem;
`;

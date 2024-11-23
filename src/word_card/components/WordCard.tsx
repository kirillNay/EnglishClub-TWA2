import { useSearchParams } from "react-router-dom";
import englishClubApi from "../../api/EnglishClubAPI";
import { useEffect, useState } from "react";
import { Word } from "../../models/Word";

class LoadingState {}

class ErrorState {}

interface ContentState {
  word: Word;
}

type State = LoadingState | ErrorState | ContentState;

const WordCard: React.FC = () => {
  const [state, setState] = useState<State>(new LoadingState());
  const [searchParams] = useSearchParams();

  const id: string | null = searchParams.get("id");
  const userId: string | null = searchParams.get("userId");

  useEffect(() => {
    if (!id || !userId) {
      setState(new ErrorState());
      return;
    }
    setState(new LoadingState());

    const fetchData = () =>
      englishClubApi
        .getWord(id, userId)
        .then((word: Word) => setState({ word }))
        .catch(() => setState(new ErrorState()));

    fetchData();
  }, [id, userId]);

  return (
    <div className="container">
      <div className="wordCard">
        <div className="wordCard__image">
          Word id = {id}; user id = {userId};
        </div>
        <div className="wordCard__title">
          {state instanceof LoadingState && <div>Loading...</div>}
          {state instanceof ErrorState && <div>Error!</div>}
          {"word" in state && <div>{state.word.text}</div>}
        </div>
      </div>
    </div>
  );
};

export default WordCard;

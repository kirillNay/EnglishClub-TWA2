import englishClubApi from "../../api/EnglishClubAPI";
import { useEffect, useState } from "react";
import { Word } from "../../models/Word";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import "./WordCard.css";
import "../.././index.css";

class LoadingState {}

class ErrorState {}

interface ContentState {
  word: Word;
}

type State = LoadingState | ErrorState | ContentState;

interface Props {
  id: string;
  userId: string;
}

const WordCard: React.FC<Props> = ({ id, userId }: Props) => {
  const [state, setState] = useState<State>(new LoadingState());

  useEffect(() => {
    setState(new LoadingState());

    const fetchData = () =>
      englishClubApi
        .getWord(id, userId)
        .then((word: Word) => setState({ word }))
        .catch((error) => {
          console.error(`Error loading word`, error);
          return setState(new ErrorState());
        });

    fetchData();
  }, [id, userId]);

  return (
    <div className="container">
      <div className="wordCard">
        {state instanceof LoadingState && (
          <DotLottieReact
            className="wordCard__loading"
            src="https://lottie.host/5d0a5bfc-2c60-4eba-8c0f-df8f01cf5d62/MPnhXgxjjf.lottie"
            loop
            autoplay
          />
        )}
        {state instanceof ErrorState && <div>Error!</div>}
        {"word" in state && (
          <>
            {state.word.image && (
              <img className="wordCard__image" src={state.word.image} />
            )}
            <div className="wordCard__title">{state.word.text}</div>
            <div className="wordCard__subtitle">
              <span className="wordCard__subtitle__translation">
                {state.word.translation}
              </span>
              <span className="wordCard__subtitle__separator">•</span>
              <span className="wordCard__subtitle__transcription">
                [{state.word.transcription}]
              </span>
            </div>
            <div className="wordCard__definition">{state.word.definition}</div>
            <div className="wordCard__examples">
              <div className="wordCard__examples__title">Примеры</div>
              {state.word.examples.map((example: string, index: number) => {
                const parts = example.split(/(\[.*?\])/g);
                return (
                  <div className="wordCard__examples_item" key={index}>
                    {parts.map((part, idx) => {
                      if (part.startsWith("[") && part.endsWith("]")) {
                        return (
                          <span
                            className="wordCard__examples_item_highlited"
                            key={idx}
                          >
                            {part.slice(1, -1)}
                          </span>
                        );
                      }
                      return <span key={idx}>{part}</span>;
                    })}
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default WordCard;

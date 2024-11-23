import { Word } from "../models/Word";

export interface WordResponse {
  id: string;
  isSaved: boolean;
  text: string;
  transcription: string;
  translation: string;
  image?: string;
  definition: string;
  examples: string[];
}

export const wordResponseConvert = (response: WordResponse): Word => {
  return new Word(response);
};

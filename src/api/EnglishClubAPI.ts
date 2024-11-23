import axios from "axios";
import { Word } from "../models/Word";
import { WordResponse, wordResponseConvert } from "./WordResponse";

const ENGLISH_CLUB_API_URL = "https://englishclub-bot.ru/api";

const englishClubApi = {
  async getWord(id: string, userId: string): Promise<Word> {
    return axios
      .get<WordResponse>(`${ENGLISH_CLUB_API_URL}/user/${userId}/word/${id}`)
      .then((response) => wordResponseConvert(response.data));
  },
};

export default englishClubApi;

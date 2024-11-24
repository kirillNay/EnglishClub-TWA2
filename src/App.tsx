import "./App.css";
import WordCard from "./word_card/components/WordCard";
import { useLaunchParams } from "@telegram-apps/sdk-react";

const App: React.FC = () => {
  const launchParams = useLaunchParams();
  if (launchParams.startParam) {
    const match = launchParams.startParam?.match(/^wordId=(\d+)$/);
    if (match) {
      const userId = launchParams.initData?.user?.id;
      if (userId) {
        return <WordCard id={match[1]} userId={userId.toString()} />;
      }
    }
  }

  return <div>Not found! {launchParams.startParam}</div>;
};

export default App;

import { useRecoilState } from "recoil";
import answerMonState from "~/store/answerMonState";

const useAnswerMon = () => {
  const [answerMon, setAnswerMon] = useRecoilState(answerMonState);

  return {
    answerMon,
    setAnswerMon,
  };
};

export default useAnswerMon;

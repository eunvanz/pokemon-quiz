import { useRecoilState } from 'recoil'
import answerMonState from '../store/answer-mon-state'

const useAnswerMon = () => {
  const [answerMon, setAnswerMon] = useRecoilState(answerMonState)

  return {
    answerMon,
    setAnswerMon,
  }
}

export default useAnswerMon

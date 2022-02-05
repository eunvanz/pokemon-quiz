import { useCallback } from "react";
import { useRecoilState } from "recoil";
import comboState from "~/store/comboState";

const useCombo = () => {
  const [combo, setCombo] = useRecoilState(comboState);

  const resetCombo = useCallback(() => {
    setCombo(0);
  }, []);

  const incrementCombo = useCallback(() => {
    setCombo((combo) => ++combo);
  }, []);

  return {
    combo,
    resetCombo,
    incrementCombo,
  };
};

export default useCombo;

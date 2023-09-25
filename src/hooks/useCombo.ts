import { useCallback, useEffect } from "react";
import { useRecoilState } from "recoil";
import comboState from "~/store/comboState";
import maxComboState from "~/store/maxComboState";

const useCombo = () => {
  const [combo, setCombo] = useRecoilState(comboState);
  const [maxCombo, setMaxCombo] = useRecoilState(maxComboState);

  const resetCombo = useCallback(() => {
    setCombo(0);
  }, []);

  const incrementCombo = useCallback(() => {
    setCombo((combo) => ++combo);
  }, []);

  useEffect(() => {
    if (combo > maxCombo) {
      setMaxCombo(combo);
    }
  }, [combo, maxCombo]);

  const resetMaxCombo = useCallback(() => {
    setMaxCombo(0);
  }, []);

  return {
    combo,
    resetCombo,
    incrementCombo,
    resetMaxCombo,
    maxCombo,
  };
};

export default useCombo;

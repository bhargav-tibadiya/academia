// Packages
import { RootState, useAppDispatch, useAppSelector } from "../../store/store";
import { setTheme, toggleTheme } from "../../store/slices/general.slice";

// Constant & Types
import { Theme } from "../../types/store/slices/types";

const useTheme = () => {
  // Hooks
  const dispatch = useAppDispatch();
  const generalState = useAppSelector((state: RootState) => state.general);

  return {
    theme: generalState.theme,
    toggleTheme: () => dispatch(toggleTheme()),
    setTheme: (newTheme: Theme) => dispatch(setTheme(newTheme)),
  };
}
export default useTheme;

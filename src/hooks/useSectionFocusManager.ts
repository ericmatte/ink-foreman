import { useFocusManager, useInput } from "ink";

export const useSectionFocusManager = () => {
  const { focusNext, focusPrevious } = useFocusManager();

  useInput((_input, key) => {
    if (key.upArrow) {
      focusPrevious();
    } else if (key.downArrow) {
      focusNext();
    }
  });
};

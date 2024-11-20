import { useState } from "react";

export default function useSwitch(
  initialValue: boolean
): [boolean, (to?: boolean) => void] {
  const [state, setState] = useState(initialValue);
  const switchState = (to?: boolean) => {
    setState(to === undefined ? !state : to);
  };

  return [state, switchState];
}

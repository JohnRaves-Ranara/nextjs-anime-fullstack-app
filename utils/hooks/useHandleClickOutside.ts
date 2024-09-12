import { RefObject, useEffect } from "react";

export const useHandleClickOutside = (
  ref: RefObject<HTMLElement | undefined>,
  callBack: () => void,
  addEventListener = true
) => {
  const handleClick = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as HTMLElement)) {
      callBack();
    }
  };

  useEffect(() => {
    if (addEventListener) {
      document.addEventListener("mousedown", handleClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);
};

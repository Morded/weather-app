import { useEffect } from "react";

type OutsideCloserProps = {
  ref: any,
  setIsOpen: (isOpen: boolean) => void;
}

const useOutsideCloser = ({ ref, setIsOpen }: OutsideCloserProps) => {
  useEffect(() => {
    function handleClickOutside(event: any) {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}

export default useOutsideCloser;

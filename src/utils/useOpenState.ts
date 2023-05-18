import {useCallback, useState} from "react";

const useOpenState = (initState: boolean) => {
  const [isOpen, setIsOpen] = useState(initState);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleOpen = useCallback(() => {
    setIsOpen(true);
  }, []);

  const handleToggle = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  return {
    isOpen,
    setIsOpen,
    handleOpen,
    handleClose,
    handleToggle
  }
}

export default useOpenState
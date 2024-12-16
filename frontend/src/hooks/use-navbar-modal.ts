import { useState } from "react";
import { NavbarModal } from "../interfaces/navbar-modal";

export const useNavbarModal = (): NavbarModal => {
  const [isOpen, setIsOpen] = useState(false);
  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  return { isOpen, onOpen, onClose };
};

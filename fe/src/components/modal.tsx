import { useEffect } from "react";
import { Button } from "./ui/button";
import { X } from "lucide-react";

interface signUpModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  handleClose: () => void;
}

export function Modal({ children, isOpen, handleClose }: signUpModalProps) {
  useEffect(() => {
    const closeOnEscKey = (e: KeyboardEvent) => {
      e.key === "Escape" ? handleClose() : null;
    };
    document.body.addEventListener("keydown", closeOnEscKey);
    return () => {
      document.body.removeEventListener("keydown", closeOnEscKey);
    };
  }, [handleClose]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return (): void => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed top-0 left-0 w-screen h-screen z-[2000] bg-tlColor dark:bg-tdColor backdrop-blur-md">
        <div className="flex flex-col max-w-[1170px] h-screen pd-5 md:p-10 mx-auto justify-center items-center gap-2">
          <Button
            className="self-end rounded-full"
            variant="outline"
            onClick={handleClose}
            size="icon"
          >
            <X />
          </Button>
          <div className="max-h-[626px] h-[90%] w-[90%] bg-white dark:bg-pdColor opacity-100">
            {children}
          </div>
        </div>
      </div>
    </>
  );
}

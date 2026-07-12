"use client";
import { cn } from "@/utils/className";
import { useCallback, useEffect, useRef, useState } from "react";

export type ModalContainerProps = React.HTMLAttributes<HTMLDivElement>;

export const useModal = ({
  onClose,
  onOpen,
  clickOutsideToClose = true,
}: {
  onClose?: (el: HTMLDialogElement) => void;
  onOpen?: (el: HTMLDialogElement) => void;
  clickOutsideToClose?: boolean;
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpen = useCallback(() => {
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) {
      dialog.showModal();
      setIsModalOpen(true);
      onOpen?.(dialog);
    }
  }, [onOpen]);

  const handleClose = useCallback(() => {
    const dialog = dialogRef.current;
    if (dialog?.open) {
      dialog.close();
    }
  }, []);

  const Container = useCallback(
    ({ className, ...rest }: ModalContainerProps) => {
      return (
        <dialog
          ref={dialogRef}
          className={cn(
            "w-full h-full bg-transparent max-w-none max-h-none text-inherit backdrop:bg-black/50"
          )}
          onClose={() => {
            setIsModalOpen(false);
            if (dialogRef.current) {
              onClose?.(dialogRef.current);
            }
          }}
        >
          <div
            ref={contentRef}
            className={cn("w-full h-full", className)}
            onClick={(e) => {
              if (clickOutsideToClose && e.target === e.currentTarget) {
                handleClose();
              }
            }}
            {...rest}
          />
        </dialog>
      );
    },
    [clickOutsideToClose, handleClose, onClose]
  );

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isModalOpen]);

  return {
    Container,
    open: handleOpen,
    close: handleClose,
    isOpen: isModalOpen,
  };
};
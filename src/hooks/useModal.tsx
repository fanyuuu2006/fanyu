"use client";
import { cn } from "@/utils/className";
import { useCallback, useRef } from "react";

export type ModalContainerProps = React.HTMLAttributes<HTMLDivElement>;

export const useModal = ({
  onClose,
  onOpen,
  clickOutsideToClose = true,
}: {
  onClose?: () => void;
  onOpen?: () => void;
  clickOutsideToClose?: boolean;
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleOpen = useCallback(() => {
    if (dialogRef.current && !dialogRef.current.open) {
      requestAnimationFrame(() => dialogRef.current?.showModal());
      onOpen?.();
    }
  }, [onOpen]);

  const handleClose = useCallback(() => {
    if (dialogRef.current?.open) {
      requestAnimationFrame(() => dialogRef.current?.close());
      onClose?.();
    }
  }, [onClose]);

  const isOpen = useCallback(() => dialogRef.current?.open ?? false, []);

  const Container = useCallback(
    ({ className, ...rest }: ModalContainerProps) => {
      return (
        <dialog
          ref={dialogRef}
          className={cn(
            "w-full h-full bg-transparent max-w-none max-h-none text-inherit",
            className
          )}
        >
          <div
            ref={contentRef}
            className={cn(
              "bg-black/75 w-full h-full",
              className
            )}
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
    [clickOutsideToClose, handleClose]
  );

  return {
    Container,
    open: handleOpen,
    close: handleClose,
    isOpen,
  };
};

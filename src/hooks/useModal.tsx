import { cn } from "@/utils/className";
import { memo, useCallback, useRef } from "react";

export const useModal = ({
  onClose,
  onOpen,
  clickOutsideToClose = true,
}: {
  onClose?: () => void;
  onOpen?: () => void;
  clickOutsideToClose?: boolean;
}) => {
  const ref = useRef<HTMLDialogElement>(null);

  const handleOpen = useCallback(() => {
    if (ref.current && !ref.current.open) {
      requestAnimationFrame(() => {
        ref.current?.showModal();
      });
      if (onOpen) {
        onOpen();
      }
    }
  }, [ref, onOpen]);
  const handleClose = useCallback(() => {
    if (ref.current && ref.current.open) {
      requestAnimationFrame(() => {
        ref.current?.close();
      });
      if (onClose) {
        onClose();
      }
    }
  }, [ref, onClose]);
  const isOpen = useCallback(() => {
    return ref.current?.open ?? false;
  }, [ref]);

  const Container = memo(
    ({
      className,
      children,
      ...rest
    }: React.HTMLAttributes<HTMLDivElement>) => {
      return (
        <dialog
          ref={ref}
          className={cn(
            "w-full h-full bg-transparent max-w-none max-h-none text-inherit",
            className
          )}
        >
          <div
            className={cn(
              "bg-black/75 flex items-center justify-center w-full h-full",
              className
            )}
            onClick={(e) => {
              if (clickOutsideToClose && e.currentTarget === e.target) {
                handleClose();
              }
            }}
            {...rest}
          >
            {children}
          </div>
        </dialog>
      );
    }
  );
  Container.displayName = "ModalContainer";
  return {
    Container,
    open: handleOpen,
    close: handleClose,
    isOpen,
  };
};

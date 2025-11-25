import { cn } from "@/utils/className";
import { DistributiveOmit } from "fanyucomponents";
import { memo, useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

export type ModalContainerProps = DistributiveOmit<
  React.HTMLAttributes<HTMLDivElement>,
  "children"
>;

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

  /** --- Container 不吃 children，因此不會因 children 重新渲染 --- **/
  const Container = memo(({ className, ...rest }: ModalContainerProps) => {
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
            "bg-black/75 flex items-center justify-center w-full h-full",
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
  });
  Container.displayName = "ModalContainer";

  /** Portal children 進 dialog */
  const Content = ({ children }: { children: React.ReactNode }) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
      setMounted(true);
    }, []);

    if (!mounted || !contentRef.current) return null;

    return createPortal(children, contentRef.current);
  };
  return {
    Container,
    Content, 
    open: handleOpen,
    close: handleClose,
    isOpen,
  };
};

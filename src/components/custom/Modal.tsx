import { cn } from "@/utils/className";
import { OverrideProps } from "fanyucomponents";
import { forwardRef, useEffect } from "react";

export type ModalProps = OverrideProps<
  React.HTMLAttributes<HTMLDialogElement>,
  {
    onClose?: React.MouseEventHandler<HTMLDialogElement>;
  }
>;

export const Modal = forwardRef<HTMLDialogElement, ModalProps>(
  ({ className = "", children, onClick, onClose, ...rest }, ref) => {
    useEffect(() => {
      if (!ref || !("current" in ref) || !ref.current) return;
      const dialog = ref.current;

      const handleKey = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          dialog?.close();
          onClose?.(e as unknown as React.MouseEvent<HTMLDialogElement>);
        }
      };
      document.addEventListener("keydown", handleKey);
      return () => {
        document.removeEventListener("keydown", handleKey);
      };
    }, [ref, onClose]);

    return (
      <dialog
        ref={ref}
        className={cn(
          `open:flex flex-col m-auto backdrop:backdrop-blur-sm animate-pop`,
          className
        )}
        onClick={(e: React.MouseEvent<HTMLDialogElement, MouseEvent>) => {
          if (e.target === e.currentTarget) {
            e.currentTarget.close();
            onClose?.(e);
          }
          onClick?.(e);
        }}
        {...rest}
      >
        {children}
      </dialog>
    );
  }
);
Modal.displayName = "Modal";

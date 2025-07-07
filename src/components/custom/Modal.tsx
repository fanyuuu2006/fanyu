import { cn } from "@/utils/className";
import { OverrideProps } from "fanyucomponents";
import { forwardRef } from "react";

export type ModalProps = OverrideProps<
  React.HTMLAttributes<HTMLDialogElement>,
  {
    onClose?: React.MouseEventHandler<HTMLDialogElement>;
  }
>;

export const Modal = forwardRef<HTMLDialogElement, ModalProps>(
  ({ className = "", children, onClick, onClose, ...rest }, ref) => {
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

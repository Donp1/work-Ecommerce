import { InputHTMLAttributes } from "react";
import clsx from "clsx";

export const Input = ({
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <input
      {...props}
      className={clsx(
        "px-4 py-2 rounded-lg border border-secondary bg-background text-textPrimary",
        className
      )}
    />
  );
};

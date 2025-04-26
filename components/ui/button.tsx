import { ButtonHTMLAttributes } from "react";
import clsx from "clsx";

export const Button = ({
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      {...props}
      className={clsx(
        "px-4 py-2 rounded-lg font-medium transition-colors",
        "bg-primary text-white hover:bg-secondary",
        className
      )}
    />
  );
};

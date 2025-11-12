import React, { ReactElement } from "react";
import { classNames } from "@/utils";

const buttonVariants = {
  primary: "bg-[#585660] text-white hover:bg-gray-700",
  secondary:
    "bg-white border border-[#3B3B3B] text-[#3B3B3B] hover:bg-gray-100",
};

type ButtonProps = {
  variant: keyof typeof buttonVariants;
  children: React.ReactNode;
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({
  variant,
  children,
  className,
  ...props
}: ButtonProps): ReactElement => {
  const classes = classNames(
    "mt-6 h-14 w-full rounded-lg font-bold cursor-pointer",
    buttonVariants[variant as keyof typeof buttonVariants],
    className || ""
  );
  return (
    <button {...props} className={classes}>
      {children}
    </button>
  );
};
export default Button;

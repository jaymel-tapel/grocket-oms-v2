import { ButtonHTMLAttributes, forwardRef } from "react";
import { VariantProps, cva } from "class-variance-authority";
import { cn } from "../../../utils/utils";

interface ButtonProps {}

const buttonVariants = cva(
  "inline-flex items-center rounded-md py-4 px-6 justify-center text-sm whitespace-nowrap transition-colors",
  {
    variants: {
      variant: {
        default: "text-white bg-grBlue-dark",
        lightBlue: "text-white bg-grBlue-light",
        green: "text-white bg-grGreen-base",
        delete: "text-[#DC3545] border border-[#DC3545]",
        inactive: "text-grText-dark bg-grGray-base border border-grGray-dark",
        black: "text-white bg-black",
      },
      size: {
        default: "h-10 ",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, size, variant, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      />
    );
  }
);

export { Button, buttonVariants };

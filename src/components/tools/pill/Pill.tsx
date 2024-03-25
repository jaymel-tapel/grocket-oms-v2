import { HTMLAttributes, forwardRef } from "react";
import { cn } from "../../../utils/utils";
import { VariantProps, cva } from "class-variance-authority";

interface PillProps {}

const pillVariants = cva(
  "inline-flex gap-2 items-center rounded-3xl bg-green-50 text-xs py-2 px-4 justify-center",
  {
    variants: {
      bgColor: {
        default: "bg-slate-400 border-slate-400 text-slate-400",
        lightBlue: "bg-grBlue-light border-grBlue-light text-grBlue-light",
        green: "bg-grGreen-base border-grGreen-base text-grGreen-base",
        orange: "bg-grOrange-base border-grOrange-base text-grOrange-base",
        yellow:
          "bg-grYellow-bright border-grYellow-bright text-grYellow-bright",
        red: "bg-grRed-base border-grRed-base text-grRed-base",
      },
      variant: {
        default: "text-white",
        outline: "border font-medium bg-transparent",
      },
    },
    defaultVariants: {
      bgColor: "default",
      variant: "default",
    },
  }
);

interface PillProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof pillVariants> {}

const Pill = forwardRef<HTMLDivElement, PillProps>(
  ({ className, bgColor, variant, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          pillVariants({ bgColor, variant }),
          "whitespace-nowrap",
          className
        )}
        {...props}
      />
    );
  }
);

export default Pill;

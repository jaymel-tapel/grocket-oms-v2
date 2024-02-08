import { HTMLAttributes, forwardRef } from "react";
import { cn } from "../../../utils/utils";
import { VariantProps, cva } from "class-variance-authority";

interface PillProps {}

const pillVariants = cva(
  "inline-flex gap-2 text-white items-center rounded-3xl bg-green-50 text-xs py-2 px-4 justify-center",
  {
    variants: {
      bgColor: {
        default: "bg-slate-400",
        lightBlue: "bg-grBlue-light",
        green: "bg-grGreen-base",
        orange: "bg-grOrange-base",
        yellow: "bg-grYellow-bright",
        red: "bg-grRed-base",
      },
    },
    defaultVariants: {
      bgColor: "default",
    },
  }
);

interface PillProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof pillVariants> {}

const Pill = forwardRef<HTMLDivElement, PillProps>(
  ({ className, bgColor, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(pillVariants({ bgColor }), className)}
        {...props}
      />
    );
  }
);

export default Pill;

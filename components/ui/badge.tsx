import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-emerald-600 text-white hover:bg-emerald-700",
        secondary:
          "border-transparent bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700",
        destructive:
          "border-transparent bg-red-100 dark:bg-red-950/60 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800/60",
        outline: "text-slate-800 dark:text-slate-200 border-slate-300 dark:border-slate-700",
        success: "border-emerald-200 dark:border-emerald-800/60 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300",
        warning: "border-amber-200 dark:border-amber-800/60 bg-amber-50 dark:bg-amber-950/50 text-amber-800 dark:text-amber-300",
        info: "border-blue-200 dark:border-blue-800/60 bg-blue-50 dark:bg-blue-950/50 text-blue-800 dark:text-blue-300",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };

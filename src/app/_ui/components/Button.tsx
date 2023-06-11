import { cva, type VariantProps } from "class-variance-authority";

const button = cva(
  "flex items-center justify-center rounded-xl cursor-pointer select-none disabled:bg-brand-star-dust disabled:text-white disabled:cursor-not-allowed",
  {
    variants: {
      intent: {
        primary: ["bg-brand-bittersweet", "text-white"],
      },
      size: {
        small: ["text-sm", "h-[52px]", "px-2"],
        medium: ["text-base", "h-[60px]", "px-4"],
        large: ["text-lg", "h-[68px]", "px-6"],
      },
      block: {
        true: ["w-full"],
        false: ["w-auto"],
      },
    },
    defaultVariants: {
      intent: "primary",
      size: "medium",
      block: false,
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof button> {}

export const Button: React.FC<ButtonProps> = ({
  className,
  intent,
  size,
  block,
  ...props
}) => (
  <button className={button({ intent, size, block, className })} {...props} />
);

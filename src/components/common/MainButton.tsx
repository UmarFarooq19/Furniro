import { forwardRef, ReactElement } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import Image from "next/image";

type MainButtonProps = {
  text: string;
  form?: string;
  isLoading?: boolean;
  action?: () => void;
  isSubmitable?: boolean;
  disabled?: boolean;
  width?: "full_width" | string;
  dataLoadingText?: string;
  variant?: "primary" | "secondary";
  classes?: string;
  iconRoute?: string;
  rightIconRoute?: string;
  rightIconClass?: string;
  iconComponent?: ReactElement;
  size?: "small" | "normal" | "large";
};

const MainButton = forwardRef<HTMLButtonElement, MainButtonProps>(
  (
    {
      text,
      isLoading = false,
      form,
      action,
      disabled = false,
      isSubmitable,
      width,
      dataLoadingText = "Please wait ...",
      variant = "primary",
      classes,
      iconRoute,
      rightIconRoute,
      rightIconClass = "w-[24px] h-[24px]",
      iconComponent,
      size = "normal",
    },
    ref
  ) => {
    const propWidth =
      width === "full_width" ? "w-full" : width ? width : "w-[245px]";

    const isSecondaryVariant = variant !== "primary";

    const size_height =
      size === "normal"
        ? "h-[70px]"
        : size === "large"
          ? "h-[74px]"
          : "h-[70px";

    const variant_hover =
      variant === "primary" ? "hover:bg-primary" : "hover:bg-secondary";

    return !isLoading ? (
      <Button
        form={form}
        className={`${isSecondaryVariant ? " text-white  bg-secondary" : "bg-primary"
          } text-white font-bold  ${propWidth} md:${propWidth}  select-none rounded-[0px] hover:opacity-90 ${variant_hover} ${size_height} ${classes}`}
        onClick={!disabled ? action : () => undefined}
        type={isSubmitable ? "submit" : "button"}
        ref={ref}
        disabled={disabled}
      >
        {iconRoute && (
          <Image
            src={iconRoute}
            alt="left button icon"
            width={30}
            height={30}
            className="w-[24px] h-[24px]"
          />
        )}
        {iconRoute && <span>&nbsp;</span>}
        {iconComponent}
        {iconComponent && <span>&nbsp;</span>}
        {text}
        {rightIconRoute && <span>&nbsp;</span>}
        {rightIconRoute && (
          <Image
            src={rightIconRoute}
            alt="right button icon"
            width={30}
            height={30}
            className={rightIconClass}
          />
        )}
      </Button>
    ) : (
      <Button
        className={`bg-primary text-white ${propWidth} md:${propWidth} select-none rounded-[0px] cursor-not-allowed ${size_height} ${classes ? classes : ""
          }`}
        ref={ref}
        disabled
      >
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        {dataLoadingText}
      </Button>
    );
  }
);

// Assigned display name
MainButton.displayName = "MainButton";

export default MainButton;

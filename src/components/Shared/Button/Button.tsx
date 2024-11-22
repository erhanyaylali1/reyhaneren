import React from "react";
import styles from "./button.module.scss";

export type IButtonProps = {
    title: string;
    ariaLabel: string;
    className?: string;
    variant?: ButtonVariants;
    size?: ButtonSizes;
    disabled?: boolean;
    handleClick: () => void;
}

export enum ButtonSizes {
    "sm" = "sm",
    "md" = "md",
    "lg" = "lg",
}

export enum ButtonVariants {
    "primary" = "primary",
    "secondary" = "secondary",
    "yellow" = "yellow",
}

const Button = ({ title, ariaLabel, className, handleClick, variant = ButtonVariants.yellow, size = ButtonSizes.md, disabled = false }: IButtonProps): React.ReactNode => {
    return (
        <button
            className={`${className} ${styles.button} ${styles["button__" + size]} ${styles["button__" + variant]}`}
            disabled={disabled}
            aria-label={ariaLabel}
            onClick={handleClick}
        >
            {title}
        </button>
    )
}

export default Button;
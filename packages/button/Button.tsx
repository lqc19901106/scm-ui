import * as React from 'react';
type ButtonType = 'primary' | 'success' | "error" | "warning";
type AnimateType = 'raise' | 'ripple' | 'loading'| 'normal';
type Size = 'large' | 'big' | 'medium' | 'small' | 'mini';
type IconPosition = "left" | 'right' | "top" | "bottom";

export interface ButtonProps{
    text: string;
    click?:  (e: React.SyntheticEvent<HTMLDivElement | HTMLLIElement>) => void;
    type: ButtonType;
    icon?: string | React.ReactNode;
    animateType?: AnimateType;
    size: Size;
    iconPosition: IconPosition;
}
const Button = () => {
    return <button></button>
}
export default Button;
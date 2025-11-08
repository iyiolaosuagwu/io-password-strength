import { SvgProps } from "react-native-svg";

export interface SvgIconProps extends SvgProps {
  width?: number;
  height?: number;
  fill?: string;
  stroke?: string;
}

export type PasswordStrength = "weak" | "fair" | "good" | "strong";

export interface PasswordRequirement {
  /** Function that validates if the requirement is met */
  validator: (password: string) => boolean;
  /** Text to display for this requirement */
  text: string;
}

export interface StrengthConfig {
  color: string;
  label: string;
  progress: number;
}

export interface CustomStrengthConfig {
  weak?: Partial<StrengthConfig>;
  fair?: Partial<StrengthConfig>;
  good?: Partial<StrengthConfig>;
  strong?: Partial<StrengthConfig>;
}

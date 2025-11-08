import React from "react";
import {
  StyleSheet,
  TextStyle,
  Text as TText,
  View as TView,
  ViewStyle,
} from "react-native";
import CheckIcon from "./icons/CheckIcon";
import XCloseWithBorderIcon from "./icons/XCloseWithBorderIcon";
import {
  CustomStrengthConfig,
  PasswordRequirement,
  PasswordStrength,
} from "./types";

export type {
  CustomStrengthConfig,
  PasswordRequirement,
  PasswordStrength,
} from "./types";

interface IOPasswordStrengthProps {
  /** The password string to evaluate */
  password: string;
  /** Custom requirements array. If not provided, default requirements will be used */
  requirements?: PasswordRequirement[];
  /** Whether to show the strength indicator bars (default: true) */
  showStrengthIndicator?: boolean;
  /** Whether to show the strength label text (default: true) */
  showStrengthLabel?: boolean;
  /** Custom strength configuration to override default labels, colors, and progress */
  strengthConfig?: CustomStrengthConfig;
  /** Custom function to calculate password strength. If not provided, default calculation will be used */
  calculateStrength?: (
    password: string,
    requirements?: PasswordRequirement[]
  ) => PasswordStrength;
  /** Custom container style */
  containerStyle?: ViewStyle;
  /** Custom style for the strength label */
  labelStyle?: TextStyle;
  /** Custom style for requirements container */
  requirementsContainerStyle?: ViewStyle;
}

export const Colors = {
  primary: "#5C068C",
  secondary: "#9BA1A6",
  success: "#22C55E",
  warning: "#FBBF24",
  danger: "#EF4444",
  gray: "#828282",
  gary1: "#90909D",
  black: "#000000",
  icon: "#687076",
};

export function IOPasswordStrength({
  password,
  requirements: customRequirements,
  showStrengthIndicator = true,
  showStrengthLabel = true,
  strengthConfig: customStrengthConfig,
  calculateStrength: customCalculateStrength,
  containerStyle,
  labelStyle,
  requirementsContainerStyle,
}: IOPasswordStrengthProps) {
  // Use custom requirements or default
  const requirements = React.useMemo(() => {
    if (customRequirements) {
      return customRequirements.map((req) => ({
        met: req.validator(password),
        text: req.text,
      }));
    }
    return getDefaultRequirements(password);
  }, [password, customRequirements]);

  // Use custom strength calculation or default
  const strength = React.useMemo(() => {
    if (customCalculateStrength) {
      return customCalculateStrength(password, customRequirements);
    }
    return calculateStrength(
      password,
      customRequirements || getDefaultRequirementValidators()
    );
  }, [password, customCalculateStrength, customRequirements]);

  // Merge custom strength config with default
  const mergedStrengthConfig = React.useMemo(() => {
    const defaultConfig = getDefaultStrengthConfig();
    if (!customStrengthConfig) return defaultConfig;

    return {
      weak: { ...defaultConfig.weak, ...customStrengthConfig.weak },
      fair: { ...defaultConfig.fair, ...customStrengthConfig.fair },
      good: { ...defaultConfig.good, ...customStrengthConfig.good },
      strong: { ...defaultConfig.strong, ...customStrengthConfig.strong },
    };
  }, [customStrengthConfig]);

  const { color, label, progress } = mergedStrengthConfig[strength];

  return (
    <TView style={[styles.container, containerStyle]}>
      {/* Strength indicator bars */}
      {showStrengthIndicator && (
        <TView style={styles.barsContainer}>
          {[1, 2, 3, 4].map((index) => (
            <TView
              key={index}
              style={[
                styles.bar,
                index <= progress && { backgroundColor: color },
              ]}
            />
          ))}
        </TView>
      )}

      {/* Strength label */}
      {showStrengthLabel && (
        <TText
          style={[
            {
              color: color,
            },
            labelStyle,
          ]}
        >
          {label}
        </TText>
      )}

      {/* Password requirements */}
      {requirements.length > 0 && (
        <TView
          style={[styles.requirementsContainer, requirementsContainerStyle]}
        >
          {requirements.map((req, index) => (
            <RequirementItem key={index} met={req.met} text={req.text} />
          ))}
        </TView>
      )}
    </TView>
  );
}

interface RequirementItemProps {
  met: boolean;
  text: string;
}

function RequirementItem({ met, text }: RequirementItemProps) {
  const colors = Colors;

  return (
    <TView style={styles.requirementItem}>
      {met ? (
        <CheckIcon width={16} height={16} fill={colors.success} />
      ) : (
        <XCloseWithBorderIcon width={16} height={16} fill={colors.icon} />
      )}
      <TText
        style={[
          styles.requirementText,
          { color: met ? Colors.success : Colors.icon },
        ]}
      >
        {text}
      </TText>
    </TView>
  );
}

/**
 * Default requirement validators - exported for use in custom strength calculation
 */
export const defaultRequirementValidators: PasswordRequirement[] = [
  {
    validator: (pwd) => /[^a-zA-Z0-9]/.test(pwd),
    text: "At least one special character (!, @, #, etc.)",
  },
  {
    validator: (pwd) => /[A-Z]/.test(pwd),
    text: "At least one uppercase letter (A-Z)",
  },
  {
    validator: (pwd) => /[a-z]/.test(pwd),
    text: "At least one lowercase letter (a-z)",
  },
  {
    validator: (pwd) => /[0-9]/.test(pwd),
    text: "At least one number (0-9)",
  },
];

/**
 * Get default requirement validators
 */
function getDefaultRequirementValidators(): PasswordRequirement[] {
  return defaultRequirementValidators;
}

/**
 * Get default requirements with met status
 */
function getDefaultRequirements(
  password: string
): { met: boolean; text: string }[] {
  return defaultRequirementValidators.map((req) => ({
    met: req.validator(password),
    text: req.text,
  }));
}

/**
 * Calculate password strength based on password and requirements
 */
function calculateStrength(
  password: string,
  requirements: PasswordRequirement[] = defaultRequirementValidators
): PasswordStrength {
  if (!password) return "weak";

  let score = 0;

  // Length checks
  if (password.length >= 8) score += 1;
  if (password.length >= 12) score += 1;

  // Character variety checks
  if (/[a-z]/.test(password)) score += 1;
  if (/[A-Z]/.test(password)) score += 1;
  if (/[0-9]/.test(password)) score += 1;
  if (/[^a-zA-Z0-9]/.test(password)) score += 1;

  // Count met requirements
  const metRequirements = requirements.filter((req) =>
    req.validator(password)
  ).length;
  const totalRequirements = requirements.length;
  const requirementRatio = metRequirements / totalRequirements;

  // Adjust score based on requirements
  if (requirementRatio === 1) score += 2; // All requirements met
  else if (requirementRatio >= 0.75) score += 1; // Most requirements met

  if (score <= 2) return "weak";
  if (score <= 4) return "fair";
  if (score <= 5) return "good";
  return "strong";
}

/**
 * Get default strength configuration
 */
function getDefaultStrengthConfig(): Record<
  PasswordStrength,
  { color: string; label: string; progress: number }
> {
  return {
    weak: {
      color: Colors.danger,
      label: "Weak Password",
      progress: 1,
    },
    fair: {
      color: Colors.warning,
      label: "Fair Password",
      progress: 2,
    },
    good: {
      color: Colors.warning,
      label: "Good Password",
      progress: 3,
    },
    strong: {
      color: Colors.success,
      label: "Strong Password",
      progress: 4,
    },
  };
}

const styles = StyleSheet.create({
  container: {
    marginTop: 12,
  },
  barsContainer: {
    flexDirection: "row",
    gap: 4,
    marginBottom: 8,
  },
  bar: {
    flex: 1,
    height: 4,
    backgroundColor: "#E5E7EB",
    borderRadius: 2,
  },
  requirementsContainer: {
    gap: 8,
    marginTop: 8,
  },
  requirementItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  checkbox: {
    width: 16,
    height: 16,
    borderRadius: 4,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  requirementText: {
    fontSize: 12,
    flex: 1,
  },
});

export default IOPasswordStrength;

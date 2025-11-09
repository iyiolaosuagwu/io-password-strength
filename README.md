# io-password-strength

A **React Native password strength indicator** and **validation component** that provides visual feedback, real-time strength analysis, and customizable requirement checks — perfect for **login** and **signup forms** in your mobile apps.

![Demo Video](https://res.cloudinary.com/iyiola/image/upload/v1762614465/Screen_Recording_2025-11-08_at_15.57.48_ogeurw.gif)

## Features

-   📊 Visual strength indicator with color-coded bars (optional)
-   ✅ Real-time requirement validation with customizable rules
-   🎨 Fully customizable colors, labels, and styling
-   🔧 Custom strength calculation functions
-   🎭 Customizable requirement icons (success/error) with size control
-   👁️ Show/hide requirement icons
-   📱 React Native compatible
-   🔒 TypeScript support
-   🎯 Highly flexible and configurable
-   🔧 Zero dependencies

## Why use io-password-strength?

If you're building a **React Native login**, **signup**, or **account creation screen**, this component helps you:

-   Show users how strong their password is in real-time.
-   Enforce password security rules visually and interactively.
-   Customize everything — from colors and labels to validation logic.
-   Integrate easily with any **React Native form library** or **authentication flow**.

## Installation

```bash
npm install io-password-strength
```

or

```bash
yarn add io-password-strength
```

## Peer Dependencies

This package requires the following peer dependencies:

-   `react` (>=16.8.0)
-   `react-native` (>=0.60.0)
-   `react-native-svg` (>=12.0.0)

Make sure to install them if you haven't already:

```bash
npm install react react-native react-native-svg
```

## Demo – React Native Password Strength Indicator

🎥 **Watch the component in action**: [Demo Video](https://res.cloudinary.com/iyiola/image/upload/v1762614465/Screen_Recording_2025-11-08_at_15.57.48_ogeurw.gif)

> Note: Replace the video link above with your actual demo video URL (YouTube, Vimeo, etc.)

## Basic Usage

```tsx
import React, { useState } from "react";
import { TextInput } from "react-native";
import { IOPasswordStrength } from "io-password-strength";

function App() {
    const [password, setPassword] = useState("");

    return (
        <>
            <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="Enter password"
                secureTextEntry
            />
            <IOPasswordStrength password={password} />
        </>
    );
}
```

> 💡 **Tip**: Check out the [`example.tsx`](./example.tsx) file in this repository for comprehensive examples of all features and use cases.

## Advanced Usage

### Custom Requirements

Define your own password requirements:

```tsx
import { IOPasswordStrength, PasswordRequirement } from "io-password-strength";

const customRequirements: PasswordRequirement[] = [
    {
        validator: (pwd) => pwd.length >= 10,
        text: "At least 10 characters",
    },
    {
        validator: (pwd) => /[A-Z]/.test(pwd),
        text: "Contains uppercase letter",
    },
    {
        validator: (pwd) => /[0-9]/.test(pwd) && /[!@#$%^&*]/.test(pwd),
        text: "Contains number and special character",
    },
];

<IOPasswordStrength password={password} requirements={customRequirements} />;
```

### Hide Strength Indicator Bars

```tsx
<IOPasswordStrength password={password} showStrengthIndicator={false} />
```

### Hide Strength Label

```tsx
<IOPasswordStrength password={password} showStrengthLabel={false} />
```

### Hide Requirements Section

```tsx
<IOPasswordStrength password={password} showRequirements={false} />
```

### Hide Requirement Icons

```tsx
<IOPasswordStrength password={password} showRequirementIcons={false} />
```

### Custom Requirement Icons

Use custom icons for requirement indicators:

```tsx
import { IOPasswordStrength, SvgIconProps } from "io-password-strength";
import { Svg, Path } from "react-native-svg";
import MyCustomCheckIcon from "./MyCustomCheckIcon";
import MyCustomErrorIcon from "./MyCustomErrorIcon";

// Example: Custom icon with SvgIconProps type
const MyCustomCheck: React.FC<SvgIconProps> = ({
    width,
    height,
    fill,
    ...props
}) => {
    return (
        <Svg width={width} height={height} viewBox="0 0 16 16" {...props}>
            <Path
                d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zm3.5 5.5L7 11 4.5 8.5l1-1L7 9l3.5-3.5 1 1z"
                fill={fill}
            />
        </Svg>
    );
};

<IOPasswordStrength
    password={password}
    successIcon={MyCustomCheckIcon}
    errorIcon={MyCustomErrorIcon}
/>;
```

### Custom Icon Size

Control the size of requirement icons:

```tsx
// Default size (16px)
<IOPasswordStrength password={password} />

// Larger icons (24px)
<IOPasswordStrength password={password} iconSize={24} />

// Smaller icons (12px)
<IOPasswordStrength password={password} iconSize={12} />

// Custom icons with custom size
<IOPasswordStrength
  password={password}
  iconSize={20}
  successIcon={MyCustomCheckIcon}
  errorIcon={MyCustomErrorIcon}
/>
```

### Custom Strength Configuration

Customize labels, colors, and progress indicators:

```tsx
import { IOPasswordStrength, CustomStrengthConfig } from "io-password-strength";

const customStrengthConfig: CustomStrengthConfig = {
    weak: {
        label: "Too Weak",
        color: "#FF0000",
        progress: 1,
    },
    fair: {
        label: "Fair",
        color: "#FFA500",
        progress: 2,
    },
    good: {
        label: "Good",
        color: "#FFD700",
        progress: 3,
    },
    strong: {
        label: "Very Strong",
        color: "#00FF00",
        progress: 4,
    },
};

<IOPasswordStrength
    password={password}
    strengthConfig={customStrengthConfig}
/>;
```

### Custom Strength Calculation

Implement your own strength calculation logic:

```tsx
import {
    IOPasswordStrength,
    PasswordStrength,
    PasswordRequirement,
} from "io-password-strength";

const calculateCustomStrength = (
    password: string,
    requirements?: PasswordRequirement[]
): PasswordStrength => {
    if (password.length < 6) return "weak";
    if (password.length < 10) return "fair";
    if (password.length < 14) return "good";
    return "strong";
};

<IOPasswordStrength
    password={password}
    calculateStrength={calculateCustomStrength}
/>;
```

### Custom Styling

Apply custom styles to different parts of the component:

```tsx
<IOPasswordStrength
    password={password}
    containerStyle={{ marginVertical: 20 }}
    labelStyle={{ fontSize: 16, fontWeight: "bold" }}
    requirementsContainerStyle={{ marginTop: 16 }}
/>
```

### Complete Example with All Features

```tsx
import React, { useState } from "react";
import { TextInput, View } from "react-native";
import {
    IOPasswordStrength,
    PasswordRequirement,
    CustomStrengthConfig,
} from "io-password-strength";

function PasswordForm() {
    const [password, setPassword] = useState("");

    const requirements: PasswordRequirement[] = [
        {
            validator: (pwd) => pwd.length >= 8,
            text: "Minimum 8 characters",
        },
        {
            validator: (pwd) => /[A-Z]/.test(pwd),
            text: "One uppercase letter",
        },
        {
            validator: (pwd) => /[a-z]/.test(pwd),
            text: "One lowercase letter",
        },
        {
            validator: (pwd) => /[0-9]/.test(pwd),
            text: "One number",
        },
        {
            validator: (pwd) => /[!@#$%^&*(),.?":{}|<>]/.test(pwd),
            text: "One special character",
        },
    ];

    const strengthConfig: CustomStrengthConfig = {
        weak: { label: "Weak", color: "#EF4444" },
        fair: { label: "Fair", color: "#F59E0B" },
        good: { label: "Good", color: "#3B82F6" },
        strong: { label: "Strong", color: "#10B981" },
    };

    return (
        <View>
            <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="Enter password"
                secureTextEntry
            />
            <IOPasswordStrength
                password={password}
                requirements={requirements}
                strengthConfig={strengthConfig}
                showStrengthIndicator={true}
                showStrengthLabel={true}
                showRequirementIcons={true}
                iconSize={16}
                containerStyle={{ marginTop: 16 }}
            />
        </View>
    );
}
```

## API

### `IOPasswordStrength`

The main component that displays password strength indicators.

#### Props

| Prop                         | Type                                                                           | Required | Default | Description                                                                    |
| ---------------------------- | ------------------------------------------------------------------------------ | -------- | ------- | ------------------------------------------------------------------------------ |
| `password`                   | `string`                                                                       | Yes      | -       | The password string to evaluate                                                |
| `requirements`               | `PasswordRequirement[]`                                                        | No       | -       | Custom requirements array. If not provided, default requirements will be used  |
| `showStrengthIndicator`      | `boolean`                                                                      | No       | `true`  | Whether to show the strength indicator bars                                    |
| `showStrengthLabel`          | `boolean`                                                                      | No       | `true`  | Whether to show the strength label text                                        |
| `showRequirements`           | `boolean`                                                                      | No       | `true`  | Whether to show the requirements section                                       |
| `showRequirementIcons`       | `boolean`                                                                      | No       | `true`  | Whether to show requirement icons                                              |
| `iconSize`                   | `number`                                                                       | No       | `16`    | Size of requirement icons in pixels                                            |
| `successIcon`                | `React.ComponentType<SvgIconProps>`                                            | No       | -       | Custom success icon component to replace the default check icon                |
| `errorIcon`                  | `React.ComponentType<SvgIconProps>`                                            | No       | -       | Custom error icon component to replace the default error icon                  |
| `strengthConfig`             | `CustomStrengthConfig`                                                         | No       | -       | Custom strength configuration to override default labels, colors, and progress |
| `calculateStrength`          | `(password: string, requirements?: PasswordRequirement[]) => PasswordStrength` | No       | -       | Custom function to calculate password strength                                 |
| `containerStyle`             | `ViewStyle`                                                                    | No       | -       | Custom container style                                                         |
| `labelStyle`                 | `TextStyle`                                                                    | No       | -       | Custom style for the strength label                                            |
| `requirementsContainerStyle` | `ViewStyle`                                                                    | No       | -       | Custom style for requirements container                                        |

### Types

#### `PasswordRequirement`

```typescript
interface PasswordRequirement {
    /** Function that validates if the requirement is met */
    validator: (password: string) => boolean;
    /** Text to display for this requirement */
    text: string;
}
```

#### `CustomStrengthConfig`

```typescript
interface CustomStrengthConfig {
    weak?: Partial<StrengthConfig>;
    fair?: Partial<StrengthConfig>;
    good?: Partial<StrengthConfig>;
    strong?: Partial<StrengthConfig>;
}

interface StrengthConfig {
    color: string;
    label: string;
    progress: number;
}
```

#### `PasswordStrength`

```typescript
type PasswordStrength = "weak" | "fair" | "good" | "strong";
```

#### `SvgIconProps`

Type definition for custom icon components:

```typescript
interface SvgIconProps extends SvgProps {
    width?: number;
    height?: number;
    fill?: string;
    stroke?: string;
}
```

### Exports

-   `IOPasswordStrength` - Main component
-   `Colors` - Color constants used by the component
-   `defaultRequirementValidators` - Default requirement validators array
-   `PasswordStrength` - Type definition
-   `PasswordRequirement` - Type definition for custom requirements
-   `CustomStrengthConfig` - Type definition for custom strength config
-   `SvgIconProps` - Type definition for custom icon components

## Password Requirements Examples

The component comes with default requirements, but you can create custom requirements with any validation logic. Here are comprehensive examples of different requirement types you can use:

### Length Requirements

```tsx
const lengthRequirements: PasswordRequirement[] = [
    {
        validator: (pwd) => pwd.length >= 8,
        text: "At least 8 characters",
    },
    {
        validator: (pwd) => pwd.length >= 12,
        text: "At least 12 characters",
    },
    {
        validator: (pwd) => pwd.length >= 16,
        text: "At least 16 characters",
    },
    {
        validator: (pwd) => pwd.length >= 8 && pwd.length <= 128,
        text: "Between 8 and 128 characters",
    },
];
```

### Character Type Requirements

```tsx
const characterTypeRequirements: PasswordRequirement[] = [
    // Uppercase letters
    {
        validator: (pwd) => /[A-Z]/.test(pwd),
        text: "At least one uppercase letter (A-Z)",
    },
    {
        validator: (pwd) => (pwd.match(/[A-Z]/g) || []).length >= 2,
        text: "At least two uppercase letters",
    },

    // Lowercase letters
    {
        validator: (pwd) => /[a-z]/.test(pwd),
        text: "At least one lowercase letter (a-z)",
    },

    // Numbers
    {
        validator: (pwd) => /[0-9]/.test(pwd),
        text: "At least one number (0-9)",
    },
    {
        validator: (pwd) => (pwd.match(/[0-9]/g) || []).length >= 2,
        text: "At least two numbers",
    },

    // Special characters
    {
        validator: (pwd) => /[^a-zA-Z0-9]/.test(pwd),
        text: "At least one special character",
    },
    {
        validator: (pwd) => /[!@#$%^&*(),.?":{}|<>]/.test(pwd),
        text: "At least one special character (!@#$%^&*)",
    },
    {
        validator: (pwd) => /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pwd),
        text: "At least one special character",
    },
];
```

### Advanced Pattern Requirements

```tsx
const advancedRequirements: PasswordRequirement[] = [
    // No consecutive characters
    {
        validator: (pwd) => !/(.)\1{2,}/.test(pwd),
        text: "No three consecutive identical characters",
    },

    // No common patterns
    {
        validator: (pwd) =>
            !/(012|123|234|345|456|567|678|789|890|abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz)/i.test(
                pwd
            ),
        text: "No common sequences (123, abc, etc.)",
    },

    // Mix of character types
    {
        validator: (pwd) =>
            /[a-z]/.test(pwd) && /[A-Z]/.test(pwd) && /[0-9]/.test(pwd),
        text: "Contains uppercase, lowercase, and number",
    },

    // Starts with letter
    {
        validator: (pwd) => /^[a-zA-Z]/.test(pwd),
        text: "Must start with a letter",
    },

    // Ends with number or special character
    {
        validator: (pwd) => /[0-9!@#$%^&*()]$/.test(pwd),
        text: "Must end with a number or special character",
    },
];
```

### Security-Focused Requirements

```tsx
const securityRequirements: PasswordRequirement[] = [
    {
        validator: (pwd) => pwd.length >= 12,
        text: "Minimum 12 characters",
    },
    {
        validator: (pwd) => /[a-z]/.test(pwd) && /[A-Z]/.test(pwd),
        text: "Mix of uppercase and lowercase",
    },
    {
        validator: (pwd) => /[0-9]/.test(pwd),
        text: "Contains at least one number",
    },
    {
        validator: (pwd) => /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pwd),
        text: "Contains at least one special character",
    },
    {
        validator: (pwd) => {
            const uniqueChars = new Set(pwd.split("")).size;
            return uniqueChars >= pwd.length * 0.5;
        },
        text: "At least 50% unique characters",
    },
    {
        validator: (pwd) => !pwd.toLowerCase().includes("password"),
        text: "Does not contain 'password'",
    },
];
```

### Business Logic Requirements

```tsx
const businessRequirements: PasswordRequirement[] = [
    {
        validator: (pwd) => pwd.length >= 8,
        text: "Minimum 8 characters",
    },
    {
        validator: (pwd) => {
            // Check against common passwords list
            const commonPasswords = ["password", "12345678", "qwerty", "admin"];
            return !commonPasswords.includes(pwd.toLowerCase());
        },
        text: "Not a common password",
    },
    {
        validator: (pwd) => {
            // Check if password contains user's name (would need to pass user data)
            const userName = "john"; // This would come from props/context
            return !pwd.toLowerCase().includes(userName.toLowerCase());
        },
        text: "Does not contain your username",
    },
    {
        validator: (pwd) => {
            // Check character diversity
            const hasLower = /[a-z]/.test(pwd);
            const hasUpper = /[A-Z]/.test(pwd);
            const hasNumber = /[0-9]/.test(pwd);
            const hasSpecial = /[^a-zA-Z0-9]/.test(pwd);
            return (
                [hasLower, hasUpper, hasNumber, hasSpecial].filter(Boolean)
                    .length >= 3
            );
        },
        text: "At least 3 of: lowercase, uppercase, number, special character",
    },
];
```

### Custom Validator Functions

You can create reusable validator functions:

```tsx
// Validator helper functions
const validators = {
    minLength: (min: number) => (pwd: string) => pwd.length >= min,
    maxLength: (max: number) => (pwd: string) => pwd.length <= max,
    hasUppercase: (pwd: string) => /[A-Z]/.test(pwd),
    hasLowercase: (pwd: string) => /[a-z]/.test(pwd),
    hasNumber: (pwd: string) => /[0-9]/.test(pwd),
    hasSpecialChar: (pwd: string) => /[^a-zA-Z0-9]/.test(pwd),
    hasNoSpaces: (pwd: string) => !/\s/.test(pwd),
    hasNoCommonPattern: (pwd: string) => {
        const patterns = ["123", "abc", "qwerty", "password"];
        return !patterns.some((pattern) => pwd.toLowerCase().includes(pattern));
    },
};

// Use the validators
const customRequirements: PasswordRequirement[] = [
    {
        validator: validators.minLength(10),
        text: "At least 10 characters",
    },
    {
        validator: validators.hasUppercase,
        text: "Contains uppercase letter",
    },
    {
        validator: validators.hasLowercase,
        text: "Contains lowercase letter",
    },
    {
        validator: validators.hasNumber,
        text: "Contains number",
    },
    {
        validator: validators.hasSpecialChar,
        text: "Contains special character",
    },
    {
        validator: validators.hasNoSpaces,
        text: "No spaces allowed",
    },
    {
        validator: validators.hasNoCommonPattern,
        text: "No common patterns",
    },
];
```

### Combining Default and Custom Requirements

```tsx
import { defaultRequirementValidators } from "io-password-strength";

// Extend default requirements
const myRequirements: PasswordRequirement[] = [
    ...defaultRequirementValidators,
    {
        validator: (pwd) => pwd.length >= 12,
        text: "At least 12 characters",
    },
    {
        validator: (pwd) => !/(.)\1{2,}/.test(pwd),
        text: "No three consecutive identical characters",
    },
];
```

### Default Requirements

The component comes with default requirements if none are provided:

-   At least one special character (!, @, #, etc.)
-   At least one uppercase letter (A-Z)
-   At least one lowercase letter (a-z)
-   At least one number (0-9)

You can access the default requirements:

```tsx
import { defaultRequirementValidators } from "io-password-strength";

// Use as base and extend
const myRequirements = [
    ...defaultRequirementValidators,
    {
        validator: (pwd) => pwd.length >= 12,
        text: "At least 12 characters",
    },
];
```

## Default Strength Calculation

The default strength calculation considers:

-   Password length (8+ and 12+ characters)
-   Character variety (lowercase, uppercase, numbers, special characters)
-   Requirement fulfillment ratio

Strength levels:

-   **Weak**: Score ≤ 2
-   **Fair**: Score ≤ 4
-   **Good**: Score ≤ 5
-   **Strong**: Score > 5

---

### 🏷️ Keywords

react-native, password, password strength, password validation, password strength meter, password strength bar, password strength indicator, react-native-password-strength, react-native-password-validator, react-native-password-strength-component, react-native-password-checker, password security, react native login, react native signup, react native form validation

## License

MIT

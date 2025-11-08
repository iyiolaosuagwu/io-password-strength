/**
 * Example usage of io-password-strength package
 *
 * This file demonstrates various ways to use the IOPasswordStrength component
 * with different configurations and requirements.
 */

import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import {
  CustomStrengthConfig,
  IOPasswordStrength,
  PasswordRequirement,
  PasswordStrength,
  defaultRequirementValidators,
} from "./src/index";

// ============================================================================
// Example 1: Basic Usage
// ============================================================================

export function BasicExample() {
  const [password, setPassword] = useState("");

  return (
    <View style={styles.exampleContainer}>
      <Text style={styles.exampleTitle}>Example 1: Basic Usage</Text>
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Enter password"
        secureTextEntry
      />
      <IOPasswordStrength password={password} />
    </View>
  );
}

// ============================================================================
// Example 2: Custom Requirements
// ============================================================================

export function CustomRequirementsExample() {
  const [password, setPassword] = useState("");

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
      validator: (pwd) => /[a-z]/.test(pwd),
      text: "Contains lowercase letter",
    },
    {
      validator: (pwd) => /[0-9]/.test(pwd),
      text: "Contains number",
    },
    {
      validator: (pwd) => /[!@#$%^&*]/.test(pwd),
      text: "Contains special character (!@#$%^&*)",
    },
  ];

  return (
    <View style={styles.exampleContainer}>
      <Text style={styles.exampleTitle}>Example 2: Custom Requirements</Text>
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Enter password"
        secureTextEntry
      />
      <IOPasswordStrength
        password={password}
        requirements={customRequirements}
      />
    </View>
  );
}

// ============================================================================
// Example 3: Hide Strength Indicator Bars
// ============================================================================

export function HideBarsExample() {
  const [password, setPassword] = useState("");

  return (
    <View style={styles.exampleContainer}>
      <Text style={styles.exampleTitle}>Example 3: Hide Strength Bars</Text>
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Enter password"
        secureTextEntry
      />
      <IOPasswordStrength password={password} showStrengthIndicator={false} />
    </View>
  );
}

// ============================================================================
// Example 4: Hide Strength Label
// ============================================================================

export function HideLabelExample() {
  const [password, setPassword] = useState("");

  return (
    <View style={styles.exampleContainer}>
      <Text style={styles.exampleTitle}>Example 4: Hide Strength Label</Text>
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Enter password"
        secureTextEntry
      />
      <IOPasswordStrength password={password} showStrengthLabel={false} />
    </View>
  );
}

// ============================================================================
// Example 5: Custom Strength Configuration
// ============================================================================

export function CustomStrengthConfigExample() {
  const [password, setPassword] = useState("");

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

  return (
    <View style={styles.exampleContainer}>
      <Text style={styles.exampleTitle}>Example 5: Custom Strength Config</Text>
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Enter password"
        secureTextEntry
      />
      <IOPasswordStrength
        password={password}
        strengthConfig={customStrengthConfig}
      />
    </View>
  );
}

// ============================================================================
// Example 6: Custom Styling
// ============================================================================

export function CustomStylingExample() {
  const [password, setPassword] = useState("");

  return (
    <View style={styles.exampleContainer}>
      <Text style={styles.exampleTitle}>Example 6: Custom Styling</Text>
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Enter password"
        secureTextEntry
      />
      <IOPasswordStrength
        password={password}
        containerStyle={styles.customContainer}
        labelStyle={styles.customLabel}
        requirementsContainerStyle={styles.customRequirements}
      />
    </View>
  );
}

// ============================================================================
// Example 7: Custom Strength Calculation
// ============================================================================

export function CustomStrengthCalculationExample() {
  const [password, setPassword] = useState("");

  const calculateCustomStrength = (
    password: string,
    requirements?: PasswordRequirement[]
  ): PasswordStrength => {
    if (password.length < 6) return "weak";
    if (password.length < 10) return "fair";
    if (password.length < 14) return "good";
    return "strong";
  };

  return (
    <View style={styles.exampleContainer}>
      <Text style={styles.exampleTitle}>
        Example 7: Custom Strength Calculation
      </Text>
      <Text style={styles.exampleDescription}>
        Strength based only on length
      </Text>
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Enter password"
        secureTextEntry
      />
      <IOPasswordStrength
        password={password}
        calculateStrength={calculateCustomStrength}
      />
    </View>
  );
}

// ============================================================================
// Example 8: Security-Focused Requirements
// ============================================================================

export function SecurityFocusedExample() {
  const [password, setPassword] = useState("");

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

  const strengthConfig: CustomStrengthConfig = {
    weak: { label: "Weak", color: "#EF4444" },
    fair: { label: "Fair", color: "#F59E0B" },
    good: { label: "Good", color: "#3B82F6" },
    strong: { label: "Strong", color: "#10B981" },
  };

  return (
    <View style={styles.exampleContainer}>
      <Text style={styles.exampleTitle}>Example 8: Security-Focused</Text>
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Enter password"
        secureTextEntry
      />
      <IOPasswordStrength
        password={password}
        requirements={securityRequirements}
        strengthConfig={strengthConfig}
      />
    </View>
  );
}

// ============================================================================
// Example 9: Extended Default Requirements
// ============================================================================

export function ExtendedDefaultsExample() {
  const [password, setPassword] = useState("");

  // Extend default requirements
  const extendedRequirements: PasswordRequirement[] = [
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

  return (
    <View style={styles.exampleContainer}>
      <Text style={styles.exampleTitle}>Example 9: Extended Defaults</Text>
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Enter password"
        secureTextEntry
      />
      <IOPasswordStrength
        password={password}
        requirements={extendedRequirements}
      />
    </View>
  );
}

// ============================================================================
// Example 10: Complete Example with All Features
// ============================================================================

export function CompleteExample() {
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
    <View style={styles.exampleContainer}>
      <Text style={styles.exampleTitle}>Example 10: Complete Example</Text>
      <Text style={styles.exampleDescription}>
        All features combined: custom requirements, strength config, and styling
      </Text>
      <TextInput
        style={styles.input}
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
        containerStyle={styles.completeContainer}
        labelStyle={styles.completeLabel}
        requirementsContainerStyle={styles.completeRequirements}
      />
    </View>
  );
}

// ============================================================================
// Main App Component - Shows all examples
// ============================================================================

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.header}>io-password-strength Examples</Text>

        <BasicExample />
        <CustomRequirementsExample />
        <HideBarsExample />
        <HideLabelExample />
        <CustomStrengthConfigExample />
        <CustomStylingExample />
        <CustomStrengthCalculationExample />
        <SecurityFocusedExample />
        <ExtendedDefaultsExample />
        <CompleteExample />
      </ScrollView>
    </SafeAreaView>
  );
}

// ============================================================================
// Styles
// ============================================================================

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  scrollView: {
    flex: 1,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
    color: "#333",
  },
  exampleContainer: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 16,
    marginBottom: 24,
    padding: 16,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  exampleTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
    color: "#333",
  },
  exampleDescription: {
    fontSize: 14,
    color: "#666",
    marginBottom: 12,
    fontStyle: "italic",
  },
  input: {
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 12,
    backgroundColor: "#FAFAFA",
  },
  customContainer: {
    marginTop: 16,
    padding: 12,
    backgroundColor: "#F9F9F9",
    borderRadius: 8,
  },
  customLabel: {
    fontSize: 16,
    fontWeight: "bold",
  },
  customRequirements: {
    marginTop: 12,
  },
  completeContainer: {
    marginTop: 16,
    padding: 16,
    backgroundColor: "#F0F9FF",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#BFDBFE",
  },
  completeLabel: {
    fontSize: 18,
    fontWeight: "700",
  },
  completeRequirements: {
    marginTop: 16,
    gap: 12,
  },
});

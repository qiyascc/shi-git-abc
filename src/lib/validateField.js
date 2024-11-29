import { convertCamelCaseToReadable } from "./functions";

export const validateField = (name, value) => {
  if (name === "isAccept") {
    return;
  }

  const readableName = convertCamelCaseToReadable(name);
  let valueLength = value?.trim?.().length ?? 0;

  // General required field validation
  if (valueLength === 0 && name != "linkedin") {
    return `The ${readableName} is required`;
  }

  // Email validation
  if (name === "email") {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(value)) {
      return `The ${readableName} must be a valid email address`;
    }
    return "";
  }

  // Phone number validation
  if (name === "phone") {
    const phonePattern = /^\+?[0-9]{10,15}$/;
    if (!phonePattern.test(value.trim())) {
      return `The ${readableName} must be a valid phone number with 10 to 15 digits.`;
    }
    return "";
  }

  // Min/max length and special character validation for text fields
  const minLength = name === "message" || name === "aboutProject" ? 10 : 3;
  const maxLength = name === "message" || name === "aboutProject" ? 500 : 50;
  const pattern =
    name === "message" || name === "aboutProject"
      ? /^[a-zA-ZƏəĞğİıÖöŞşÜüÇçА-Яа-яЁё0-9\s.,!()?[\]’-]+$/
      : /^[a-zA-ZƏəĞğİıÖöŞşÜüÇçА-Яа-яЁё0-9\s-]+$/;

  const specialMessage =
    name === "message" || name === "aboutProject"
      ? "letters, numbers, spaces, and punctuation"
      : "letters, numbers and spaces";

  if (name != "linkedin") {
    if (valueLength < minLength) {
      return `The ${readableName} must be at least ${minLength} letters long.`;
    }

    if (valueLength > maxLength) {
      return `The ${readableName} must be a maximum of ${maxLength} characters.`;
    }

    if (!pattern.test(value)) {
      return `The ${readableName} can only contain ${specialMessage}.`;
    }
  }

  if (name == "linkedin" && valueLength >= 1) {
    if (valueLength < minLength) {
      return `The ${readableName} must be at least ${minLength} letters long.`;
    }
    if (!pattern.test(value)) {
      return `The ${readableName} can only contain ${specialMessage}.`;
    }
  }

  return "";
};

import { useState, useCallback } from 'react';

type Validator = (value: string) => string | null;

interface FieldConfig {
  [field: string]: Validator;
}

interface ValidationState {
  errors: Record<string, string>;
  touched: Record<string, boolean>;
}

export function useFormValidation(config: FieldConfig) {
  const [state, setState] = useState<ValidationState>({
    errors: {},
    touched: {},
  });

  const validateField = useCallback(
    (field: string, value: string) => {
      const validator = config[field];
      if (!validator) return null;
      return validator(value);
    },
    [config]
  );

  const validateAll = useCallback(
    (values: Record<string, any>) => {
      const newErrors: Record<string, string> = {};
      let isValid = true;

      Object.keys(config).forEach((field) => {
        const error = validateField(field, String(values[field] ?? ''));
        if (error) {
          newErrors[field] = error;
          isValid = false;
        }
      });

      setState((prev) => ({ ...prev, errors: newErrors }));
      return isValid;
    },
    [config, validateField]
  );

  const handleBlur = useCallback(
    (field: string, value: string) => {
      const error = validateField(field, value);
      setState((prev) => ({
        errors: { ...prev.errors, [field]: error || '' },
        touched: { ...prev.touched, [field]: true },
      }));
    },
    [validateField]
  );

  const handleChange = useCallback(
    (field: string, value: string) => {
      if (state.touched[field]) {
        const error = validateField(field, value);
        setState((prev) => ({
          ...prev,
          errors: { ...prev.errors, [field]: error || '' },
        }));
      }
    },
    [state.touched, validateField]
  );

  const clearErrors = useCallback(() => {
    setState({ errors: {}, touched: {} });
  }, []);

  return {
    errors: state.errors,
    touched: state.touched,
    validateAll,
    handleBlur,
    handleChange,
    clearErrors,
  };
}
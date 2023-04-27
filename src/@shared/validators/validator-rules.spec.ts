import { ValidationError } from "../../@shared/errors/validation.error";
import { ValidatorRules } from "./validator-rules";

type Values = {
  value: any;
  property: string;
};

type ExpectedRule = {
  value: any;
  property: string;
  rule: keyof ValidatorRules;
  error: ValidationError;
  params?: any[];
};

function assertIsInvalid(expected: ExpectedRule) {
  expect(() => {
    runRule(expected);
  }).toThrow(expected.error);
}

function assertIsValid(expected: ExpectedRule) {
  expect(() => {
    runRule(expected);
  }).not.toThrow(expected.error);
}

function runRule({
  value,
  property,
  rule,
  params = [],
}: Omit<ExpectedRule, "error">) {
  const validator = ValidatorRules.values(value, property);
  const method = validator[rule] as (...args: any[]) => ValidatorRules;
  method.apply(validator, params);
}

describe("Validator Unit Tests", () => {
  describe("Test single methods", () => {
    test("values method", () => {
      const validator = ValidatorRules.values("some value", "field");
      expect(validator).toBeInstanceOf(ValidatorRules);
      expect(validator["value"]).toBe("some value");
      expect(validator["property"]).toBe("field");
    });

    test("required validation rule", () => {
      const arrangeInvalid: Values[] = [
        { value: null, property: "field" },
        { value: undefined, property: "field" },
        { value: "", property: "field" },
      ];

      arrangeInvalid.forEach(({ value, property }) => {
        assertIsInvalid({
          value,
          property,
          rule: "required",
          error: new ValidationError(`The ${property} is required`),
        });
      });

      const arrangeValid: Values[] = [
        { value: "test", property: "field" },
        { value: 0, property: "field" },
        { value: false, property: "field" },
      ];

      arrangeValid.forEach(({ value, property }) => {
        assertIsValid({
          value,
          property,
          rule: "required",
          error: new ValidationError(`The ${property} is required`),
        });
      });
    });

    test("string validation rule", () => {
      const arrangeInvalid: Values[] = [
        { value: 10, property: "field" },
        { value: {}, property: "field" },
        { value: false, property: "field" },
      ];

      arrangeInvalid.forEach(({ value, property }) => {
        assertIsInvalid({
          value,
          property,
          rule: "string",
          error: new ValidationError(`The ${property} must be a string`),
        });
      });

      const arrangeValid: Values[] = [
        { value: null, property: "field" },
        { value: undefined, property: "field" },
        { value: "test", property: "field" },
      ];

      arrangeValid.forEach(({ value, property }) => {
        assertIsValid({
          value,
          property,
          rule: "string",
          error: new ValidationError(`The ${property} must be a string`),
        });
      });
    });

    test("maxLength validation rule", () => {
      const MAX_LENGTH = 5;
      const arrangeInvalid: Values[] = [{ value: "123456", property: "field" }];

      arrangeInvalid.forEach(({ value, property }) => {
        assertIsInvalid({
          value,
          property,
          rule: "maxLength",
          error: new ValidationError(
            `The ${property} must be less or equal than ${MAX_LENGTH}`
          ),
          params: [MAX_LENGTH],
        });
      });

      const arrangeValid: Values[] = [
        { value: null, property: "field" },
        { value: undefined, property: "field" },
        { value: "12345", property: "field" },
      ];

      arrangeValid.forEach(({ value, property }) => {
        assertIsValid({
          value,
          property,
          rule: "maxLength",
          error: new ValidationError(
            `The ${property} must be less or equal than ${MAX_LENGTH}`
          ),
          params: [MAX_LENGTH],
        });
      });
    });

    test("boolean validation rule", () => {
      const arrangeInvalid: Values[] = [
        { value: 5, property: "field" },
        { value: "true", property: "field" },
        { value: "false", property: "field" },
      ];

      arrangeInvalid.forEach(({ value, property }) => {
        assertIsInvalid({
          value,
          property,
          rule: "boolean",
          error: new ValidationError(`The ${property} must be a boolean`),
        });
      });

      const arrangeValid: Values[] = [
        { value: null, property: "field" },
        { value: undefined, property: "field" },
        { value: true, property: "field" },
        { value: false, property: "field" },
      ];

      arrangeValid.forEach(({ value, property }) => {
        assertIsValid({
          value,
          property,
          rule: "boolean",
          error: new ValidationError(`The ${property} must be a boolean`),
        });
      });
    });
  });

  describe("Test combined methods", () => {
    it("should throw a validation error when combine two or more validation rules", () => {
      const MAX_LENGTH = 5;
      let validator = ValidatorRules.values(null, "field");
      expect(() => validator.required().string().maxLength(MAX_LENGTH)).toThrow(
        new ValidationError(`The field is required`)
      );

      validator = ValidatorRules.values(10, "field");
      expect(() => validator.required().string().maxLength(MAX_LENGTH)).toThrow(
        new ValidationError(`The field must be a string`)
      );

      validator = ValidatorRules.values("123456", "field");
      expect(() => validator.required().string().maxLength(MAX_LENGTH)).toThrow(
        new ValidationError(
          `The field must be less or equal than ${MAX_LENGTH}`
        )
      );
    });
  });
});

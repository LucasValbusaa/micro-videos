import CategoryValidatorFactory, {
  CategoryRules,
  CategoryValidator,
} from "../category.validator";
import { stubValidFields, stubValidateFieldName } from "./stub";

describe("CategoryValidator Test", () => {
  let validator: CategoryValidator;

  beforeEach(() => {
    validator = CategoryValidatorFactory.create();
  });
  test("invalidation cases for name field", () => {
    stubValidateFieldName.forEach(({ validate_value, validate_message }) => {
      const isValid = validator.validate(validate_value);
      expect(isValid).toBeFalsy();
      expect(validator.errors["name"]).toStrictEqual(validate_message.name);
    });
  });

  test("valid cases for fields", () => {
    stubValidFields.forEach((data) => {
      const isValid = validator.validate(data);
      expect(isValid).toBeTruthy();
      expect(validator.validatedData).toStrictEqual(new CategoryRules(data));
    });
  });
});

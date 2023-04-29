import { EntityValidationError } from "../../../../@shared/domain/errors/validation.error";
import { Category } from "../category";
import {
  stubInvalidCreatedAtProperty,
  stubInvalidDescriptionProperty,
  stubInvalidIsActiveProperty,
  stubInvalidNameProperty,
} from "./stubs";

describe("Category Integration Test", () => {
  describe("Create Method", () => {
    it("should a invalid category using name property", () => {
      stubInvalidNameProperty.forEach(({ value, message_error }) => {
        expect(() => new Category(value)).toThrow(
          new EntityValidationError(message_error)
        );
      });
    });
    it("should a invalid category using description property", () => {
      stubInvalidDescriptionProperty.forEach(({ value, message_error }) => {
        expect(() => new Category(value)).toThrow(
          new EntityValidationError(message_error)
        );
      });
    });
    it("should a invalid category using is_active property", () => {
      stubInvalidIsActiveProperty.forEach(({ value, message_error }) => {
        expect(() => new Category(value)).toThrow(
          new EntityValidationError(message_error)
        );
      });
    });
    it("should a invalid category using created_at property", () => {
      stubInvalidCreatedAtProperty.forEach(({ value, message_error }) => {
        expect(() => new Category(value)).toThrow(
          new EntityValidationError(message_error)
        );
      });
    });
  });
  describe("Update Method", () => {
    it("should a invalid category using name property", () => {
      stubInvalidNameProperty.forEach(({ value, message_error }) => {
        const category = new Category({ name: "Movie" });
        expect(() => category.update(value)).toThrow(
          new EntityValidationError(message_error)
        );
      });
    });

    it("should a invalid category using description property", () => {
      stubInvalidNameProperty.forEach(({ value, message_error }) => {
        const category = new Category({
          name: "Movie",
          description: "Movie description",
        });
        expect(() => category.update(value)).toThrow(
          new EntityValidationError(message_error)
        );
      });
    });
  });
});

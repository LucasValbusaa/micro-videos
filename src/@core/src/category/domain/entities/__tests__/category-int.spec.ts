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
    it("should a invalid category when update with incorrect properties", () => {
      const stubInvalidPropsUpdate = [
        {
          value: null,
          message_error: {
            name: [
              "name should not be empty",
              "name must be a string",
              "name must be shorter than or equal to 255 characters",
            ],
          },
        },
        {
          value: { name: "", description: "some description" },
          message_error: {
            name: ["name should not be empty"],
          },
        },
        {
          value: { name: 5 as any, description: "some description" },
          message_error: {
            name: [
              "name must be a string",
              "name must be shorter than or equal to 255 characters",
            ],
          },
        },
        {
          value: { name: "t".repeat(256), description: "some description" },
          message_error: {
            name: ["name must be shorter than or equal to 255 characters"],
          },
        },
        {
          value: { name: "Some Movie", description: 5 as any },
          message_error: {
            description: ["description must be a string"],
          },
        },
      ];

      stubInvalidPropsUpdate.forEach(({ value, message_error }) => {
        const category = new Category({ name: "Movie" });
        expect(() => category.update(value)).toThrow(
          new EntityValidationError(message_error)
        );
      });
    });
  });
});

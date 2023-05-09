import { FieldsErrors } from "../validators/validator-fields-interface";

export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "Validation Error";
  }
}

export class EntityValidationError extends Error {
  constructor(public error: FieldsErrors) {
    super(JSON.stringify(error));
    this.name = "Entity Validation Error";
  }
}

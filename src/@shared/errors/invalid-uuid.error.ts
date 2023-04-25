export class InvalidUuidError extends Error {
  constructor() {
    super("ID must be a valid uuid");
    this.name = "Invalid Uuid Error";
  }
}

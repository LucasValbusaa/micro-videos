export class InvalidCastMemberTypeError extends Error {
  constructor(invalidType: any) {
    super(`Invalid cast member type: ${invalidType}`);
    this.name = "Invalid Cast Member Type Error";
  }
}

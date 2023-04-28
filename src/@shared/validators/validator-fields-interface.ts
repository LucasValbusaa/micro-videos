export type FieldsErrors = {
  [field: string]: string[];
};

export default interface ValidateFieldsInterface<PropsValidated> {
  errors: FieldsErrors;
  validatedData: PropsValidated;
  validate(data: any): boolean;
}

import { validateSync } from "class-validator";
import ValidateFieldsInterface, {
  FieldsErrors,
} from "./validator-fields-interface";

export default abstract class ClassValidatorFields<PropsValidated>
  implements ValidateFieldsInterface<PropsValidated>
{
  errors: FieldsErrors = null;
  validatedData: PropsValidated = null;
  validate(data: any): boolean {
    const errors = validateSync(data);
    if (errors.length) {
      this.errors = {};
      for (const error of errors) {
        const field = error.property;
        this.errors[field] = Object.values(error.constraints);
      }
    } else {
      this.validatedData = data;
    }

    return !errors.length;
  }
}

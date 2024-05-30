import Joi from "joi";
import { SchemaValidator } from "./SchemaValidator";
import { BadRequestError } from "../../Exceptions/http/BadRequestError";
import { ERRORCODE } from "..";

interface IValidateProps {
  schema: Joi.Schema;
  payload: any;
}

export class JoiValidatorImpl extends SchemaValidator {
  validate(props: IValidateProps): boolean {
    const validationResult = props.schema.validate(props.payload);

    if (validationResult.error) {
      throw new BadRequestError(
        ERRORCODE.VALIDATOR_ERROR,
        validationResult.error.message
      );
    }

    return true;
  }
}

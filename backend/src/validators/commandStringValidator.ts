import { registerDecorator, ValidationOptions } from 'class-validator';
import { IndividualCommands } from '../dto/setupHover.dto';

export function IsCommandString(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isEnumString',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value) {
          if (typeof value === 'string') {
            const commandValues = Object.values(IndividualCommands).join('');
            const regex = new RegExp(`^[${commandValues}]+$`, 'g');
            return value.match(regex) !== null;
          }
          return false;
        },
      },
    });
  };
}

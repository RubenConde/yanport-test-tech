import { registerDecorator, ValidationOptions } from 'class-validator';

export function IsCommandString(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isEnumString',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value) {
          if (typeof value === 'string')
            return value.match(/^[ADG ]+$/g) !== null;
          return false;
        },
      },
    });
  };
}

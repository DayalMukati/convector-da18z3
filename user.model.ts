import * as yup from 'yup';
import {
  ConvectorModel,
  ReadOnly,
  Required,
  Validate,
  FlatConvectorModel,
  Default
} from '@worldsibu/convector-core';

export class User extends ConvectorModel<User> {
  public type = 'org.convector.examples.user';

  @Required()
  @Validate(yup.string())
  public name: string;

  @Required()
  @Validate(yup.array(yup.string()))
  public allowedIdentities: string[];
}

/** @module @worldsibu/convector-examples-token */

import * as yup from 'yup';
import {
  Controller,
  ConvectorController,
  Invokable,
  Param
} from '@worldsibu/convector-core';

import { User } from './user.model';

@Controller('User')
export class UserController extends ConvectorController {
  @Invokable()
  public async register(
    @Param(User)
    user: User
  ) {
    const _user = await User.getOne(user.id);
    if (_user.id) {
      throw new Error('DUPERR: Another element with this ID already exists');
    }

    user.allowedIdentities = [this.sender];
    return await user.save();
  }

  @Invokable()
  public async rename(
    @Param(yup.string())
    id: string,
    @Param(yup.string())
    name: string
  ) {
    const user = await User.getOne(id);

    if (!user.id) {
      throw new Error('User doesn\'t exist');
    }

    if (user.allowedIdentities.indexOf(this.sender) < 0) {
      throw new Error('Permission denied, only the allowed identities can update the user name');
    }

    await user.update({ name });
  }
}

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';

@Schema({ versionKey: false })
export class User {
  @Prop({ required: true })
  full_name: string;

  @Prop({ unique: true, required: true })
  cpf: string;

  @Prop({ required: true })
  password: string;

  @Prop({ unique: true, required: true })
  account: string;

  @Prop({ required: true, default: 0, minimum: 0 })
  checkingAccountAmount: number;

  @Prop({ required: true })
  positions: object[];

  @Prop({ required: true, default: 0 })
  consolidated: number;
}

export const UserSchema = SchemaFactory.createForClass(User).pre(
  'save',
  async function () {
    const hashPassword = await bcrypt.hash(this.password, 10);
    this.password = hashPassword;
  },
);

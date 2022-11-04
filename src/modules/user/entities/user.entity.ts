import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ versionKey: false })
export class User {
  @Prop({ required: true })
  nome_completo: string;

  @Prop({ unique: true, required: true })
  cpf: string;

  @Prop({ unique: true, required: true })
  account: string;

  @Prop({ required: true, default: 0, minimum: 0 })
  checkingAccountAmount: number;

  @Prop({ required: true })
  positions: object[];

  @Prop({ required: true, default: 0 })
  consolidated: number;
}

export const UserSchema = SchemaFactory.createForClass(User);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ versionKey: false })
export class Trend {
  @Prop({ unique: true, required: true })
  symbol: string;

  @Prop({ required: true })
  currentPrice: number;
}

export const TrendSchema = SchemaFactory.createForClass(Trend);

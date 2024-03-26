import mongoose, { Document, Schema } from 'mongoose';

interface IRole extends Document {
  name: string;
}

const roleSchema: Schema<IRole> = new Schema({
  name: {
    type: String,
    required: true
  }
});

const Role = mongoose.model<IRole>('Role', roleSchema);

export { Role, IRole };


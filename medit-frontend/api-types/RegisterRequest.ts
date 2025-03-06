import { RoleEnum } from "../src/generated/models/RoleEnum";

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: RoleEnum;
  timezone: string;
  language: string;
  created_at: Date;
  updated_at: Date;
}

import { RoleEnum } from "./RoleEnum";

export interface User {
  id?: number;
  first_name: string;
  last_name: string;
  email: string;
  role: RoleEnum;
  created_at: Date;
  update_at: Date;
  timezone: string;
  language: string;
  synced_at: Date;
}

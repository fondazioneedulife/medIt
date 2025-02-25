export interface Auth {
  user_id: number;
  password: string;
  failed_attempts: number;
  last_login: Date;
  synced_at: Date;
}

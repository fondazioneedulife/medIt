export interface Reminder {
  id?: number;
  medication_id: number;
  reminder_date_time: Date;
  id_group: string;
  synced_at: Date;
}

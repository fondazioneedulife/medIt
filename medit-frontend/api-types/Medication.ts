import { MedicationEnum } from "./MedicationEnum";

export interface Medication {
  id?: number;
  userId: number;
  name: string;
  type: MedicationEnum;
  dose: string;
  program: string;
  quantity: number;
  note: string;
  created_at: Date;
  update_at: Date;
  synced_at: Date;
}

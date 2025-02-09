export interface PlayerFormData {
  id: number | null;
  name: string;
  skill: number | null;
}

export type AddPlayerFormData = Omit<PlayerFormData, 'id'>;

export interface Player {
  id: number;
  name: string;
  skill: number;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string | null;
}

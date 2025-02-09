export interface TeamFormData {
  id: number | null;
  name: string;
}

export interface Team {
  id: number;
  name: string;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string | null;
}

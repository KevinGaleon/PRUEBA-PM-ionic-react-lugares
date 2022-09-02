export interface Lugar {
  code: number;
  title: string;
  photo: string;
  description?: string[];
}

export interface LugaresState {
  lugaresList: Lugar[];
  lugarSelected: Lugar;
}


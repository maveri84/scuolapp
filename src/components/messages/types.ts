
import { ReactNode } from "react";

export interface Field {
  name: string;
  label: string;
  icon: ReactNode;
}

export interface FieldCategory {
  category: string;
  fields: Field[];
}

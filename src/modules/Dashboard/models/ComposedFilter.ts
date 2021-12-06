import { Filter } from "./Filter";

export interface ComposedFilter {
  [key: string]: Filter[];
}

import { RchilliMainKey } from "./RchilliMainKey";
import { RchilliSubKey } from "./RchilliSubKey";

export interface Operation {
  section: string;
  rchillyKey: string;
  values: RchilliMainKey[];
}

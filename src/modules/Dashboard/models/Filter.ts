export interface Filter {
  [key: string]:
    | {
        [subKey: string]: string;
      }
    | {
        [subKey: string]: {
          [key: string]: string;
        };
      }
    | string;
}

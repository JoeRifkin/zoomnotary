import { DataType } from "./DataType";

export type Award = DataType<{
  // Customizable Area Start
  title: string;
  associated_with: string;
  issuer: string;
  issue_date: string;
  description: string;
  make_public: boolean;
  // Customizable Area End
}>;

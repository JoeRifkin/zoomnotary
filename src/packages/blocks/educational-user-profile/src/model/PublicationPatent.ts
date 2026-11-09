import { DataType } from "./DataType";

export type PublicationPatent = DataType<{
  // Customizable Area Start
  title: string;
  publication: string;
  authors: string;
  url: string;
  description: string;
  make_public: boolean;
  profile_id: number;
  // Customizable Area End
}>;

import { DataType } from "./DataType";

export type Project = DataType<{
  // Customizable Area Start
  id: number;
  project_name: string;
  start_date: string;
  end_date: string;
  add_members: null;
  url: string;
  description: string;
  make_projects_public: boolean;
  profile_id: number;
  associated_projects: string[];
  // Customizable Area End
}>;

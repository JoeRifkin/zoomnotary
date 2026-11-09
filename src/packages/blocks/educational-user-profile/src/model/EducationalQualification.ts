import { DataType } from "./DataType";

export type EducationalQualification = DataType<{
  id: number;
  school_name: string;
  start_date: string;
  end_date: string;
  grades: string;
  description: string;
  make_grades_public: boolean;
  degree_name: string | null;
  field_of_study: string | null;
  profile_id: number;
}>;

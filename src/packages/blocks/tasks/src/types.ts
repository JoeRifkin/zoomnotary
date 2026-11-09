// Customizable Area Start
export type Status = {
  id: number;
  name: "to_do" | "in_progress" | "complete";
};

export type Priority = {
  id: number;
  name: "low" | "medium" | "high";
};

export interface IAccount {
  isSelected: boolean;
  id: string;
  type: "account";
  attributes: {
    first_name: string;
    last_name: string;
  };
}

export interface IGroupAccount {
  id: number;
  type: "account";
  first_name: string;
  last_name: string;
}

export interface IGroup {
  id: string;
  type: "group";
  attributes: {
    name: string;
    accounts: IGroupAccount[];
  };
}

export interface ITask {
  isSelected: boolean;
  id: string;
  attributes: {
    id: number;
    account_id: number;
    title: string;
    description: string;
    status: Status["name"];
    priority: Priority["name"];
    created_at: Date;
    updated_at: Date;
    assigned_to: IAccount | IGroup;
  };
}

export interface ITaskList {
  isSelected: boolean;
  id: number;
  attributes: {
    id: number;
    account_id: number;
    name: string;
    created_at: Date;
    updated_at: Date;
    tasks: ITask[];
  };
}
// Customizable Area End
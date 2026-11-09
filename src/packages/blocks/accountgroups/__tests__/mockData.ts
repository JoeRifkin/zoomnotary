import { Account, Group } from "../src/types";

export const testGroupData: Group[] = [
  {
    id: "1",
    attributes: {
      name: "Developers",
      accounts: [
        {
          isSelected: true,
          id: 1,
          first_name: "test",
          last_name: "test",
        },
        {
          isSelected: true,
          id: 2,
          first_name: "test",
          last_name: "test",
        },
      ],
    },
  },
];

export const testAccountData: Account[] = [
  {
    id: "1",
    isSelected: true,
    attributes: {
      first_name: "test",
      last_name: "test",
    },
  },
  {
    id: "2",
    isSelected: false,
    attributes: {
      first_name: "testing",
      last_name: "account",
    },
  },
];

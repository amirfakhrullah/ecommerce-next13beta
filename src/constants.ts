export const PRODUCTS_PER_PAGE = 12;

/**
 * Temporary used only
 * Haven't fully migrated the sizes yet
 */
export const DEFAULT_SIZES = [
  "9",
  "9.5",
  "10",
  "10.5",
  "11",
  "11.5",
  "12",
  "12.5",
];

export const LIMIT_CART_SIZE = 5;

export const LIMIT_SEARCH_INPUT = 50;

export interface UserTabObj {
  label: string;
}

export const userTabs: UserTabObj[] = [
  {
    label: "Profile",
  },
  {
    label: "Order History",
  },
  {
    label: "Debit/Credit Card",
  },
  {
    label: "Danger Section",
  },
];

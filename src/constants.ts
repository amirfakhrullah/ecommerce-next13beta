export const PRODUCTS_PER_PAGE = 12;
export const ITEMS_PER_PAGE = 8;

export const LIMIT_ORDERS_PER_USER = 8;

export const DEFAULT_SIZES = [
  "3.5",
  "4",
  "4.5",
  "5",
  "5.5",
  "6",
  "6.5",
  "7",
  "7.5",
  "8",
  "8.5",
  "9.5",
  "10",
  "10.5",
  "11",
  "11.5",
  "12",
  "12.5",
  "13",
  "13.5",
  "14",
  "14.5",
  "15",
  "16",
  "17",
  "18",
];

export const LIMIT_CART_SIZE = 5;

export const LIMIT_SEARCH_INPUT = 50;

export interface UserTabObj {
  label: string;
}

export const userTabs: UserTabObj[] = [
  {
    label: "Order History",
  },
  {
    label: "About",
  },
];

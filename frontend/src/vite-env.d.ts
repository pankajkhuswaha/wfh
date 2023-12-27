/// <reference types="vite/client" />
type RouteProps = {
  name: string;
  path: string;
  element?: React.ReactNode;
  child?: RouteProps;
};
type ChildProps = {
  children: React.ReactNode;
};

type data = Record<
  string,
  | string
  | []
  | boolean
  | number
  | Record<string, string | [] | boolean | number | object>
>;

type datatablecol = {
  headerName: string;
  field: string;
  style?: React.CSSProperties;
  renderCell?: (row: row) => React.ReactNode;
};

type row = Record<string, unknown>;

type RecordData = Record<
  string,
  string | number | boolean | [] | object
> | null;


type User = {
  cart: { products: [] };
  _id: string;
  fullName: string;
  email: string;
  mobile: string;
  password: string;
  role: string;
  client: [];
  order: [];
  address: [];
  createdAt: Date;
  updatedAt: Date;
  __v: number;
};

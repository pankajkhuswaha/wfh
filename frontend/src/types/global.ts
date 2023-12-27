import { z } from 'zod';
export type ReactProps = {
  children?: React.ReactNode;
  className?: string;
};
export type ChildrenProps = {
  children: React.ReactNode;
};
export type RecordData = Record<
  string,
  string | number | boolean | [] | object
> | null;

export type IdParams = {
  params: {
    _id: string;
  };
};

export interface ApiResponse {
  success?: boolean;
  message?: string;
  data?: unknown;
}
export type data = Record<
  string,
  | string
  | []
  | boolean
  | number
  | Record<string, string | [] | boolean | number | object>
>;
export type datatablecol = {
  headerName: string;
  field: string;
  style?: React.CSSProperties;
  renderCell?: (row: row) => React.ReactNode;
};
export type row = Record<string, unknown>;
export type FormInputs = {
  name: string;
  label?: string;
  placeholder?: string;
  className?: string;
  rules?: {
    maxLength?: number;
    required?: string;
    pattern?: {
      value: RegExp;
      message: string;
    };
  };
};

//* user
export type User = {
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

export interface SidebarRouteProps {
  name: string;
  logo: JSX.Element;
  Link?: string;
  child?: SidebarRouteProps[];
}

type Field = {
  name: "mobile" | "address" | "name" | "location";
  placeholder: string;
};
export const InputFileds:Field[] = [
  { name: "name", placeholder: "Name" },
  { name: "mobile", placeholder: "Call Number" },
  { name: "location", placeholder: "Location" },
  { name: "address", placeholder: "Address" },
];

export const FormSchema = z.object({
  name:z.string(),
  mobile:z.string().min(10).max(14),
  address:z.string(),
  location:z.string(),  
  status:z.string(),
  subStatus:z.string().nullable(),
  

});

export type FormSchemaType = z.infer<typeof FormSchema>;
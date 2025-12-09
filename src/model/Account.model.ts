
interface AccountModel  { 
  label: string,
  name?: string,
  
}
interface Account {
  first_name: string,
  last_name:any,
  email:any,
  id?:string 
}
const accountSchema: Account = {
  first_name: "",
  email: "",
  last_name: "",
  id: "",
};

const AccountsModelSchema: AccountModel[] = [
  {
    label: "First Name",
    name: "first_name",
  },
  {
    label: "Last Name",
    name: "last_name",
  },
  {
    label: "Email",
    name: "email",
  },
];

export type { AccountModel, Account };
export { AccountsModelSchema,accountSchema };
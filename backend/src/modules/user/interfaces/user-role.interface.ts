export interface IUserRole {
  id: number;
  userInfo: {
    role: {
      name: string;
    } | null;
  } | null;
}

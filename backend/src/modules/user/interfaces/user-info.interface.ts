export interface IUserInfo {
  id: number;
  email: string;
  password: string;
  userInfo: {
    surname: string;
    name: string;
    role: {
      name: string;
    } | null;
  } | null;
}

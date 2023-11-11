import { Role } from "../enums/Role";

export default interface AuthUser {
  email?: string;
  password?: string;
  passwordConfirmation?: string;
  role?: Role;
}

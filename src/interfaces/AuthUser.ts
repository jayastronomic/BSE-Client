import { Role } from "../enums/Role";
import Profile from "./Profile";

export default interface AuthUser {
  id?: string;
  email?: string;
  password?: string;
  passwordConfirmation?: string;
  role?: Role;
  profile?: Profile;
}

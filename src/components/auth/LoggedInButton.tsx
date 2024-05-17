import type { User } from 'next-auth';
import type { UserDropDownVariant } from './UserDropDown';
import UserDropDown from './UserDropDown';

type LoggedInButtonProps = {
  user: User;
  loggedButtonVariant?: UserDropDownVariant;
}

const LoggedInButton = ({ user, loggedButtonVariant }: LoggedInButtonProps) => {
  return <UserDropDown user={user} variant={loggedButtonVariant} />;
};

export default LoggedInButton;

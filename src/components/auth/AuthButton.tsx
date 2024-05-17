import { auth } from '@/lib/auth/helper';
import type { ButtonProps } from '@mantine/core';
import LoggedInButton from './LoggedInButton';
import SignInButton from './SignInButton';
import type { UserDropDownVariant } from './UserDropDown';

type AuthButtonProps = {
  buttonProps?: ButtonProps;
  loggedButtonVariant?: UserDropDownVariant;
}
const AuthButton = async ({
  buttonProps,
  loggedButtonVariant,
}: AuthButtonProps) => {
  const user = await auth();

  if (user)
    return (
      <LoggedInButton user={user} loggedButtonVariant={loggedButtonVariant} />
    );

  return <SignInButton buttonProps={buttonProps} />;
};

export default AuthButton;

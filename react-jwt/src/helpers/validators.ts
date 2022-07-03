export const usernameValidator = (value: string): string | undefined => {
  // TODO: Username validation logic.
  if (value.length < 4) {
    return 'Username is incorrect.';
  }
};

export const passwordValidator = (value: string): string | undefined => {
  // TODO: Password validation logic.
  if (value.length < 4) {
    return 'Password is incorrect.';
  }
};

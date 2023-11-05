export function isSignUpFormDataValid(user, passwordRepeat) {
  if (
    passwordRepeat !== user.password ||
    user.password.length < 8 ||
    user.firstname === "" ||
    user.lastname === "" ||
    user.username === "" ||
    user.email === "" ||
    user.company === "" ||
    user.city === ""
  )
    return false;
  return true;
}

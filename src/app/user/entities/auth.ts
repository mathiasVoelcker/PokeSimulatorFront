export class Auth {
  auth: {
    email: string,
    password: string
  }

  constructor(newEmail: string, newPassword: string) {
    this.auth = {
      email: newEmail,
      password: newPassword
    }
  }
}

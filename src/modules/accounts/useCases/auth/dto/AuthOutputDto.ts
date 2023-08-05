export class AuthOutputDto {
  constructor(name: string, email: string, token: string) {
    this.name = name;
    this.email = email;
    this.token = token;
  }

  name: string;
  email: string;
  token: string;
}

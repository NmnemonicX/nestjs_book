export class payloadUserDTO {
  id: string;
  email: string;
  firstName: string;
}

export class createUserDTO {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export class signinUserDTO {
  email: string;
  password: string;
}

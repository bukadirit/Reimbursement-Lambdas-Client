export interface AwsUser {
  id: any;
  username: string;
  attributes: {
    email: string;
    phone_number: string;
    sub: string;
  };
}

export interface AttributeForm {
  email: string;
  phone_number: string;
}

export class Attributes {
  constructor(
    public email?: string,
    public phone_number?: string,
    public given_name?: string,
    public family_name?: string,
    public nickname?: string,
    public sub?: string
  ) {}
}

export class User {
  constructor(
    public id?: any,
    public username?: string,
    public attributes?: Attributes
  ) {}
}

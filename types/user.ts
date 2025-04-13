export type UserType = {
  id?: number;
  uid?: string;
  login?: string;
  email?: string;
  password?: string;
  firstName?: string;
  username?: string;
  authority?: UserRole;
  lastName?: string;
  langKey?: string;
  imageUrl?: string;
  mobile?: string;
  isVerify?: boolean;
  completeRegistration?: boolean;
  currentStep?: number;
  otp?: string;
  activationKey?: string;
  resetKey?: string;
  resetDate?: string;
  authorities?: AuthoritiesType[];
  createdBy?: string;
  createdDate?: string;
  lastModifiedBy?: string;
  lastModifiedDate?: string;
};

export enum UserRole {
  PARENT = 'ROLE_PARENT',
  GROOM = 'ROLE_GROOM',
}

export type AuthoritiesType = {
  name: string;
};

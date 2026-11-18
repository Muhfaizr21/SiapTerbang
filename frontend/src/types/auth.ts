export interface LoginFormValues {
  readonly email: string;
  readonly password: string;
  readonly rememberMe?: boolean;
}

export interface LoginValidationErrors {
  email?: string;
  password?: string;
  general?: string;
}

export interface DemoAccountOption {
  readonly id: string;
  readonly roleName: string;
  readonly email: string;
  readonly defaultPass: string;
  readonly description: string;
  readonly badgeColor: string;
}

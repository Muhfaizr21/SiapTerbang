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

export interface RegisterFormValues {
  readonly fullName: string;
  readonly lpkName: string;
  readonly email: string;
  readonly whatsapp: string;
  readonly subdomain: string;
  readonly password: string;
  readonly agreeTerms?: boolean;
}

export interface RegisterValidationErrors {
  fullName?: string;
  lpkName?: string;
  email?: string;
  whatsapp?: string;
  subdomain?: string;
  password?: string;
  agreeTerms?: string;
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

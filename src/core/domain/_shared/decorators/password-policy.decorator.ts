import { SetMetadata } from '@nestjs/common';
export const PASSWORD_POLICY_KEY = 'password_policy';
export type PasswordPolicyOptions = { min?: number; upper?: boolean; lower?: boolean; digit?: boolean; symbol?: boolean };
export const PasswordPolicy = (opts: PasswordPolicyOptions = {}) => SetMetadata(PASSWORD_POLICY_KEY, opts);

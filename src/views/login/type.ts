import { LoginResResultData } from '/@/api/auth/types';
import { Result } from '/@/types/result';

export interface LoginFormInstance {
  validate: () => Promise<Boolean | undefined>
  doLogin: (captchaId?: string) => Promise<Result<LoginResResultData>>
}

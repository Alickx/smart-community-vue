import { Result } from '/@/types/result';

export interface RegisterFormInstance {
  validate: () => Promise<Boolean | undefined>
  doRegister: (captchaId?: string) => Promise<Result<Boolean>>
}

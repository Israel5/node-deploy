import { hash, verify } from 'argon2';
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';

export default class Argon2 implements IHashProvider {
  public async generateHash(payload: string): Promise<string> {
    return hash(payload);
  }

  public async compareHash(payload: string, hashed: string): Promise<boolean> {
    return verify(hashed, payload);
  }
}

import { container } from 'tsyringe';
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';
import Argon2HashProvider from '@modules/users/providers/HashProvider/implementations/Argon2HashProvider';
// import BCryptHashProvider from '@modules/users/providers/HashProvider/implementations/BCryptHashProvider';

container.registerSingleton<IHashProvider>('HashProvider', Argon2HashProvider);

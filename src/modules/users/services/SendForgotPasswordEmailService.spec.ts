import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import SendForgotPasswordEmailService from '@modules/users/services/SendForgotPasswordEmailService';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';

let fakeUsersRepository: FakeUsersRepository;
let fakeMailProvider: FakeMailProvider;
let fakeUserTokensRepository: FakeUserTokensRepository;
let sendForgotPasswordEmail: SendForgotPasswordEmailService;

describe('SendForgotPasswordEmail', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeMailProvider = new FakeMailProvider();
    fakeUserTokensRepository = new FakeUserTokensRepository();

    sendForgotPasswordEmail = new SendForgotPasswordEmailService(
      fakeUsersRepository,
      fakeMailProvider,
      fakeUserTokensRepository,
    );
  });

  it('should be able to create a new password using the email', async () => {
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john.doe@example.org',
      password: '123456',
    });

    await sendForgotPasswordEmail.execute({
      email: 'john.doe@example.org',
    });

    // expect(sendMail).toHaveBeenCalledWith('john.doe@example.org');
    expect(sendMail).toHaveBeenCalled();
  });

  it('should not be able to create a new password for a non-existing user', async () => {
    await expect(
      sendForgotPasswordEmail.execute({
        email: 'john.doe@example.org',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should generate a password creation token', async () => {
    const generateToken = jest.spyOn(fakeUserTokensRepository, 'generate');

    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john.doe@example.org',
      password: '123456',
    });

    await sendForgotPasswordEmail.execute({
      email: 'john.doe@example.org',
    });

    expect(generateToken).toHaveBeenCalledWith(user.id);
  });
});

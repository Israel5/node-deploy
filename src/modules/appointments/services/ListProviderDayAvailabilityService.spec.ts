import AppError from '@shared/errors/AppError';
import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import ListProviderDayAvailabilityService from '@modules/appointments/services/ListProviderDayAvailabilityService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderDayAvailability: ListProviderDayAvailabilityService;

describe('ListProviderDayAvailability', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderDayAvailability = new ListProviderDayAvailabilityService(
      fakeAppointmentsRepository,
    );
  });

  // it('should be able to list the day availability of a provider', async () => {
  //   await fakeAppointmentsRepository.create({
  //     provider_id: 'provider-id',
  //     date: new Date(2020, 4, 20, 8),
  //   });

  //   await fakeAppointmentsRepository.create({
  //     provider_id: 'provider-id',
  //     date: new Date(2020, 4, 20, 10),
  //   });

  //   jest.spyOn(Date, 'now').mockImplementationOnce(() => {
  //     return new Date(2020, 4, 20, 11).getTime();
  //   });

  //   const availability = await listProviderDayAvailability.execute({
  //     provider_id: 'provider-id',
  //     year: 2020,
  //     month: 5,
  //     day: 20,
  //   });

  //   expect(availability).toEqual(
  //     expect.arrayContaining([
  //       { date: 8, available: false },
  //       { date: 9, available: true },
  //       { date: 10, available: false },
  //       { date: 11, available: true },
  //     ]),
  //   );
  // });

  it('should be able to list the day availability of a provider', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 20, 11).getTime();
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'provider-id',
      user_id: 'user-id',
      date: new Date(2020, 4, 20, 14),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'provider-id',
      user_id: 'user-id',
      date: new Date(2020, 4, 20, 15),
    });

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 20, 11).getTime();
    });

    const availability = await listProviderDayAvailability.execute({
      provider_id: 'provider-id',
      year: 2020,
      month: 5,
      day: 20,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { date: 8, available: false },
        { date: 9, available: false },
        { date: 10, available: false },
        { date: 13, available: true },
        { date: 14, available: true },
        { date: 15, available: true },
        { date: 16, available: true },
      ]),
    );
  });
});

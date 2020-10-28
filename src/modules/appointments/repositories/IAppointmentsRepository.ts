import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import IFindAllAppointmentsInAMonthDTO from '@modules/appointments/dtos/IFindAllAppointmentsInAMonthDTO';
import IFindAllAppointmentsInADayDTO from '@modules/appointments/dtos/IFindAllAppointmentsInADayDTO';

export default interface IAppointmentsRepository {
  create(data: ICreateAppointmentDTO): Promise<Appointment>;
  findByDate(date: Date, provider_id: string): Promise<Appointment | undefined>;
  findAllAppointmentsInAMonth(
    date: IFindAllAppointmentsInAMonthDTO,
  ): Promise<Appointment[]>;
  findAllAppointmentsInADay(
    date: IFindAllAppointmentsInADayDTO,
  ): Promise<Appointment[]>;
}

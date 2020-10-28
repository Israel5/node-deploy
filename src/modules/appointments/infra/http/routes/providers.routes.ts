import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProvidersController from '@modules/appointments/infra/http/controllers/ProvidersController';

import ProvidersMonthAvailabilityController from '@modules/appointments/infra/http/controllers/ProvidersMonthAvailabilityController';
import ProvidersDayAvailabilityController from '@modules/appointments/infra/http/controllers/ProvidersDayAvailabilityController';

const providersRoute = Router();
const providersController = new ProvidersController();

const providersMonthAvailabilityController = new ProvidersMonthAvailabilityController();
const providersDayAvailabilityController = new ProvidersDayAvailabilityController();

providersRoute.use(ensureAuthenticated);

providersRoute.get('/', providersController.index);

providersRoute.get(
  '/:provider_id/month-availability',
  celebrate({
    [Segments.PARAMS]: {
      provider_id: Joi.string().uuid().required(),
    },
  }),
  providersMonthAvailabilityController.index,
);
providersRoute.get(
  '/:provider_id/day-availability',
  celebrate({
    [Segments.PARAMS]: {
      provider_id: Joi.string().uuid().required(),
    },
  }),
  providersDayAvailabilityController.index,
);

export default providersRoute;

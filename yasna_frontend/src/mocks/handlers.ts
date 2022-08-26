import { rest } from 'msw';
import mockNavData from './navigation_data.json';
import mockObjectData from './object.json';
import mockFrameRangeData from './framerange.json';
import mockAnnotationsData from './annotations.json';
import endpoints from '../api/endpoints';

export const handlers = [
  rest.get(endpoints.navigation, (_req, res, ctx) => {
    return res(ctx.json(mockNavData));
  }),
  rest.get(`${endpoints.object}:objectId`, (req, res, ctx) => {
    return res(ctx.json(mockObjectData));
  }),
  rest.get(endpoints.objectsInFrame, (_, res, ctx) => {
    return res(ctx.json(mockFrameRangeData));
  }),
  rest.get(endpoints.annotations, (_, res, ctx) => {
    return res(ctx.json(mockAnnotationsData));
  }),
];

import axios from 'axios';
import { useQuery } from 'react-query';
import endpoints from '../api/endpoints';
import { YasnaObject } from '../typings/ObjectTracking';

const FIVE_MINUTES = 1000 * 60 * 5;

export const fetchObject = async (objectId: YasnaObject['id']) => {
  const url = `${endpoints.object}${objectId}`;
  const { data } = await axios.get<YasnaObject>(url);
  return data;
};

export function useObject(objectId: YasnaObject['id'] | null) {
  return useQuery(
    ['object', objectId],
    () => {
      if (objectId !== null) {
        return fetchObject(objectId);
      }
      return null;
    },
    {
      staleTime: FIVE_MINUTES,
    },
  );
}

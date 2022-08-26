import axios from 'axios';
import { useQuery } from 'react-query';
import endpoints from '../api/endpoints';
import { AnnotationsQueryResponse } from '../typings/Annotations';

const FIVE_MINUTES = 1000 * 60 * 5;

export const fetchAnnotations = async (seconds: number) => {
  const url = `${endpoints.annotations}?from_seconds=${seconds}`;
  const { data } = await axios.get<AnnotationsQueryResponse>(url);
  return data;
};

export function useAnnotations(seconds: number) {
  return useQuery(['annotations'], () => fetchAnnotations(seconds), { cacheTime: FIVE_MINUTES });
}

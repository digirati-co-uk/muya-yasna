import axios from 'axios';
import { useQuery } from 'react-query';
import endpoints from '../api/endpoints';
import { NavigableSection } from '../typings/NavigableSection';

const oneDay = 1000 * 60 * 60 * 24;

export const fetchNavigation = async () => {
  const { data } = await axios.get<NavigableSection[]>(endpoints.navigation);
  return data;
};

export function useNavigationData() {
  return useQuery('navigation', fetchNavigation, { staleTime: oneDay });
}

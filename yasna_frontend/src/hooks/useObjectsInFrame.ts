import axios from 'axios';
import { useQuery } from 'react-query';
import endpoints from '../api/endpoints';
import { Box, FrameRangeQueryResult, ObjectInFrame } from '../typings/ObjectTracking';

const fetchObjectsInFrame = async (time: number) => {
  const url = `${endpoints.objectsInFrame}?seconds=${time}`;
  const { data } = await axios.get<FrameRangeQueryResult>(url);
  return data.results.reduce((acc: Box[], curr: ObjectInFrame) => [...acc, ...curr.boxes], []);
};

export function useObjectsInFrame(timestamp: number) {
  return useQuery(['objectsInFrame', timestamp], () => fetchObjectsInFrame(timestamp));
}

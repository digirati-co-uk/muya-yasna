import { useAnnotation } from '../../hooks/useAnnotation';
import { AnnotationDisplay } from './AnnotationDisplay';
import { TimeMeter } from './TimeMeter';

export type AnnotationsProps = {};

export function Annotations() {
  const { currentAnnotation, isLoading } = useAnnotation();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (currentAnnotation) {
    const { annotations, start_seconds, end_seconds } = currentAnnotation;

    return (
      <>
        <TimeMeter start={start_seconds} end={end_seconds} />
        <AnnotationDisplay {...annotations} />
      </>
    );
  }

  return null;
}

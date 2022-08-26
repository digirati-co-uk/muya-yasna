export type ObjectImage = {
  image: string;
};

export type YasnaObject = {
  url: string;
  id: number;
  cross_references: YasnaObjectSummary[];
  label: string;
  name_in_avestan: string;
  name_in_middle_persian: string;
  name_in_gujarati: string;
  translation: string;
  definition: string;
  description_of_action: string;
  function: string;
  where_during_ritual: string;
  interpretation: string;
  references: string;
  comments: string;
  collaborator: string;
  object_images: ObjectImage[];
};

export type YasnaObjectSummary = Pick<YasnaObject, 'id' | 'label'>;

export type Box = {
  x_centre: number;
  y_centre: number;
  width: number;
  height: number;
  yasnaobject: YasnaObjectSummary;
};

type FrameRangeAnnotation = {
  url: string;
  id: number;
  type: 'Ritual_Part' | 'Chapter' | 'Stanza_Ref' | 'Stanza_SubDiv';
  label: string;
  html: string;
};

export type ObjectInFrame = {
  frames: string;
  temporal: string;
  url: string;
  boxes: Box[];
  annotations: FrameRangeAnnotation[];
};

type Pagination = {
  next: string | null;
  previous: string | null;
  totalResults: number;
  totalPages: number;
  page: number;
};

export type FrameRangeQueryResult = {
  pagination: Pagination;
  results: ObjectInFrame[];
  frame: number;
};

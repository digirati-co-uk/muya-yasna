export type Annotations = {
  Ritual_Part: string;
  Chapter: string;
  Chapter_Title: string;
  Stanza_Ref: string;
  Stanza_SubDiv: string;
  Stanza_OTxt?: string;
  Stanza_Lang?: string;
  Stanza_TrTxt?: string;
  RA_Description?: string;
  RA_MP?: string;
  RA_Guj?: string;
};

export type AnnotationSet = {
  start_seconds: number;
  end_seconds: number;
  annotations: Annotations;
};

export type AnnotationsQueryResponse = {
  next: string;
  next_seconds: number;
  start_seconds: number;
  annotation_sets: AnnotationSet[];
};

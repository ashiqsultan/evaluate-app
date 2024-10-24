export interface Question {
  id: string;
  questionText: string;
}

export interface RequestItem {
  name: string;
  url: string;
}

export interface ExtendedQuestion extends Question {
  requests: RequestItem;
}

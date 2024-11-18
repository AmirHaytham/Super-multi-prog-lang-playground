export type Language = {
  id: string;
  name: string;
  icon: string;
};

export type CodeSnippet = {
  id: string;
  title: string;
  code: string;
  language: string;
  created: Date;
};
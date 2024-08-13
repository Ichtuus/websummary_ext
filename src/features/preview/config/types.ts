export interface ILinkedinPreviewData {
  post: string;
}

export interface TPreviewLinkedinItemProps {
  post: string;
}

export type TPreviewContainerProps = {
  source: "linkedin" | "article";
  preview: ILinkedinPreviewData[] | string;
};

export type TPreviewArticleProps = {
  preview: string;
};

export type TPreviewLinkedinProps = {
  preview: ILinkedinPreviewData[];
};

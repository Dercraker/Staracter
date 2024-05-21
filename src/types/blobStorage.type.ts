export type ShortFileProp = {
  originalFileName: string;
  fileSize: number;
};

export type PresignedUrlProp = ShortFileProp & {
  url: string;
  fileNameInBucket: string;
};

export type FileProps = ShortFileProp & {
  id: string;
  isDeleting?: boolean;
};

export type FilesListProps = {
  files: FileProps[];
  fetchFiles: () => Promise<void>;
  setFiles: (
    files: FileProps[] | ((files: FileProps[]) => FileProps[])
  ) => void;
  downloadUsingPresignedUrl: boolean;
};

export type FileInDBProp = {
  fileNameInBucket: string;
  originalFileName: string;
  fileSize: number;
};

export type BlobInfo = {
  fileName: string;
  url: string;
  id?: string;
};

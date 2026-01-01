export interface FileTypeInfo {
  ext: string;
  label: string;
}

export const ALLOWED_FILE_TYPES: Record<string, FileTypeInfo> = {
  'application/pdf': { ext: '.pdf', label: 'PDF' },
  'application/msword': { ext: '.doc', label: 'Word Document' },
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': { ext: '.docx', label: 'Word Document' },
  'image/jpeg': { ext: '.jpg', label: 'JPEG Image' },
  'image/png': { ext: '.png', label: 'PNG Image' }
};

export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export const ACCEPTED_FILE_EXTENSIONS = '.pdf,.doc,.docx,.jpg,.jpeg,.png';

export const isValidFileType = (file: File): boolean => {
  return Object.keys(ALLOWED_FILE_TYPES).includes(file.type);
};

export const isValidFileSize = (file: File): boolean => {
  return file.size <= MAX_FILE_SIZE;
};

export const transformCoraBinaryResponse = async (
  response: Response,
  fallbackFileName: string,
) => {
  const headers = new Headers(response.headers);
  const coraFileName = parseFileNameFromContentDisposition(
    response.headers.get('content-disposition'),
  );
  const downloadFileName = buildDownloadFileName(
    coraFileName,
    fallbackFileName,
    response.headers.get('content-type'),
  );
  headers.set(
    'Content-Disposition',
    toContentDispositionValue(downloadFileName),
  );

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
};

const parseFileNameFromContentDisposition = (
  contentDisposition: string | null,
): string | undefined => {
  if (!contentDisposition) {
    return undefined;
  }

  const filenameStarMatch = contentDisposition.match(/filename\*=([^;]+)/i);
  if (filenameStarMatch?.[1]) {
    const rawValue = filenameStarMatch[1].trim();
    const encodedPart = rawValue.includes("''")
      ? rawValue.split("''").slice(1).join("''")
      : rawValue;

    try {
      return decodeURIComponent(encodedPart.replace(/^"|"$/g, ''));
    } catch {
      return encodedPart.replace(/^"|"$/g, '');
    }
  }

  const filenameMatch = contentDisposition.match(/filename=([^;]+)/i);
  if (filenameMatch?.[1]) {
    return filenameMatch[1].trim().replace(/^"|"$/g, '');
  }

  return undefined;
};

const buildDownloadFileName = (
  preferredName: string | undefined,
  fallbackName: string,
  contentType: string | null,
): string => {
  const baseName = preferredName?.trim() || fallbackName.trim() || 'download';
  if (hasFileExtension(baseName)) {
    return baseName;
  }

  const extension = extensionFromContentType(contentType);
  return extension ? `${baseName}.${extension}` : baseName;
};

const toAsciiFileName = (fileName: string): string => {
  const asciiOnly = fileName.replace(/[^\x20-\x7E]/g, '_');
  return asciiOnly.replace(/["\\]/g, '_');
};

const toContentDispositionValue = (fileName: string): string => {
  const asciiFileName = toAsciiFileName(fileName);
  const utf8Encoded = encodeURIComponent(fileName);
  return `attachment; filename="${asciiFileName}"; filename*=UTF-8''${utf8Encoded}`;
};

const MIME_TYPE_EXTENSIONS: Record<string, string> = {
  'application/pdf': 'pdf',
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/gif': 'gif',
  'image/tiff': 'tif',
  'text/plain': 'txt',
  'text/html': 'html',
  'application/zip': 'zip',
  'application/msword': 'doc',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
    'docx',
  'application/vnd.ms-excel': 'xls',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'xlsx',
};

const hasFileExtension = (fileName: string): boolean => {
  return /\.[^./\\]+$/.test(fileName);
};

const extensionFromContentType = (
  contentType: string | null,
): string | undefined => {
  if (!contentType) {
    return undefined;
  }

  const mimeType = contentType.split(';')[0].trim().toLowerCase();
  const mappedExtension = MIME_TYPE_EXTENSIONS[mimeType];
  if (mappedExtension) {
    return mappedExtension;
  }

  return mimeType.split('/')[1]?.trim();
};

/**
 * Convert Google Drive share links to direct image URLs
 * Supports multiple Google Drive link formats
 */
export const convertGoogleDriveUrl = (url: string): string => {
  if (!url) return '';

  // Already a direct image URL
  if (url.includes('drive.google.com/uc?export=view')) {
    return url;
  }

  // Extract file ID from various Google Drive link formats
  let fileId = '';

  // Format: https://drive.google.com/file/d/FILE_ID/view?usp=sharing
  // Format: https://drive.google.com/file/d/FILE_ID/view?usp=drive_link
  const fileMatch = url.match(/\/file\/d\/([a-zA-Z0-9-_]+)\//);
  if (fileMatch) {
    fileId = fileMatch[1];
  } else {
    // Format: https://drive.google.com/open?id=FILE_ID
    const openMatch = url.match(/[?&]id=([a-zA-Z0-9-_]+)/);
    if (openMatch) {
      fileId = openMatch[1];
    }
  }

  if (!fileId) {
    console.warn('Could not extract Google Drive file ID from URL:', url);
    return url; // Return original URL if we can't parse it
  }

  // Return direct access URL that works in img tags
  return `https://drive.google.com/uc?export=view&id=${fileId}`;
};

/**
 * Validate if a URL is a valid Google Drive link
 */
export const isGoogleDriveUrl = (url: string): boolean => {
  return url.includes('drive.google.com');
};

/**
 * Convert Google Drive share links to direct image URLs
 * Uses lh3.googleusercontent.com which works reliably for embedding
 */
export const convertGoogleDriveUrl = (url: string): string => {
  if (!url || typeof url !== 'string') return '';

  url = url.trim();

  // Not a Google Drive URL — return as-is
  if (!url.includes('drive.google.com') && !url.includes('googleusercontent.com')) {
    return url;
  }

  // Already converted to lh3 format
  if (url.includes('lh3.googleusercontent.com/d/')) {
    return url;
  }

  // Extract file ID from various Google Drive link formats
  let fileId = '';

  // Format: https://drive.google.com/file/d/FILE_ID/view?usp=sharing
  // Format: https://drive.google.com/file/d/FILE_ID/view?usp=drive_link
  // Format: https://drive.google.com/file/d/FILE_ID/view
  const fileMatch = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (fileMatch) {
    fileId = fileMatch[1];
  }

  // Format: https://drive.google.com/open?id=FILE_ID
  if (!fileId) {
    const openMatch = url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
    if (openMatch) {
      fileId = openMatch[1];
    }
  }

  // Format: https://drive.google.com/uc?id=FILE_ID&export=view
  if (!fileId) {
    const ucMatch = url.match(/uc\?.*id=([a-zA-Z0-9_-]+)/);
    if (ucMatch) {
      fileId = ucMatch[1];
    }
  }

  if (!fileId) {
    console.warn('⚠️ Could not extract Google Drive file ID from URL:', url);
    return url;
  }

  // Use lh3.googleusercontent.com — works reliably without redirects or CORS issues
  return `https://lh3.googleusercontent.com/d/${fileId}`;
};

/**
 * Validate if a URL is a valid Google Drive link
 */
export const isGoogleDriveUrl = (url: string): boolean => {
  return !!url && typeof url === 'string' && url.includes('drive.google.com');
};

export default convertGoogleDriveUrl;

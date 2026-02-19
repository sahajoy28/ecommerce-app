/**
 * Converts a Google Drive sharing URL to a direct image URL
 * Uses lh3.googleusercontent.com which works reliably for embedding
 */
export const convertGoogleDriveUrl = (url) => {
  if (!url) return url;

  // Already a direct image URL, return as-is
  if (url.startsWith('http') && !url.includes('drive.google.com') && !url.includes('googleusercontent.com/d/')) {
    return url;
  }

  // Already converted to lh3 format
  if (url.includes('lh3.googleusercontent.com/d/')) {
    return url;
  }

  let fileId = '';

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

  // Format: https://drive.google.com/uc?id=FILE_ID
  if (!fileId) {
    const ucMatch = url.match(/\/uc\?.*id=([a-zA-Z0-9_-]+)/);
    if (ucMatch) {
      fileId = ucMatch[1];
    }
  }

  if (fileId) {
    return `https://lh3.googleusercontent.com/d/${fileId}`;
  }

  return url;
};
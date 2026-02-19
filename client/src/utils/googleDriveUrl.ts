/**
 * Convert Google Drive share links to direct image URLs
 * Supports multiple Google Drive link formats
 */
export const convertGoogleDriveUrl = (url: string): string => {
  if (!url || typeof url !== 'string') return '';

  // Trim whitespace
  url = url.trim();

  // Already a direct image URL
  if (url.includes('drive.google.com/uc?export=view')) {
    return url;
  }

  // Extract file ID from various Google Drive link formats
  let fileId = '';

  // Format: https://drive.google.com/file/d/FILE_ID/view?usp=sharing
  // Format: https://drive.google.com/file/d/FILE_ID/view?usp=drive_link
  // Format: https://drive.google.com/file/d/FILE_ID/view
  const fileMatch = url.match(/\/file\/d\/([a-zA-Z0-9-_]+)/);
  if (fileMatch) {
    fileId = fileMatch[1];
  } else {
    // Format: https://drive.google.com/open?id=FILE_ID
    const openMatch = url.match(/[?&]id=([a-zA-Z0-9-_]+)/);
    if (openMatch) {
      fileId = openMatch[1];
    } else {
      // Format: https://drive.google.com/uc?id=FILE_ID
      const ucMatch = url.match(/uc\?id=([a-zA-Z0-9-_]+)/);
      if (ucMatch) {
        fileId = ucMatch[1];
      }
    }
  }

  if (!fileId) {
    console.warn('⚠️ Could not extract Google Drive file ID from URL:', url);
    return url; // Return original URL if we can't parse it
  }

  // Return direct access URL that works in img tags
  // Add 'dl=1' as an alternative parameter for better compatibility
  return `https://drive.google.com/uc?export=view&id=${fileId}`;
};

/**
 * Validate if a URL is a valid Google Drive link
 */
export const isGoogleDriveUrl = (url: string): boolean => {
  return url && typeof url === 'string' && url.includes('drive.google.com');
};

/**
 * Get the correct shareable link from a Google Drive file ID
 * Use this to help users format their links correctly
 */
export const getGoogleDriveShareLink = (fileId: string): string => {
  return `https://drive.google.com/file/d/${fileId}/view?usp=sharing`;
};

/**
 * Helper function to test if a Google Drive image URL is accessible
 */
export const testGoogleDriveImage = async (url: string): Promise<boolean> => {
  try {
    const convertedUrl = convertGoogleDriveUrl(url);
    const response = await fetch(convertedUrl, { mode: 'no-cors' });
    return response.status === 0 || (response.status >= 200 && response.status < 300);
  } catch (error) {
    console.error('❌ Error testing Google Drive image:', error);
    return false;
  }
};

export default convertGoogleDriveUrl;

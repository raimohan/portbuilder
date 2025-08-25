export const uploadImage = async (file: File): Promise<{ url: string; publicId?: string }> => {
  const env = (import.meta as any).env || {};
  const preset = env.VITE_CLOUDINARY_UPLOAD_PRESET || 'portbuilder';
  const cloudName = env.VITE_CLOUDINARY_CLOUD_NAME as string;

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', preset);

  if (!cloudName) throw new Error('Missing VITE_CLOUDINARY_CLOUD_NAME');

  const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Cloudinary upload failed');
  }

  const data = await response.json();
  return { url: data.secure_url as string, publicId: data.public_id as string };
};

export const extractPublicId = (url: string): string | undefined => {
  try {
    const parts = new URL(url).pathname.split('/');
    const file = parts[parts.length - 1];
    return file?.split('.')[0];
  } catch {
    return undefined;
  }
};

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { uploadImage, extractPublicId } from '@/lib/cloudinary';
import { Image, Upload, Trash2, RefreshCw } from 'lucide-react';

interface MediaItem {
  id: string;
  url: string;
  publicId?: string;
  name?: string;
}

export default function MediaLibrary() {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploading(true);
    try {
      const { url, publicId } = await uploadImage(file);
      setItems((prev) => [
        { id: Date.now().toString(), url, publicId, name: file.name },
        ...prev,
      ]);
    } finally {
      setIsUploading(false);
      e.currentTarget.value = '';
    }
  };

  const onReplace = async (id: string) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) return;
      setIsUploading(true);
      try {
        const { url, publicId } = await uploadImage(file);
        setItems((prev) => prev.map((it) => (it.id === id ? { ...it, url, publicId, name: file.name } : it)));
      } finally {
        setIsUploading(false);
      }
    };
    input.click();
  };

  const onDelete = (id: string) => {
    setItems((prev) => prev.filter((it) => it.id !== id));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Card>
        <CardHeader className="flex items-center justify-between">
          <div>
            <CardTitle>Media Library</CardTitle>
            <CardDescription>Upload and manage your images</CardDescription>
          </div>
          <div className="flex items-center gap-3">
            <Input type="file" accept="image/*" onChange={onFileChange} disabled={isUploading} />
            <Button disabled={isUploading}>
              <Upload className="w-4 h-4 mr-2" />
              {isUploading ? 'Uploading...' : 'Upload'}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {items.length === 0 ? (
            <div className="text-center py-16 text-gray-500">
              <Image className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p>No media yet. Upload your first image.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {items.map((item) => (
                <div key={item.id} className="border rounded-lg overflow-hidden bg-white">
                  <div className="aspect-video bg-gray-100">
                    <img src={item.url} alt={item.name || item.publicId || 'media'} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-3 flex items-center justify-between">
                    <div className="text-xs text-gray-600 truncate max-w-[70%]">{item.name || item.publicId || extractPublicId(item.url)}</div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" onClick={() => onReplace(item.id)}>
                        <RefreshCw className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => onDelete(item.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Eye, Edit, Trash2, Copy } from 'lucide-react';

interface PublishedItem {
  id: string;
  title: string;
  slug: string;
  createdAt: string;
}

export default function PublishedPortfolios() {
  const [items, setItems] = useState<PublishedItem[]>([
    { id: '1', title: 'Developer Portfolio', slug: 'dev-portfolio', createdAt: '2024-01-12' },
  ]);

  const copyLink = (slug: string) => {
    const url = `${window.location.origin}/${slug}`;
    navigator.clipboard.writeText(url);
    alert('Link copied!');
  };

  const onDelete = (id: string) => setItems((prev) => prev.filter((i) => i.id !== id));

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Card>
        <CardHeader>
          <CardTitle>Published Portfolios</CardTitle>
          <CardDescription>Manage your live portfolios</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {items.map((item) => (
              <div key={item.id} className="flex items-center justify-between border rounded-lg p-3 bg-white">
                <div>
                  <div className="font-medium">{item.title}</div>
                  <div className="text-xs text-gray-500">/{item.slug} • Published {item.createdAt}</div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => window.open(`/${item.slug}`, '_blank')}>
                    <Eye className="w-4 h-4 mr-1" /> View
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => (window.location.href = `/builder/${item.id}`)}>
                    <Edit className="w-4 h-4 mr-1" /> Edit
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => copyLink(item.slug)}>
                    <Copy className="w-4 h-4 mr-1" /> Copy Link
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => onDelete(item.id)}>
                    <Trash2 className="w-4 h-4 mr-1" /> Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

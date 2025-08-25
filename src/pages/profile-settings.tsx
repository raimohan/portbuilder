import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

export default function ProfileSettings() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    linkedin: '',
    github: '',
    instagram: '',
  });

  const update = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, [k]: e.target.value });

  const onSave = () => alert('Profile saved (mock). Connect to Firebase later.');

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Card>
        <CardHeader>
          <CardTitle>Profile Settings</CardTitle>
          <CardDescription>Manage your profile information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Name</Label>
              <Input value={form.name} onChange={update('name')} placeholder="Your name" />
            </div>
            <div>
              <Label>Email</Label>
              <Input type="email" value={form.email} onChange={update('email')} placeholder="you@example.com" />
            </div>
            <div className="md:col-span-2">
              <Label>New Password</Label>
              <Input type="password" value={form.password} onChange={update('password')} placeholder="••••••••" />
            </div>
          </div>

          <Separator />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label>LinkedIn</Label>
              <Input value={form.linkedin} onChange={update('linkedin')} placeholder="linkedin.com/in/username" />
            </div>
            <div>
              <Label>GitHub</Label>
              <Input value={form.github} onChange={update('github')} placeholder="github.com/username" />
            </div>
            <div>
              <Label>Instagram</Label>
              <Input value={form.instagram} onChange={update('instagram')} placeholder="instagram.com/username" />
            </div>
          </div>

          <div className="flex justify-end">
            <Button onClick={onSave}>Save Changes</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

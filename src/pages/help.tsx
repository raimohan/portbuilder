import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export default function HelpPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>FAQs</CardTitle>
          <CardDescription>Common questions</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 text-gray-700">
          <div>
            <div className="font-medium">How do I publish a portfolio?</div>
            <div>Go to the editor and click Publish.</div>
          </div>
          <div>
            <div className="font-medium">Can I use a custom domain?</div>
            <div>Yes, on the Premium plan you can connect your domain.</div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Community</CardTitle>
          <CardDescription>Join our Discord</CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={() => window.open('https://discord.com', '_blank')}>Open Discord</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Contact Support</CardTitle>
          <CardDescription>Report a technical issue</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <Input placeholder="Subject" />
          <Textarea placeholder="Describe your issue" rows={5} />
          <Button onClick={() => alert('Submitted (mock)')}>Submit</Button>
        </CardContent>
      </Card>
    </div>
  );
}

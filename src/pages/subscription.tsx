import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function SubscriptionPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Current Plan</CardTitle>
          <CardDescription>You are on the Free plan</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-between">
          <div>
            <div className="text-2xl font-bold">Free</div>
            <div className="text-gray-600">Basic features to build your first portfolio</div>
          </div>
          <Button onClick={() => alert('Upgrade flow (mock)')}>Upgrade</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Compare Plans</CardTitle>
          <CardDescription>Choose what fits your needs</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border rounded-lg p-6">
              <div className="text-xl font-semibold mb-2">Free</div>
              <ul className="list-disc ml-5 text-gray-700 space-y-1">
                <li>1 published portfolio</li>
                <li>Basic templates</li>
                <li>Community support</li>
              </ul>
            </div>
            <div className="border rounded-lg p-6">
              <div className="text-xl font-semibold mb-2">Premium</div>
              <ul className="list-disc ml-5 text-gray-700 space-y-1">
                <li>Unlimited portfolios</li>
                <li>Premium templates</li>
                <li>Advanced analytics</li>
                <li>Priority support</li>
              </ul>
              <Button className="mt-4 w-full" onClick={() => alert('Proceed to payment (mock)')}>Upgrade to Premium</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

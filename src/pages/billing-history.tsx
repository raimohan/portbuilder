import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function BillingHistory() {
  const items = [
    { id: 'inv_1', date: '2024-01-02', amount: '₹499', plan: 'Premium' },
    { id: 'inv_2', date: '2023-12-02', amount: '₹499', plan: 'Premium' },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Card>
        <CardHeader>
          <CardTitle>Billing History</CardTitle>
          <CardDescription>Your past transactions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {items.map((it) => (
              <div key={it.id} className="flex items-center justify-between border rounded-lg p-3 bg-white">
                <div>
                  <div className="font-medium">{it.plan}</div>
                  <div className="text-xs text-gray-500">{it.date}</div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-sm font-medium">{it.amount}</div>
                  <Button variant="outline" size="sm" onClick={() => alert('Downloading invoice...')}>Invoice</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

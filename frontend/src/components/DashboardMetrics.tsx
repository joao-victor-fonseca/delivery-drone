import { Card, CardContent } from "./ui/card";

export function DashboardMetrics({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <Card className="w-full max-w-sm shadow-lg hover:shadow-xl transition">
      <CardContent className="p-6">
        <p className="text-muted-foreground text-sm">{title}</p>
        <h3 className="text-3xl font-bold text-primary mt-2">{value}</h3>
      </CardContent>
    </Card>
  );
}

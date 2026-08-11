import { Button } from "./components/atoms/button";
import { Card, CardContent, CardHeader, CardTitle } from "./components/patterns/card";

export function App() {
  return (
    <div className="min-h-screen bg-background p-8 text-foreground">
      <Card className="max-w-md">
        <CardHeader>
          <CardTitle>Tabaccheria 4.0 — Design System</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap items-center gap-3">
          <Button>Primario</Button>
          <Button variant="secondary">Secondario</Button>
          <Button variant="outline">Outline</Button>
        </CardContent>
      </Card>
    </div>
  );
}

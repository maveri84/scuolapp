
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LabelList, LineChart, Line, Legend, CartesianGrid } from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const subjectMockData = [
  { name: "Italiano", value: 7.5 },
  { name: "Matematica", value: 8.2 },
  { name: "Storia", value: 6.8 },
  { name: "Scienze", value: 7.9 },
  { name: "Inglese", value: 8.5 },
];

const competencesMockData = [
  { name: "Comunicazione", value: 8.1 },
  { name: "Matematica", value: 7.8 },
  { name: "Digitale", value: 8.7 },
  { name: "Imparare ad imparare", value: 7.2 },
  { name: "Sociali e civiche", value: 8.4 },
];

const trendMockData = [
  { month: "Set", italiano: 7.2, matematica: 7.5, scienze: 7.0 },
  { month: "Ott", italiano: 7.4, matematica: 7.8, scienze: 7.2 },
  { month: "Nov", italiano: 7.1, matematica: 8.0, scienze: 7.5 },
  { month: "Dic", italiano: 7.3, matematica: 8.2, scienze: 7.8 },
  { month: "Gen", italiano: 7.5, matematica: 8.1, scienze: 7.9 },
  { month: "Feb", italiano: 7.6, matematica: 8.2, scienze: 8.1 },
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background border border-border p-2 rounded-md shadow-md">
        <p className="font-medium">{`${payload[0].payload.name}: ${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};

const TrendTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background border border-border p-2 rounded-md shadow-md">
        <p className="font-medium mb-1">{label}</p>
        {payload.map((item: any, index: number) => (
          <p key={index} className="text-sm" style={{ color: item.color }}>
            {`${item.name}: ${item.value}`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const GradesCard: React.FC = () => {
  const [viewType, setViewType] = useState<string>("subjects");
  const [selectedPeriod, setSelectedPeriod] = useState<string>("current");

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <div>
            <CardTitle className="text-xl">Media Voti</CardTitle>
            <CardDescription>
              Andamento delle valutazioni secondo MIM 2025
            </CardDescription>
          </div>
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Seleziona periodo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="current">Quadrimestre Corrente</SelectItem>
              <SelectItem value="previous">Quadrimestre Precedente</SelectItem>
              <SelectItem value="year">Anno Scolastico</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="chart" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="chart">Per Materia</TabsTrigger>
            <TabsTrigger value="competences">Per Competenza</TabsTrigger>
            <TabsTrigger value="trend">Andamento</TabsTrigger>
          </TabsList>
          
          <TabsContent value="chart" className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={subjectMockData}
                margin={{ top: 20, right: 30, left: 0, bottom: 10 }}
                barSize={30}
              >
                <XAxis 
                  dataKey="name" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12 }}
                />
                <YAxis 
                  domain={[0, 10]} 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12 }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar 
                  dataKey="value" 
                  fill="hsl(var(--primary))" 
                  radius={[4, 4, 0, 0]}
                  className="hover:opacity-80 transition-opacity"
                >
                  <LabelList dataKey="value" position="top" fontSize={12} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>
          
          <TabsContent value="competences" className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={competencesMockData}
                margin={{ top: 20, right: 30, left: 0, bottom: 10 }}
                barSize={30}
              >
                <XAxis 
                  dataKey="name" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12 }}
                />
                <YAxis 
                  domain={[0, 10]} 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12 }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar 
                  dataKey="value" 
                  fill="hsl(var(--primary))" 
                  radius={[4, 4, 0, 0]}
                  className="hover:opacity-80 transition-opacity"
                >
                  <LabelList dataKey="value" position="top" fontSize={12} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            <div className="text-xs text-muted-foreground text-center mt-2">
              Competenze chiave secondo le direttive MIM 2025
            </div>
          </TabsContent>
          
          <TabsContent value="trend" className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={trendMockData}
                margin={{ top: 20, right: 30, left: 0, bottom: 10 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="hsla(var(--muted-foreground)/0.3)" />
                <XAxis 
                  dataKey="month" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12 }}
                />
                <YAxis 
                  domain={[6, 9]} 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12 }}
                />
                <Tooltip content={<TrendTooltip />} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="italiano"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  dot={true}
                  activeDot={{ r: 6 }}
                />
                <Line
                  type="monotone"
                  dataKey="matematica"
                  stroke="hsl(var(--destructive))"
                  strokeWidth={2}
                  dot={true}
                  activeDot={{ r: 6 }}
                />
                <Line
                  type="monotone"
                  dataKey="scienze"
                  stroke="hsl(var(--secondary))"
                  strokeWidth={2}
                  dot={true}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default GradesCard;

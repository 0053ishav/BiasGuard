"use client";

import { useEffect, useState } from "react";
import {
  AlertTriangle,
  Brain,
  TrendingUp,
  Users,
  BarChart3,
  Globe2,
  LayoutDashboard,
  Signal,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { toast } = useToast();

  const router = useRouter();

  const handleBiasDetection = async () => {
    setIsAnalyzing(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // MOCK: Replace with actual backend bias detection API
      const mockResponse = {
        herdingBias: Math.random() > 0.5,
        sentiment: ["Positive", "Negative", "Neutral"][
          Math.floor(Math.random() * 3)
        ],
        alerts: [
          "High volume trading detected in RELIANCE",
          "Unusual sentiment shift in banking sector",
          "Overconfidence pattern in tech stocks",
        ],
      };

      toast({
        title: "Analysis Complete",
        description: `Herding bias: ${
          mockResponse.herdingBias ? "Detected" : "Not detected"
        }`,
      });
    } catch (error) {
      toast({
        title: "Analysis Failed",
        description: "Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const [data, setData] = useState<{
    nifty?: {
      price: number;
      change: number;
      percentChange: number;
    };
    sensex?: {
      price: number;
      change: number;
      percentChange: number;
    };
    global?: {
      [key: string]: {
        price: number;
        change: number;
        percentChange: number;
      };
    };
  }>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/market-quote"); // GET request, no body
        const jsonData = await res.json();
        setData({
          nifty: jsonData.indianMarkets?.nifty,
          sensex: jsonData.indianMarkets?.sensex,
          global: {
            ...jsonData.usMarkets,
          },
        });
        console.log("set data: ", data);
        
      } catch (err) {
        console.error("Error fetching market data:", err);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 60000); // refresh every 60 sec
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            Stock Market Dashboard
          </h2>
          <p className="text-muted-foreground">
            Live Market Data + Behavioral Insights
          </p>
        </div>
        <Button onClick={handleBiasDetection} disabled={isAnalyzing}>
          {isAnalyzing ? "Analyzing..." : "Run Bias Detection"}
        </Button>
      </div>

      {/* BEHAVIORAL INSIGHTS */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex justify-between pb-2">
            <CardTitle className="text-sm font-medium">Herding Bias</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">Detected</div>
            <p className="text-xs text-muted-foreground">
              +20% from last session
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Sentiment Score
            </CardTitle>
            <Brain className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">Positive</div>
            <p className="text-xs text-muted-foreground">Score: 0.75/1.0</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex justify-between pb-2">
            <CardTitle className="text-sm font-medium">Risk Level</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">Medium</div>
            <p className="text-xs text-muted-foreground">
              Based on recent patterns
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">
              Psychological alerts today
            </p>
          </CardContent>
        </Card>
      </div>

      {/* MARKET OVERVIEW */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LayoutDashboard className="h-4 w-4" /> Nifty 50
            </CardTitle>
          </CardHeader>
          <CardContent>
            {data.nifty ? (
              <div className="text-xl font-bold">
                {data.nifty.price.toLocaleString()}{" "}
                <span
                  className={
                    data.nifty.change >= 0 ? "text-green-600" : "text-red-600"
                  }
                >
                  {data.nifty.change >= 0 ? "▲" : "▼"}{" "}
                  {data.nifty.change.toFixed(2)} (
                  {data.nifty.percentChange.toFixed(2)}%)
                </span>
              </div>
            ) : (
              <div>Loading...</div>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LayoutDashboard className="h-4 w-4" /> Sensex
            </CardTitle>
          </CardHeader>
          <CardContent>
            {data.sensex ? (
              <div className="text-xl font-bold">
                {data.sensex.price.toLocaleString()}{" "}
                <span
                  className={
                    data.sensex.change >= 0 ? "text-green-600" : "text-red-600"
                  }
                >
                  {data.sensex.change >= 0 ? "▲" : "▼"}{" "}
                  {data.sensex.change.toFixed(2)} (
                  {data.sensex.percentChange.toFixed(2)}%)
                </span>
              </div>
            ) : (
              <div>Loading...</div>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe2 className="h-4 w-4" /> Global Indices
            </CardTitle>
          </CardHeader>
          <CardContent>
            {data.global ? (
              <>
                <div className="space-y-1">
                  {Object.entries(data.global)
                    .slice(0, 2)
                    .map(([key, value]) => (
                      <div key={key} className="flex justify-between">
                        <span className="capitalize">{key}</span>
                        <span
                          className={`font-bold ${
                            value.percentChange >= 0
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {value.change >= 0 ? "▲" : "▼"}{" "}
                          {value.price.toFixed(2)} (
                          {value.percentChange.toFixed(2)}%)
                        </span>
                      </div>
                    ))}
                </div>
                <div className="mt-4">
                  <Button onClick={() => router.push("/global-indices")}>
                    View More
                  </Button>
                </div>
              </>
            ) : (
              <p>Loading...</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* SECTORAL SNAPSHOT */}
      <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Signal className="h-4 w-4" /> Sectoral Performance
            </CardTitle>
            <CardDescription>Mock sector data</CardDescription>
          </CardHeader>
          <CardContent className="text-sm">
            <ul className="space-y-1">
              <li>
                Banking: <span className="text-green-600">+1.2%</span>
              </li>
              <li>
                IT: <span className="text-red-600">-0.8%</span>
              </li>
              <li>
                Pharma: <span className="text-green-600">+0.5%</span>
              </li>
              <li>
                Auto: <span className="text-green-600">+0.9%</span>
              </li>
              {/* TODO: Replace with real sectoral performance API */}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" /> Behavioral Alerts
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="font-medium">High volume trading in RELIANCE</p>
              <p className="text-xs text-muted-foreground">2 hours ago</p>
            </div>
            <div>
              <p className="font-medium">Sentiment shift in banking sector</p>
              <p className="text-xs text-muted-foreground">4 hours ago</p>
            </div>
            <div>
              <p className="font-medium">Overconfidence pattern in tech</p>
              <p className="text-xs text-muted-foreground">6 hours ago</p>
            </div>
            {/* TODO: Make dynamic from alerts API */}
          </CardContent>
        </Card>
      </div>
      
    </div>
  );
}

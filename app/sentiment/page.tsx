"use client"

import { useState } from "react"
import { Brain, TrendingDown, TrendingUp } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Badge } from "@/components/ui/badge"

export default function SentimentAnalysis() {
  const [inputText, setInputText] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [result, setResult] = useState<{
    sentiment: string
    score: number
    emoji: string
    description: string
  } | null>(null)
  const { toast } = useToast()

  const analyzeSentiment = async () => {
    if (!inputText.trim()) {
      toast({
        title: "Input Required",
        description: "Please enter some text to analyze",
        variant: "destructive",
      })
      return
    }

    setIsAnalyzing(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Mock sentiment analysis
      const sentiments = [
        { sentiment: "Positive", score: 0.85, emoji: "😊", description: "Strong positive sentiment detected" },
        { sentiment: "Negative", score: -0.72, emoji: "😟", description: "Negative sentiment with bearish indicators" },
        { sentiment: "Neutral", score: 0.05, emoji: "😐", description: "Neutral sentiment, no clear direction" },
      ]

      const randomResult = sentiments[Math.floor(Math.random() * sentiments.length)]
      setResult(randomResult)

      toast({
        title: "Analysis Complete",
        description: `Sentiment: ${randomResult.sentiment}`,
      })
    } catch (error) {
      toast({
        title: "Analysis Failed",
        description: "Please try again later",
        variant: "destructive",
      })
    } finally {
      setIsAnalyzing(false)
    }
  }

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case "Positive":
        return "text-green-600"
      case "Negative":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Sentiment Analysis</h2>
        <p className="text-muted-foreground">Analyze sentiment from news headlines, tweets, and market commentary</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5" />
              Text Analysis
            </CardTitle>
            <CardDescription>Enter news headlines, tweets, or market commentary for sentiment analysis</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder="Enter text to analyze... e.g., 'NIFTY hits new all-time high as investors show strong confidence in banking sector'"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="min-h-[120px]"
            />
            <Button onClick={analyzeSentiment} disabled={isAnalyzing} className="w-full">
              {isAnalyzing ? "Analyzing..." : "Analyze Sentiment"}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Analysis Result</CardTitle>
            <CardDescription>Sentiment score and interpretation</CardDescription>
          </CardHeader>
          <CardContent>
            {result ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{result.emoji}</span>
                    <span className={`text-xl font-bold ${getSentimentColor(result.sentiment)}`}>
                      {result.sentiment}
                    </span>
                  </div>
                  <Badge variant="outline">Score: {result.score.toFixed(2)}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">{result.description}</p>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full ${
                      result.score > 0 ? "bg-green-500" : result.score < 0 ? "bg-red-500" : "bg-gray-500"
                    }`}
                    style={{
                      width: `${Math.abs(result.score) * 100}%`,
                      marginLeft: result.score < 0 ? `${(1 - Math.abs(result.score)) * 100}%` : "0",
                    }}
                  ></div>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-32 text-muted-foreground">
                Enter text and click analyze to see results
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Sentiment Over Time</CardTitle>
          <CardDescription>Historical sentiment trends for market analysis</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] flex items-center justify-center bg-muted/50 rounded-lg">
            <p className="text-muted-foreground">Chart placeholder - Sentiment trends over time</p>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Average</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">+0.65</div>
            <p className="text-xs text-muted-foreground">Positive sentiment trend</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Analyses Today</CardTitle>
            <Brain className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">127</div>
            <p className="text-xs text-muted-foreground">+23 from yesterday</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Volatility Index</CardTitle>
            <TrendingDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">Medium</div>
            <p className="text-xs text-muted-foreground">Based on sentiment variance</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

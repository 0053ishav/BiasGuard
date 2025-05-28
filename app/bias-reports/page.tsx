"use client"

import { useState } from "react"
import { CalendarIcon, Filter } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

const mockReports = [
  {
    id: 1,
    date: "2024-01-15",
    biasType: "Herding",
    riskLevel: "High",
    description: "Following crowd behavior in NIFTY 50 stocks",
    confidence: 0.89,
  },
  {
    id: 2,
    date: "2024-01-14",
    biasType: "Overconfidence",
    riskLevel: "Medium",
    description: "Excessive trading in small-cap stocks",
    confidence: 0.72,
  },
  {
    id: 3,
    date: "2024-01-13",
    biasType: "Loss Aversion",
    riskLevel: "Low",
    description: "Holding losing positions too long",
    confidence: 0.65,
  },
  {
    id: 4,
    date: "2024-01-12",
    biasType: "Anchoring",
    riskLevel: "Medium",
    description: "Price anchoring on previous highs",
    confidence: 0.78,
  },
  {
    id: 5,
    date: "2024-01-11",
    biasType: "Confirmation",
    riskLevel: "High",
    description: "Seeking confirming information only",
    confidence: 0.85,
  },
]

export default function BiasReports() {
  const [filter, setFilter] = useState("All")

  const getRiskBadgeVariant = (risk: string) => {
    switch (risk) {
      case "High":
        return "destructive"
      case "Medium":
        return "default"
      case "Low":
        return "secondary"
      default:
        return "default"
    }
  }

  const filteredReports = filter === "All" ? mockReports : mockReports.filter((report) => report.riskLevel === filter)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Bias Reports</h2>
          <p className="text-muted-foreground">Historical analysis of detected behavioral biases</p>
        </div>
        <div className="flex items-center space-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                Filter: {filter}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setFilter("All")}>All Risk Levels</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilter("High")}>High Risk</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilter("Medium")}>Medium Risk</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilter("Low")}>Low Risk</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="outline">
            <CalendarIcon className="mr-2 h-4 w-4" />
            Date Range
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Bias Detection History</CardTitle>
          <CardDescription>Comprehensive log of all detected behavioral biases</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Bias Type</TableHead>
                <TableHead>Risk Level</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Confidence</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReports.map((report) => (
                <TableRow key={report.id}>
                  <TableCell className="font-medium">{new Date(report.date).toLocaleDateString()}</TableCell>
                  <TableCell>{report.biasType}</TableCell>
                  <TableCell>
                    <Badge variant={getRiskBadgeVariant(report.riskLevel)}>{report.riskLevel}</Badge>
                  </TableCell>
                  <TableCell className="max-w-xs truncate">{report.description}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${report.confidence * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-muted-foreground">{Math.round(report.confidence * 100)}%</span>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

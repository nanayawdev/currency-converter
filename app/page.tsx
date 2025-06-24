"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, RefreshCw } from "lucide-react"

interface Currency {
  code: string
  name: string
  symbol: string
  flag: string
}

interface ExchangeRates {
  [key: string]: number
}

const currencies: Currency[] = [
  { code: "USD", name: "United States Dollar", symbol: "$", flag: "🇺🇸" },
  { code: "EUR", name: "Euro", symbol: "€", flag: "🇪🇺" },
  { code: "GBP", name: "British Pound", symbol: "£", flag: "🇬🇧" },
  { code: "NGN", name: "Nigerian Naira", symbol: "₦", flag: "🇳🇬" },
  { code: "GHS", name: "Ghanaian Cedi", symbol: "₵", flag: "🇬🇭" },
  { code: "CAD", name: "Canadian Dollar", symbol: "C$", flag: "🇨🇦" },
  { code: "JPY", name: "Japanese Yen", symbol: "¥", flag: "🇯🇵" },
  { code: "AUD", name: "Australian Dollar", symbol: "A$", flag: "🇦🇺" },
]

export default function CurrencyConverter() {
  const [amount, setAmount] = useState<string>("")
  const [fromCurrency, setFromCurrency] = useState<string>("USD")
  const [toCurrency, setToCurrency] = useState<string>("EUR")
  const [exchangeRates, setExchangeRates] = useState<ExchangeRates>({})
  const [convertedAmount, setConvertedAmount] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>("")
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

  // Mock exchange rates - in a real app, you'd fetch from an API
  const mockExchangeRates: ExchangeRates = {
    USD: 1,
    EUR: 0.92,
    GBP: 0.79,
    NGN: 1630.5,
    GHS: 12.05,
    CAD: 1.36,
    JPY: 149.5,
    AUD: 1.52,
  }

  const fetchExchangeRates = async () => {
    setLoading(true)
    setError("")

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // In a real application, you would fetch from a real API like:
      // const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD')
      // const data = await response.json()
      // setExchangeRates(data.rates)

      setExchangeRates(mockExchangeRates)
      setLastUpdated(new Date())
    } catch (err) {
      setError("Failed to fetch exchange rates. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchExchangeRates()
  }, [])

  useEffect(() => {
    if (amount && exchangeRates[fromCurrency] && exchangeRates[toCurrency]) {
      const numAmount = Number.parseFloat(amount)
      if (!isNaN(numAmount)) {
        const usdAmount = numAmount / exchangeRates[fromCurrency]
        const converted = usdAmount * exchangeRates[toCurrency]
        setConvertedAmount(converted)
      } else {
        setConvertedAmount(0)
      }
    } else {
      setConvertedAmount(0)
    }
  }, [amount, fromCurrency, toCurrency, exchangeRates])

  const handleAmountChange = (value: string) => {
    // Allow only numbers and decimal point
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      setAmount(value)
    }
  }

  const getConversionRate = () => {
    if (exchangeRates[fromCurrency] && exchangeRates[toCurrency]) {
      return exchangeRates[toCurrency] / exchangeRates[fromCurrency]
    }
    return 0
  }

  const getCurrencyInfo = (code: string) => {
    return currencies.find((c) => c.code === code) || currencies[0]
  }

  const conversionFee = 0 // No fee for this example
  const amountToConvert = Number.parseFloat(amount) || 0

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-md mx-auto pt-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Currency Conversion</h1>
          <p className="text-muted-foreground">Enter amount and select currency to convert to</p>
        </div>

        <Card className="rounded-2xl border-2 shadow-lg">
          <CardContent className="p-6 space-y-6">
            {error && (
              <Alert className="rounded-xl border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {/* Amount to Convert Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Amount to Convert</h3>

              <div className="bg-muted rounded-2xl p-4 border">
                <div className="flex items-center justify-between mb-3">
                  <Select value={fromCurrency} onValueChange={setFromCurrency}>
                    <SelectTrigger className="w-32 rounded-xl border">
                      <SelectValue>
                        <div className="flex items-center gap-2">
                          <span>{getCurrencyInfo(fromCurrency).flag}</span>
                          <span>{fromCurrency}</span>
                        </div>
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent className="rounded-xl border">
                      {currencies.map((currency) => (
                        <SelectItem key={currency.code} value={currency.code} className="rounded-lg">
                          <div className="flex items-center gap-3">
                            <span className="text-xl">{currency.flag}</span>
                            <div>
                              <div className="font-medium">
                                {currency.name} ({currency.code})
                              </div>
                            </div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <div className="text-right">
                    <Input
                      type="text"
                      value={amount}
                      onChange={(e) => handleAmountChange(e.target.value)}
                      placeholder="0"
                      className="text-right text-2xl font-bold bg-transparent border-none placeholder-muted-foreground w-24 rounded-xl"
                    />
                  </div>
                </div>
              </div>

              {/* Conversion Details */}
              <div className="bg-muted rounded-2xl p-4 space-y-3 border">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Conversion Fee</span>
                  <span>
                    -{getCurrencyInfo(fromCurrency).symbol}
                    {conversionFee.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Amount we'll convert</span>
                  <span>
                    ={getCurrencyInfo(fromCurrency).symbol}
                    {amountToConvert.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Rate</span>
                  <span className="flex items-center gap-2">
                    @{getConversionRate().toFixed(4)}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={fetchExchangeRates}
                      disabled={loading}
                      className="h-6 w-6 p-0 rounded-lg"
                    >
                      {loading ? <Loader2 className="h-3 w-3 animate-spin" /> : <RefreshCw className="h-3 w-3" />}
                    </Button>
                  </span>
                </div>
              </div>
            </div>

            {/* Amount You'll Receive Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Amount you'll receive</h3>

              <div className="bg-muted rounded-2xl p-4 border">
                <div className="flex items-center justify-between mb-3">
                  <Select value={toCurrency} onValueChange={setToCurrency}>
                    <SelectTrigger className="w-32 rounded-xl border">
                      <SelectValue>
                        <div className="flex items-center gap-2">
                          <span>{getCurrencyInfo(toCurrency).flag}</span>
                          <span>{toCurrency}</span>
                        </div>
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent className="rounded-xl border">
                      {currencies.map((currency) => (
                        <SelectItem key={currency.code} value={currency.code} className="rounded-lg">
                          <div className="flex items-center gap-3">
                            <span className="text-xl">{currency.flag}</span>
                            <div>
                              <div className="font-medium">
                                {currency.name} ({currency.code})
                              </div>
                            </div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <div className="text-right">
                    <div className="text-2xl font-bold">
                      {getCurrencyInfo(toCurrency).symbol}
                      {convertedAmount.toFixed(2)}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Continue Button */}
            <Button
              className="w-full font-semibold py-3 rounded-2xl"
              disabled={!amount || Number.parseFloat(amount) <= 0 || loading}
            >
              Continue
            </Button>

            {lastUpdated && (
              <div className="text-xs text-muted-foreground text-center">
                Rates last updated: {lastUpdated.toLocaleTimeString()}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

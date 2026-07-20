import { useEffect } from 'react';

import { InvestmentForm } from './components/InvestimentForm';
import { InvestmentResult } from './components/InvestimentResult';

import { useInvestmentCalculator } from './hooks/useInvestmentCalculator';

export default function App() {
  const calculator = useInvestmentCalculator();

  useEffect(() => {
    document.title =
      calculator.finalValue > 0
        ? `Calculadora de Investimentos | 💰 ${calculator.finalValue.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          })}`
        : 'Calculadora de Investimentos';
  }, [calculator.finalValue]);

  return (
    <main>
      <InvestmentForm
        initialValue={calculator.initialValue}
        monthlyContribution={calculator.monthlyContribution}
        interestRate={calculator.interestRate}
        period={calculator.period}
        timeUnit={calculator.timeUnit}
        rateUnit={calculator.rateUnit}
        onInitialValueChange={calculator.setInitialValue}
        onMonthlyContributionChange={calculator.setMonthlyContribution}
        onInterestRateChange={calculator.setInterestRate}
        onPeriodChange={calculator.setPeriod}
        onTimeUnitChange={calculator.setTimeUnit}
        onRateUnitChange={calculator.setRateUnit}
        onSubmit={calculator.handleCalculate}
      />

      <InvestmentResult
        finalValue={calculator.finalValue}
        investedValue={calculator.investedValue}
        profit={calculator.profit}
      />
    </main>
  );
}
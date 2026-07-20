import { InvestmentForm } from './components/InvestimentForm';
import { InvestmentResult } from './components/InvestimentResult';

import { useInvestmentCalculator } from './hooks/useInvestmentCalculator';


export default function App() {
  const calculator = useInvestmentCalculator();

  return (
    <main>
      <InvestmentForm
        initialValue={calculator.initialValue}
        monthlyContribution={
          calculator.monthlyContribution
        }
        interestRate={calculator.interestRate}
        period={calculator.period}
        timeUnit={calculator.timeUnit}
        rateUnit={calculator.rateUnit}
        onInitialValueChange={
          calculator.setInitialValue
        }
        onMonthlyContributionChange={
          calculator.setMonthlyContribution
        }
        onInterestRateChange={
          calculator.setInterestRate
        }
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
import { type FormEvent, useState } from 'react';

import type {
  RateUnit,
  TimeUnit,
} from '../types/Investiment';

export function useInvestmentCalculator() {
  const [initialValue, setInitialValue] = useState('');
  const [monthlyContribution, setMonthlyContribution] =
    useState('');
  const [interestRate, setInterestRate] = useState('');
  const [period, setPeriod] = useState('');

  const [timeUnit, setTimeUnit] =
    useState<TimeUnit>('months');

  const [rateUnit, setRateUnit] =
    useState<RateUnit>('monthly');

  const [finalValue, setFinalValue] = useState(0);
  const [investedValue, setInvestedValue] = useState(0);

  function convertPeriodToMonths(
    value: number,
    unit: TimeUnit,
  ): number {
    if (unit === 'days') {
      return value / 30;
    }

    if (unit === 'years') {
      return value * 12;
    }

    return value;
  }

  function convertRateToMonthly(
    rate: number,
    unit: RateUnit,
  ): number {
    const decimalRate = rate / 100;

    if (unit === 'daily') {
      return Math.pow(1 + decimalRate, 30) - 1;
    }

    if (unit === 'yearly') {
      return Math.pow(1 + decimalRate, 1 / 12) - 1;
    }

    return decimalRate;
  }

  function handleCalculate(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    const principal = Number(initialValue);
    const contribution =
      Number(monthlyContribution) || 0;
    const rate = Number(interestRate);
    const time = Number(period);

    const hasEmptyFields =
      initialValue.trim() === '' ||
      interestRate.trim() === '' ||
      period.trim() === '';

    const hasInvalidValues =
      principal < 0 ||
      contribution < 0 ||
      rate < 0 ||
      time <= 0;

    if (hasEmptyFields || hasInvalidValues) {
      alert('Preencha os valores corretamente.');
      return;
    }

    const months = Math.floor(
      convertPeriodToMonths(time, timeUnit),
    );

    if (months < 1) {
      alert('O período deve representar pelo menos um mês.');
      return;
    }

    const monthlyRate = convertRateToMonthly(
      rate,
      rateUnit,
    );

    let balance = principal;

    for (let month = 0; month < months; month++) {
      // Aplica juros no dinheiro que já estava investido
      balance *= 1 + monthlyRate;

      // Adiciona o novo aporte no final do mês
      balance += contribution;
    }

    const totalInvested =
      principal + contribution * months;

    setFinalValue(balance);
    setInvestedValue(totalInvested);
  }

  const profit = finalValue - investedValue;

  return {
    initialValue,
    monthlyContribution,
    interestRate,
    period,
    timeUnit,
    rateUnit,
    finalValue,
    investedValue,
    profit,

    setInitialValue,
    setMonthlyContribution,
    setInterestRate,
    setPeriod,
    setTimeUnit,
    setRateUnit,

    handleCalculate,
  };
}
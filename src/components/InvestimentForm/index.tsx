import { type FormEvent } from 'react';
import styles from './styles.module.css';

export type TimeUnit = 'days' | 'months' | 'years';
export type RateUnit = 'daily' | 'monthly' | 'yearly';

type InvestmentFormProps = {
  initialValue: string;
  monthlyContribution: string;
  interestRate: string;
  period: string;
  timeUnit: TimeUnit;
  rateUnit: RateUnit;

  onInitialValueChange: (value: string) => void;
  onMonthlyContributionChange: (value: string) => void;
  onInterestRateChange: (value: string) => void;
  onPeriodChange: (value: string) => void;
  onTimeUnitChange: (value: TimeUnit) => void;
  onRateUnitChange: (value: RateUnit) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

export function InvestmentForm({
  initialValue,
  monthlyContribution,
  interestRate,
  period,
  timeUnit,
  rateUnit,
  onInitialValueChange,
  onMonthlyContributionChange,
  onInterestRateChange,
  onPeriodChange,
  onTimeUnitChange,
  onRateUnitChange,
  onSubmit,
}: InvestmentFormProps) {
  return (
    <section className={styles.calculator}>
      <div className={styles.heading}>
        <h1>Calculadora de investimentos</h1>
      </div>

      <form className={styles.form} onSubmit={onSubmit}>
        <label>
          Valor inicial

          <input
            type="number"
            min="0"
            step="0.01"
            placeholder="Ex.: 1000"
            value={initialValue}
            onChange={event =>
              onInitialValueChange(event.target.value)
            }
          />
        </label>

        <label>
          Investimento mensal

          <input
            type="number"
            min="0"
            step="0.01"
            placeholder="Ex.: 200"
            value={monthlyContribution}
            onChange={event =>
              onMonthlyContributionChange(event.target.value)
            }
          />
        </label>

        <div className={styles.inputGroup}>
          <label>
            Taxa de juros

            <input
              type="number"
              min="0"
              step="0.01"
              placeholder="Ex.: 1"
              value={interestRate}
              onChange={event =>
                onInterestRateChange(event.target.value)
              }
            />
          </label>

          <label>
            Frequência da taxa

            <select
              value={rateUnit}
              onChange={event =>
                onRateUnitChange(
                  event.target.value as RateUnit,
                )
              }
            >
              <option value="daily">Ao dia</option>
              <option value="monthly">Ao mês</option>
              <option value="yearly">Ao ano</option>
            </select>
          </label>
        </div>

        <div className={styles.inputGroup}>
          <label>
            Tempo

            <input
              type="number"
              min="1"
              placeholder="Ex.: 12"
              value={period}
              onChange={event =>
                onPeriodChange(event.target.value)
              }
            />
          </label>

          <label>
            Período

            <select
              value={timeUnit}
              onChange={event =>
                onTimeUnitChange(
                  event.target.value as TimeUnit,
                )
              }
            >
              <option value="days">Dias</option>
              <option value="months">Meses</option>
              <option value="years">Anos</option>
            </select>
          </label>
        </div>

        <button type="submit">
          Calcular investimento
        </button>
      </form>
    </section>
  );
}
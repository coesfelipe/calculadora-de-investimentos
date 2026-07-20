import styles from './styles.module.css';

type InvestmentResultProps = {
  finalValue: number;
  investedValue: number;
  profit: number;
};

const currencyFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

export function InvestmentResult({
  finalValue,
  investedValue,
  profit,
}: InvestmentResultProps) {
  return (
    <section className={styles.results}>
      <h2>Resultado da simulação</h2>

      <div className={styles.resultCard}>
        <span>Valor final</span>

        <strong>
          {currencyFormatter.format(finalValue)}
        </strong>
      </div>

      <div className={styles.resultDetails}>
        <div>
          <span>Total investido</span>

          <strong>
            {currencyFormatter.format(investedValue)}
          </strong>
        </div>

        <div>
          <span>Total em rendimentos</span>

          <strong>
            {currencyFormatter.format(profit)}
          </strong>
        </div>
      </div>
    </section>
  );
}
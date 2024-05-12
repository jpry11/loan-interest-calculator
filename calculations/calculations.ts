const elapsedDays = (startDate: string): number => {
  const start = new Date(startDate);
  const today = new Date();
  return Math.floor((today.getTime() - start.getTime()) / (1000 * 3600 * 24));
};

const termOfLoan = (startDate: string, endDate: string) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  return Math.floor(
    (end.getTime() - start.getTime()) / (1000 * 3600 * 24 * 365)
  );
};

const interestRate = (interest: number, margin?: number) => {
  return margin ? (interest + margin) / 100 : interest / 100;
};

const interestAmountPerYear = (
  loanAmount: number,
  interest: number,
  margin?: number
): number => {
  return loanAmount * interestRate(interest, margin);
};

const dailyInterestAmount = (
  loanAmount: number,
  interest: number,
  margin?: number
): number => {
  return interestAmountPerYear(loanAmount, interest, margin) / 365;
};

const dailyInterestAmountAccrued = (
  startDate: string,
  loanAmount: number,
  interest: number,
  margin?: number
): number => {
  return (
    elapsedDays(startDate) * dailyInterestAmount(loanAmount, interest, margin)
  );
};

const totalInterest = (
  startDate: string,
  endDate: string,
  loanAmount: number,
  interest: number,
  margin?: number
): number => {
  console.log(interestAmountPerYear(loanAmount, interest, margin));
  console.log(termOfLoan(startDate, endDate));
  return (
    interestAmountPerYear(loanAmount, interest, margin) *
    termOfLoan(startDate, endDate)
  );
};

const roundValue = (value: number) => {
  return (Math.round(value * 100) / 100).toFixed(2);
};

export const calculateLoan = (
  startDate: string,
  endDate: string,
  loanAmount: number,
  currency: string,
  interest: number,
  margin: number
) => {
  return {
    "Daily Interest Amount without Margin": `${currency}${roundValue(
      dailyInterestAmount(loanAmount, interest)
    )}`,
    "Daily Interest Amount Accrued": `${currency}${roundValue(
      dailyInterestAmountAccrued(startDate, loanAmount, interest, margin)
    )}`,
    "Accrual Date": startDate,
    "Number of days elapsed since the Start Date of the loan":
      elapsedDays(startDate),
    "Total Interest": `${currency}${roundValue(
      totalInterest(startDate, endDate, loanAmount, interest, margin)
    )}`,
  };
};

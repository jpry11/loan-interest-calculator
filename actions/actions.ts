import { v4 as uuidv4, validate } from "uuid";
import { question, rl, updateQuestion } from "../questions/questions";
import { calculateLoan } from "../calculations/calculations";
import { getLoanFromCache, writeToCache } from "../cache/cache";

export const getInputs = async () => {
  const startDate = await question("Loan start date? ( format: DD-MM-YY): ");
  const endDate = await question("Loan end date? ( format: DD-MM-YY): ");
  const loanAmount = await question("Loan amount? : ");
  const currency = await question("Loan currency? : ");
  const interest = await question("Loan base interest rate? (e.g. 5.2):  ");
  const margin = await question("Margin rate? (e.g. 1.5):  ");
  return [startDate, endDate, loanAmount, currency, interest, margin];
};

export const calculateLoanActionAndSave = async (existingUuid: string) => {
  const [startDate, endDate, loanAmount, currency, interest, margin] =
    await getInputs();
  const uuid = validate(existingUuid) ? existingUuid : uuidv4();
  const output = {
    ...calculateLoan(
      startDate,
      endDate,
      +loanAmount,
      currency,
      +interest,
      +margin
    ),
  };

  writeToCache({ [uuid]: output });

  console.log({ ID: uuid, ...output });
  rl.close();
};

export const getLoanAction = async () => {
  const id = await question("ID of loan to retrieve: ");
  const cachedData = getLoanFromCache(id);

  console.log(cachedData);

  const toUpdate: boolean = await updateQuestion(
    "Would you like to update inputs?"
  );

  if (toUpdate) {
    await calculateLoanActionAndSave(id);
  }
  rl.close();
};

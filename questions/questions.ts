import { createInterface } from "node:readline";

export const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

export const question = (question: string) => {
  return new Promise<string>((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
};

export const updateQuestion = (question: string) => {
  return new Promise<boolean>((resolve) => {
    rl.question(`${question} (y/n): `, (answer) => {
      const shouldUpdate = answer === "y" ? true : false;
      resolve(shouldUpdate);
    });
  });
};

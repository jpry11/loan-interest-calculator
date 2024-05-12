import * as commander from "commander";
import { calculateLoanActionAndSave, getLoanAction } from "./actions/actions";

const program = new commander.Command();
program.command("calculate-loan").action(calculateLoanActionAndSave);
program.command("get-loan").action(getLoanAction);
program.parse();

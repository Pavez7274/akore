import { Instruction } from "../classes/instruction";
import { Task } from "../classes/compiler";
export default class VarInstruction extends Instruction {
    name: "$var";
    id: "$akitaVar";
    compile(task: Task): string;
}

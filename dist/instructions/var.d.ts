import { Instruction } from "../classes/instruction";
import { Task } from "../classes/compiler";
export default class VarInstruction extends Instruction {
    name: "$var";
    id: "$akoreVar";
    compile(task: Task): string;
}

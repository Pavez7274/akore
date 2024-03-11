import { Instruction } from "../classes/instruction";
import { Task } from "../classes/compiler";
export default class SumInstruction extends Instruction {
    name: "$sum";
    id: "$akoreSum";
    compile(task: Task): string;
}

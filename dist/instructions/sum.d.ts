import { Instruction } from "../classes/instruction";
import { Task } from "../classes/compiler";
export default class SumInstruction extends Instruction {
    name: "$sum";
    id: "$akitaSum";
    compile(task: Task): string;
}

import { Instruction } from "../classes/instruction";
import { Task } from "../classes/compiler";
export default class EscapeInstruction extends Instruction {
    name: "$escape";
    id: "$akitaEscape";
    compile(task: Task): string;
}

import { Instruction } from "../../classes/instruction";
import { Task } from "../../classes/compiler";
export default class WhileInstruction extends Instruction {
    name: "$while";
    id: "$akitaWhile";
    compile(task: Task): string;
}

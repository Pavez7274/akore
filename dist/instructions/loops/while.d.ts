import { Instruction } from "../../classes/instruction";
import { Task } from "../../classes/compiler";
export default class WhileInstruction extends Instruction {
    name: "$while";
    id: "$akoreWhile";
    compile(task: Task): string;
}

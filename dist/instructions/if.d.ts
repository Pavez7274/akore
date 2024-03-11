import { Instruction } from "../classes/instruction";
import { Task } from "../classes/compiler";
export default class IfInstruction extends Instruction {
    name: "$if";
    id: "$akoreIf";
    compile(task: Task): string;
}

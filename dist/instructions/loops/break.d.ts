import { Instruction } from "../../classes/instruction";
import { Task } from "../../classes/compiler";
export default class BreakInstruction extends Instruction {
    name: "$break";
    id: "$akoreBreak";
    compile(task: Task): "break;";
}

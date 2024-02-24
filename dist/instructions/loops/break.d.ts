import { Instruction } from "../../classes/instruction";
import { Task } from "../../classes/compiler";
export default class BreakInstruction extends Instruction {
    name: "$break";
    id: "$akitaBreak";
    compile(task: Task): "break;";
}

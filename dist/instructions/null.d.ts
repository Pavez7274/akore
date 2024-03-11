import { Instruction } from "../classes/instruction";
import { Task } from "../classes/compiler";
export default class NullInstruction extends Instruction {
    name: "$null";
    id: "$akoreNull";
    compile(task: Task): "null";
}

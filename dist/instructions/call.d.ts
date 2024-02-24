import { Instruction } from "../classes/instruction";
import { Task } from "../classes/compiler";
export default class CallInstruction extends Instruction {
    name: "$call";
    id: "$akitaCall";
    compile(task: Task): string;
}

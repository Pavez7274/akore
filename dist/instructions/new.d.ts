import { Instruction } from "../classes/instruction";
import { Task } from "../classes/compiler";
export default class NewInstruction extends Instruction {
    name: "$new";
    id: "$akoreNew";
    compile(task: Task): string;
}

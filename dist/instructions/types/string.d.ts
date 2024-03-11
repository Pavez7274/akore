import { Instruction } from "../../classes/instruction";
import { Task } from "../../classes/compiler";
export default class StringInstruction extends Instruction {
    name: "$string";
    id: "$akoreString";
    compile(task: Task): string;
}

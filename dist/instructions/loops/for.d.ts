import { Instruction } from "../../classes/instruction";
import { Task } from "../../classes/compiler";
export default class ForInstruction extends Instruction {
    name: "$for";
    id: "$akitaFor";
    compile(task: Task): string;
}

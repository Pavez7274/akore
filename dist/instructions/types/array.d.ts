import { Instruction } from "../../classes/instruction";
import { Task } from "../../classes/compiler";
export default class ArrayInstruction extends Instruction {
    name: "$array";
    id: "$akitaArray";
    compile(task: Task): string;
}

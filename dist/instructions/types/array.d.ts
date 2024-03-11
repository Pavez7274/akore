import { Instruction } from "../../classes/instruction";
import { Task } from "../../classes/compiler";
export default class ArrayInstruction extends Instruction {
    name: "$array";
    id: "$akoreArray";
    compile(task: Task): "new Array()";
}

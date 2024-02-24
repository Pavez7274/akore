import { Instruction } from "../../classes/instruction";
import { Task } from "../../classes/compiler";
export default class ObjectInstruction extends Instruction {
    name: "$object";
    id: "$akitaObject";
    compile(task: Task): string;
}

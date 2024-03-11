import { Instruction } from "../../classes/instruction";
import { Task } from "../../classes/compiler";
export default class ObjectInstruction extends Instruction {
    name: "$object";
    id: "$akoreObject";
    compile(task: Task): "new Object()";
}

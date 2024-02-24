import { Instruction } from "../../classes/instruction";
import { Task } from "../../classes/compiler";
export default class FunctionInstruction extends Instruction {
    name: "$function";
    id: "$akitaFunction";
    compile(task: Task): string;
}

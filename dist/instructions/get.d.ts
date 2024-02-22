import { Instruction } from "../classes/instruction";
import { Task } from "../classes/compiler";
export default class GetInstruction extends Instruction {
    name: "$get";
    id: "$akitaGet";
    compile(task: Task): string;
}

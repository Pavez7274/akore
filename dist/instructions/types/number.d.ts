import { Instruction } from "../../classes/instruction";
import { Task } from "../../classes/compiler";
export default class NumberInstruction extends Instruction {
    name: "$number";
    id: "$akoreNumber";
    compile(task: Task): string;
}

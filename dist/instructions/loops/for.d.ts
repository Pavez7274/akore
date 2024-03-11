import { Instruction } from "../../classes/instruction";
import { Task } from "../../classes/compiler";
export default class ForInstruction extends Instruction {
    name: "$for";
    id: "$akoreFor";
    compile(task: Task): string;
}

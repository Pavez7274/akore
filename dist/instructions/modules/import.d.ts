import { Instruction } from "../../classes/instruction";
import { Task } from "../../classes/compiler";
export default class ImportInstruction extends Instruction {
    name: "$import";
    id: "$akoreImport";
    compile(task: Task): string;
}

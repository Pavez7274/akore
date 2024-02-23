import { Instruction } from "../classes/instruction";
import { Task } from "../classes/compiler";
export default class ExportInstruction extends Instruction {
    name: "$export";
    id: "$akitaExport";
    compile(task: Task): string;
}

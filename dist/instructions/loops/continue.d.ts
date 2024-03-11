import { Instruction } from "../../classes/instruction";
import { Task } from "../../classes/compiler";
export default class ContinueInstruction extends Instruction {
    name: "$continue";
    id: "$akoreContinue";
    compile(task: Task): "continue;";
}

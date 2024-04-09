import { Token, Nodes } from "../../classes";
import { Instruction } from "../../classes/instruction";
export default class NumberInstruction extends Instruction {
    name: "$number";
    id: "$akoreNumber";
    parse({ parameters }: Token): Promise<Nodes.Node>;
}

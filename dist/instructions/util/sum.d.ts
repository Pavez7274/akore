import { Nodes, Token } from "../../classes";
import { Instruction } from "../../classes/instruction";
export default class $sum extends Instruction {
    name: "$sum";
    id: "$akoreSum";
    parse({ parameters, total }: Token): Promise<Nodes.Node>;
}

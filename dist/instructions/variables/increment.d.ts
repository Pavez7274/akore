import { Nodes, Token } from "../../classes/";
import { Instruction } from "../../classes/instruction";
export default class $increment extends Instruction {
    name: "$increment";
    id: "$akoreIncrement";
    parse({ parameters, total }: Token): Promise<Nodes.Node>;
}

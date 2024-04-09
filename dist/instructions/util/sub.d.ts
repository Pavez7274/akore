import { Nodes, Token } from "../../classes";
import { Instruction } from "../../classes/instruction";
export default class $sub extends Instruction {
    name: "$sub";
    id: "$akoreSub";
    parse({ parameters, total }: Token): Promise<Nodes.Node>;
}

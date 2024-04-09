import { Nodes, Token } from "../../classes";
import { Instruction } from "../../classes/instruction";
export default class $get extends Instruction {
    name: "$get";
    id: "$akoreGet";
    parse({ parameters, total }: Token): Promise<Nodes.Node>;
}

import { Nodes, Token } from "../../classes";
import { Instruction } from "../../classes/instruction";
export default class $modulo extends Instruction {
    name: "$modulo";
    id: "$akoreModulo";
    parse({ parameters, total }: Token): Promise<Nodes.Node>;
}

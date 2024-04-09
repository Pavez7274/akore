import { Nodes, Token } from "../../classes";
import { Instruction } from "../../classes/instruction";
export default class $multi extends Instruction {
    name: "$multi";
    id: "$akoreMulti";
    parse({ parameters, total }: Token): Promise<Nodes.Node>;
}

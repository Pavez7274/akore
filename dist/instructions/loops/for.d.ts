import { Nodes, Token } from "../../classes";
import { Instruction } from "../../classes/instruction";
export default class $for extends Instruction {
    name: "$for";
    id: "$akoreFor";
    parse({ parameters }: Token): Promise<Nodes.ControlFlow>;
}

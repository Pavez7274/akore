import { Token, Nodes } from "../../classes";
import { Instruction } from "../../classes/instruction";
export default class $while extends Instruction {
    name: "$while";
    id: "$akoreWhile";
    parse({ parameters }: Token): Promise<Nodes.ControlFlow>;
}

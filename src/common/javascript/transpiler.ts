import { Logger, Node, Schema, Transpiler } from "#structures";
import { CallCompetence } from "./competences/call";
import { DeclareCompetence } from "./competences/declare";
import { GetCompetence } from "./competences/get";
import { PrintCompetence } from "./competences/print";
import { SetCompetence } from "./competences/set";
import { StringCompetence } from "./competences/string";
import { Program, SequenceNode } from "./nodes";

export class JavaScriptTranspiler extends Transpiler {
	public readonly logger = new Logger();

	constructor() {
		super({
			// Primitives
			control_flow: new Schema({ identifier: Node, block: Node }),
			program: new Schema([Node]),
			string: new Schema([Node]),
			number: new Schema([Node]),

			// Other
			sequence: new Schema({ elements: [Node], operator: "string" }),
			caller: new Schema({ callee: Node, parameters: [Node], use_zero: "boolean" }),
			escape: new Schema("string"),
		});

		this.declare(
			new CallCompetence(this),
			new DeclareCompetence(this),
			new GetCompetence(this),
			new PrintCompetence(this),
			new SetCompetence(this),
			new StringCompetence(this),
		);
	}

	public toCode(code: string): string {
		return this.program(code).toCode();
	}

	public stringify(code: string): string {
		return new SequenceNode({
			elements: this.process(code),
			operator: " ",
		}).toCode();
	}

	public program(code: string): Program<Node<unknown>[]> {
		return new Program(this.process(code));
	}
}

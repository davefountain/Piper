class Stack {
    constructor() {
        this.items = [];
    }

    // Push operation
    push(element) {
        this.items.push(element);
    }

    // Pop operation
    pop() {
        if (this.isEmpty()) {
            return "Stack is empty";
        }
        return this.items.pop();
    }

    // Peek operation
    peek() {
        if (this.isEmpty()) {
            return "Stack is empty";
        }
        return this.items[this.items.length - 1];
    }

    // isEmpty operation
    isEmpty() {
        return this.items.length === 0;
    }

    // Size operation
    size() {
        return this.items.length;
    }

    // Print the stack
    print() {
        console.log(this.items);
    }
}

function get_statement_type(body) {
    // locals
    let pos;

    if (body.length === 0)
        return "blank";             // Blank line
    pos = body.search(/\W/);        // First non-word character
    if (pos === -1)
        return body;                // The whole body is a word

    // Look for the word "function" in the body TODO: what if it is in a string?
    if (body.search(/\bfunction\b/) !== -1)
        return "function";

    return body.substring(0, pos);  // Return up to the position of the non-word
}

function close_brackets(depth, context) {
    let close_bracket;
    for (let i = context.last_depth; i > depth; i--) {
        close_bracket = context.level_stack.pop();
        if (close_bracket === "y") {
            context.out += "    ".repeat(i - 1) + "}\n";
        }
    }
}

function handle(statement_type, statement_body, depth, context) {
    // locals
    let padding = "    ".repeat(depth);
    let dec_padding = "    ".repeat(Math.max(depth - 1, 0));
    let output;
    let num_closing_brackets;
    let close_bracket;

    // If a blank line then just return
    if (statement_type === "blank") {
        return;
    }
    // Output required closing brackets
    close_brackets(depth, context);

    switch (statement_type) {
        case "global":
            context.level_stack.push("n");
            context.declaration_depth = depth;
            output = padding + "// Globals";
            break;
        case "local":
            context.level_stack.push("n");
            context.declaration_depth = depth;
            output = padding + "// Locals";
            break;

        case "class":
        case "function":
        case "method":
        case "if":
        case "constructor":
            context.level_stack.push("y");
            context.declaration_depth = -2;
            output = padding + statement_body + " {";
            break;

        case "for":
            context.level_stack.push("y");
            context.declaration_depth = -2;
            statement_body = "for (let " + statement_body.substring(3);
            output = padding + statement_body + ") {";           // TODO: foreach formatting
            break;

        default:
            // handle local & global declarations
            if (depth === context.declaration_depth + 1)
                output = dec_padding + "let " + statement_body + ";";
            else {
                context.declaration_depth = -2;
                output = padding + statement_body;
            }
    }
    // Output the generated line
    //console.log(output);
    context.out += output + "\n";
    context.last_depth = depth;
}

function transpile(line, context) {
    // Locals
    let statement_body = line.trimStart();
    let spaces = line.length - statement_body.length;
    let depth = spaces / 4;
    let statement_type;

    statement_body = statement_body.trim();
    statement_type = get_statement_type(statement_body);

    handle(statement_type, statement_body, depth, context);

}

function PiperToJS(piper_string) {
    // Context
    let context = {
        out: "",
        lineno: 0,
        last_depth: 0,
        declaration_depth: -2,
        level_stack: new Stack()
    }

    let lines = piper_string.split('\n');
    for (let line of lines) {
        context.lineno++;
        transpile(line, context);
    }
    close_brackets(0, context);
    return context.out;
}
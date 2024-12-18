const fs = require("fs");
const path = require("path");

function generatePhpClassFile(mainClass) {
    const fileName = `${mainClass.nameClass}.php`;
    const filePath = path.join(__dirname, "../generatedCode", fileName);

    let phpCode = `<?php\n\nclass ${mainClass.nameClass}`;

    if (mainClass.parentClass) {
        phpCode += ` extends ${mainClass.parentClass.nameClass}`;
    }

    phpCode += " {\n";

    mainClass.bodyArray.forEach((body) => {
        if (!body.isMethode) {
            const visibility = body.visibility === "+" ? "public" : body.visibility === "#" ? "protected" : "private";
            phpCode += `    ${visibility} ${body.typeAttribut} $${body.nameAttribut};\n`;
        }
    });

    phpCode += "\n";

    phpCode += `    public function __construct(`;
    if (mainClass.parentClass) {
        phpCode += mainClass.parentClass.bodyArray
            .filter((body) => !body.isMethode)
            .map((body) => `$${body.nameAttribut}`)
            .join(", ");
        if (mainClass.bodyArray.some((body) => !body.isMethode)) {
            phpCode += ", ";
        }
    }

    phpCode += mainClass.bodyArray
        .filter((body) => !body.isMethode)
        .map((body) => `$${body.nameAttribut}`)
        .join(", ");

    phpCode += ") {\n";

    if (mainClass.parentClass) {
        phpCode += `        parent::__construct(${mainClass.parentClass.bodyArray
            .filter((body) => !body.isMethode)
            .map((body) => `$${body.nameAttribut}`)
            .join(", ")});
        \n`;
    }

    mainClass.bodyArray.forEach((body) => {
        if (!body.isMethode) {
            phpCode += `        $this->${body.nameAttribut} = $${body.nameAttribut};\n`;
        }
    });

    phpCode += "    }\n\n";

    // Methods
    mainClass.bodyArray.forEach((body) => {
        if (body.isMethode) {
            const visibility = body.visibility === "+" ? "public" : body.visibility === "#" ? "protected" : "private";
            phpCode += `    ${visibility} function ${body.nameAttribut}() {\n`;
            if (body.nameAttribut === "isMinor") {
                phpCode += `        return false;\n`;
            } else {
                phpCode += `        return null;\n`;
            }
            phpCode += "    }\n";
        }
    });

    phpCode += "}\n\n";
    phpCode += "?>";

    const directory = path.dirname(filePath);
    if (!fs.existsSync(directory)) {
        fs.mkdirSync(directory, { recursive: true });
    }

    fs.writeFileSync(filePath, phpCode);
    console.log(`${fileName} has been generated at ${filePath}`);
}

module.exports = { generatePhpClassFile };

const fs = require("fs");
const path = require("path");

function generateJavaClassFile(mainClass) {
    const fileName = `${mainClass.nameClass}.java`;
    const filePath = path.join(__dirname, "../generatedCode", fileName);

    let javaCode = `public class ${mainClass.nameClass}`;

    if (mainClass.parentClass) {
        javaCode += ` extends ${mainClass.parentClass.nameClass}`;
    }

    javaCode += " {\n";

    mainClass.bodyArray.forEach((body) => {
        if (!body.isMethode) {
            const visibility = body.visibility === "+" ? "public" : body.visibility === "#" ? "protected" : "private";
            javaCode += `    ${visibility} ${body.typeAttribut} ${body.nameAttribut};\n`;
        }
    });

    javaCode += "\n";

    javaCode += `    public ${mainClass.nameClass}(`;

    if (mainClass.parentClass) {
        javaCode += mainClass.parentClass.bodyArray
            .filter((body) => !body.isMethode)
            .map((body) => `${body.typeAttribut} ${body.nameAttribut}`)
            .join(", ");
        if (mainClass.bodyArray.some((body) => !body.isMethode)) {
            javaCode += ", ";
        }
    }

    javaCode += mainClass.bodyArray
        .filter((body) => !body.isMethode)
        .map((body) => `${body.typeAttribut} ${body.nameAttribut}`)
        .join(", ");

    javaCode += `) {\n`;

    if (mainClass.parentClass) {
        javaCode += `        super(${mainClass.parentClass.bodyArray
            .filter((body) => !body.isMethode)
            .map((body) => body.nameAttribut)
            .join(", ")});\n`;
    }

    mainClass.bodyArray.forEach((body) => {
        if (!body.isMethode) {
            javaCode += `        this.${body.nameAttribut} = ${body.nameAttribut};\n`;
        }
    });

    javaCode += "    }\n\n";

    mainClass.bodyArray.forEach((body) => {
        if (body.isMethode) {
            const visibility = body.visibility === "+" ? "public" : body.visibility === "#" ? "protected" : "private";
            javaCode += `    ${visibility} ${body.typeAttribut} ${body.nameAttribut}() {\n`;
            if (body.nameAttribut === "isMinor") {
                javaCode += `        return false;\n`;
            } else {
                javaCode += `        return null;\n`;
            }
            javaCode += "    }\n";
        }
    });

    javaCode += "}\n";

    const directory = path.dirname(filePath);
    if (!fs.existsSync(directory)) {
        fs.mkdirSync(directory, { recursive: true });
    }

    fs.writeFileSync(filePath, javaCode);
    console.log(`${fileName} has been generated at ${filePath}`);
}

module.exports = { generateJavaClassFile };

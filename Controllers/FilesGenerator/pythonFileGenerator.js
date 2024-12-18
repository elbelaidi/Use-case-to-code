const fs = require("fs");
const path = require("path");

function generatePythonClassFile(mainClass) {
    const fileName = `${mainClass.nameClass}.py`;
    const filePath = path.join(__dirname, "../generatedCode", fileName);

    let pythonCode = `class ${mainClass.nameClass}`;

    if (mainClass.parentClass) {
        pythonCode += `(${mainClass.parentClass.nameClass})`;
    }

    pythonCode += ":\n";

    pythonCode += `    def __init__(self, `;
    if (mainClass.parentClass) {
        pythonCode += mainClass.parentClass.bodyArray
            .filter((body) => !body.isMethode)
            .map((body) => `${body.nameAttribut}`)
            .join(", ");
        if (mainClass.bodyArray.some((body) => !body.isMethode)) {
            pythonCode += ", ";
        }
    }

    pythonCode += mainClass.bodyArray
        .filter((body) => !body.isMethode)
        .map((body) => `${body.nameAttribut}`)
        .join(", ");

    pythonCode += "):\n";

    if (mainClass.parentClass) {
        pythonCode += `        super().__init__(${mainClass.parentClass.bodyArray
            .filter((body) => !body.isMethode)
            .map((body) => body.nameAttribut)
            .join(", ")}\n`;
    }

    mainClass.bodyArray.forEach((body) => {
        if (!body.isMethode) {
            pythonCode += `        self.${body.nameAttribut} = ${body.nameAttribut}\n`;
        }
    });

    pythonCode += "\n";

    mainClass.bodyArray.forEach((body) => {
        if (body.isMethode) {
            pythonCode += `    def ${body.nameAttribut}(self):\n`;
            if (body.nameAttribut === "isMinor") {
                pythonCode += `        return False\n`;
            } else {
                pythonCode += `        return None\n`;
            }
        }
    });

    const directory = path.dirname(filePath);
    if (!fs.existsSync(directory)) {
        fs.mkdirSync(directory, { recursive: true });
    }

    fs.writeFileSync(filePath, pythonCode);
    console.log(`${fileName} has been generated at ${filePath}`);
}

module.exports = { generatePythonClassFile };

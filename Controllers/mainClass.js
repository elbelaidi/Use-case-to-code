const fs = require("fs");
class MainClass {
    static idCounter = 1;

    constructor(nameClass, bodyArray = []) {
        this.nameClass = nameClass;
        this.bodyArray = bodyArray;
        this.id = MainClass.idCounter++;
        this.associations = [];
        this.parentClass = null; 
    }

    addAssociation(association) {
        this.associations.push(association);
    }

    displayInfo() {
        console.log(`***************************`);
        console.log(`Class: ${this.nameClass}`);
        if (this.parentClass) {
            console.log(`Inherits from: ${this.parentClass.nameClass}`);
        }
        console.log(`***************************`);

        this.bodyArray.forEach((body) => {
            if (!body.isMethode) {
                console.log(`${body.visibility} ${body.nameAttribut} : ${body.typeAttribut}`);
            }
        });

        console.log(`***************************`);

        this.bodyArray.forEach((body) => {
            if (body.isMethode) {
                console.log(`${body.visibility} ${body.nameAttribut}() : ${body.typeAttribut}`);
            }
        });

        if (this.associations.length > 0) {
            console.log(`Associations:`);
            this.associations.forEach((association) => association.displayAssociationInfo());
        }
    }
}

module.exports = MainClass;

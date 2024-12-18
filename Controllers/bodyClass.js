class BodyClass {
    constructor(visibility, nameAttribut, typeAttribut, isMethode) { 
        this.visibility = visibility;       
        this.nameAttribut = nameAttribut;   
        this.typeAttribut = typeAttribut;  
        this.isMethode = isMethode;         
    }

    displayInfo() {
        console.log(`Visibility: ${this.visibility}`);
        console.log(`Name of Attribute: ${this.nameAttribut}`);
        console.log(`Type of Attribute: ${this.typeAttribut}`);
        console.log(`Is Method: ${this.isMethode ? 'Yes' : 'No'}`);
    }
}

module.exports = BodyClass;

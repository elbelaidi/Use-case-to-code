class AssociationManager {
    static associations = [];

    /**
     * @param {MainClass} classA 
     * @param {MainClass} classB 
     * @param {String} type 
     * @param {String} multiplicityA 
     * @param {String} multiplicityB 
     */
    static addAssociation(classA, classB, type, multiplicityA, multiplicityB) {
        AssociationManager.associations.push({
            classA,
            classB,
            type,
            multiplicityA,
            multiplicityB,
        });

        AssociationManager.addAssociationAttributes(classA, classB, type, multiplicityA);
        if (type !== "composition") {
            AssociationManager.addAssociationAttributes(classB, classA, type, multiplicityB);
        }
    }

    /**
     * @param {MainClass} sourceClass 
     * @param {MainClass} targetClass 
     * @param {String} type 
     * @param {String} multiplicity 
     */
    static addAssociationAttributes(sourceClass, targetClass, type, multiplicity) {
        let attributeType = targetClass.nameClass;
        if (multiplicity === "1..*" || multiplicity === "*") {
            attributeType += "[]";
        }

        sourceClass.bodyArray.push({
            visibility: "+", 
            nameAttribut: `${targetClass.nameClass.toLowerCase()}List`,
            typeAttribut: attributeType,
            isMethode: false,
        });
    }

    /**
     */
    static displayAssociations() {
        AssociationManager.associations.forEach(({ classA, classB, type, multiplicityA, multiplicityB }) => {
            console.log(
                `${classA.nameClass} ${multiplicityA} ---[${type}]--- ${multiplicityB} ${classB.nameClass}`
            );
        });
    }
}

module.exports = AssociationManager;

const MainClass = require("./mainClass");
const bodyClass = require("./bodyClass");
const {addAssociation} = require("./Associations/associationManager");
const { addInheritance } = require("./Associations/inheritanceHandler");
const { generateJavaClassFile } = require("./FilesGenerator/javaFileGenerator");
const { generatePythonClassFile } = require("./FilesGenerator/pythonFileGenerator");
const { generatePhpClassFile } = require("./FilesGenerator/phpFileGenerator");

function generateClassFiles() {
    allClasses.forEach((classObj) => {
        switch (choixLanguage) {
            case "Java":
                generateJavaClassFile(classObj);
                break;
            case "PHP":
                generatePhpClassFile(classObj);
                break;
            case "Python":
                generatePythonClassFile(classObj);
                break;
            default:
                generateJavaClassFile(classObj);
                generatePhpClassFile(classObj);
                generatePythonClassFile(classObj);
                

                
        }
    });
}

const bodyArrayUniversity = [
    new bodyClass("-", "universityName", "String", false),
    new bodyClass("#", "location", "String", false),
    new bodyClass("+", "getUniversityInfo", "String", true),
];

const bodyArrayFaculty = [
    new bodyClass("-", "facultyName", "String", false),
    new bodyClass("+", "facultyDean", "String", false),
    new bodyClass("+", "studentsList", "Student[]", false),
];

const bodyArrayStudent = [
    new bodyClass("-", "studentID", "int", false),
    new bodyClass("#", "enrollmentYear", "int", false),
    new bodyClass("+", "getStudentInfo", "String", true),
];

const universityClass = new MainClass("University", bodyArrayUniversity);
const facultyClass = new MainClass("Faculty", bodyArrayFaculty);
const studentClass = new MainClass("Student", bodyArrayStudent);

const onlineUniversityClass = new MainClass("OnlineUniversity", []);
const traditionalUniversityClass = new MainClass("TraditionalUniversity", []);

addInheritance(onlineUniversityClass, universityClass);
addInheritance(traditionalUniversityClass, universityClass);

addAssociation(universityClass, facultyClass, "aggregation", "1..*", "*");
addAssociation(facultyClass, studentClass, "association", "1..*", "*");



const allClasses = [
    universityClass,
    facultyClass,
    studentClass,
    onlineUniversityClass,
    traditionalUniversityClass
];



const choixLanguage = "Java";
generateClassFiles();

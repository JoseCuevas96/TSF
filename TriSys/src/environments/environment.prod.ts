export const environment = {
  production: true,
  apiClass: 'https://localhost:44376/api/Classes/',
  routes: {
    getClassLocation: "getClassLocations",
    insertClassLocation: "insertClassLocation",
    updateClassLocation: "updateClassLocation",
    deleteClassLocation: "deleteClassLocation"
  },
  apiInstructor: 'https://localhost:44376/api/Instructor/',
  routesInstructor: {
    getInstructors: "getInstructors",
    insertInstructor: "insertInstructor",
    updateInstructor: "updateInstructor",
    deleteInstructor: "deleteInstructor"
  },
  routesClasses: {
    getClasses: "getClasses",
    insertClass: "insertClass",
    updateClass: "updateClass",
    deleteClass: "deleteClass"
  }
};

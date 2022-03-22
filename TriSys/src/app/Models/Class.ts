export class ClassView {
    idClass: number = 0;
    idClassName: number = 0;
    className: string = '';
    idClassLocation: number = 0;
    classLocation: string = '';
    schedule: string = '';
    maxStudents: string = '';
    startTime: string = '';
    finishTime: string = '';
    registerCost: string = '';
    note: string = '';
    enabled: boolean = false;
    spanish: boolean = false;
    idInstructor: number = 0;
    instructor: string = '';
    searchKey: string = '';
    createDate: Date = new Date();
}
export class ClassInsert {
    Name: string = '';
    Location: string = '';
    Schedule: string = '';
    MaxStudents: string = '';
    StartDate: string = '';
    EndDate: string = '';
    RegisterCost: string = '';
    Note: string = '';
    Active: boolean = false;
    Spanish: boolean = false;
    Instructor: string = '';
    Private: boolean = false;
}

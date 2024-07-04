
export class EmployeeDto {
    id: number;
    firstName: string;
    lastName: string;
    age:number;
    personId: string;
    professionId: number;
    profession: string;

    constructor(    id: number = 0 , firstName: string = "" ,lastName: string  = "" ,age:number = 0 ,   professionId: number = 1, personId: string  = "" ,profession: string  = "" )
    {
        this.id =id;
        this.firstName =firstName;
        this.lastName=lastName;
        this.age= age;
        this.personId = personId;
        this.professionId=professionId;
        this.profession = profession;
    }


}
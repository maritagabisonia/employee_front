
export class Employee {
    id: number;
    firstName: string;
    lastName: string;
    age:number;
    personId: string;
    professionId: number;

    constructor(    id: number = 0 , firstName: string = "" ,lastName: string  = "" ,age:number = 0 ,personId: string  = "" ,professionId: number  = 1 )
    {
        this.id =id;
        this.firstName =firstName;
        this.lastName=lastName;
        this.age= age;
        this.personId = personId;
        this.professionId = professionId;
    }


}
import { Contacts } from "./Contact";

export class EmployeeWithContacts {
    id: number;
    firstName: string;
    lastName: string;
    age:number;
    personId: string;
    professionId: number;
    contactDetails: Contacts[];

    constructor(    id: number = 0 , firstName: string = "" ,lastName: string  = "" ,age:number = 0 ,personId: string  = "" ,professionId: number  = 1, contactDetails:Contacts[]=[] )
    {
        this.id =id;
        this.firstName =firstName;
        this.lastName=lastName;
        this.age= age;
        this.personId = personId;
        this.professionId = professionId;
        this.contactDetails = contactDetails;
    }


}
import { UserRoles } from './UserRoles';

export class User {
    id: string;
    name: string;
    surname: string;
    email: string;
    password: string;
    userRol: (number|UserRoles)
}
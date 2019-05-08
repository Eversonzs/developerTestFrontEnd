import { UserRoles } from './UserRoles';

export class User {
    id: string;
    name: string;
    surname: string;
    username: string;
    email: string;
    password: string;
    userRol: (UserRoles)
}
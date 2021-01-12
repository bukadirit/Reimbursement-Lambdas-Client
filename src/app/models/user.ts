export class User{
    constructor(
            public email?: string,
            public firstName?: string,
            public id?:number,
            public lastName?: string,
            public password?: string,
            public role?: string,
            public username?: string){}
}
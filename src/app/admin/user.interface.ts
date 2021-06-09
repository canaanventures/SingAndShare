export class User {
    public first_name: string;
    public last_name: string;
    public email_id: string;
    public mentor_email_id: string;
    public srs_id: string;
    public role_id: string;
    public parent_id: string;
    constructor(
        first_name: string,
        last_name: string,
        email_id: string,
        mentor_email_id: string,
        srs_id: string,
        role_id: string,
        parent_id: string,
    ) {
        this.first_name = first_name

    }
}
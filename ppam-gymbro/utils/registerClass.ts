export default class RegisterClass {
    username : string;
    email : string;
    password : string;
    
    constructor(username?: string, email?: string, password?: string) {
        this.username = username || ''; // Set default value if not provided
        this.email = email || '';
        this.password = password || '';
      }
}
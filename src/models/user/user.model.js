class UserModel {

    email;
    nickname;
    password;

    constructor(email, nickname, password) {

        this.email = email;
        this.nickname = nickname;
        this.password = password;
        
    }

}

export default UserModel;
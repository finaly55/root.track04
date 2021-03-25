import HTTP_METHODS from "../constants/http_methods"
import FetcherService from './FetcherService'

class UserService {

    //Récupération des utilisateurs
    static getUsers() {
        const url = "/users"
        return FetcherService.sendPromise(url);
    }
    
    static getUserByMail(mail) {
        const url = `/users/mail/${mail}`;
        return FetcherService.sendPromise(url);
    }

    //Ajout d'un utilisateur
    static addUser(user) {
        const url = `/users`;

        var data = {
            username: user.username,
            firstname: user.firstname,
            lastname: user.lastname,
            mail: user.mail,
            role: user.role,
            civility: user.civility
        }

        return FetcherService.sendPromise(url, HTTP_METHODS.POST, data);
    }

    //Modiification d'un utilisateur
    static updateUser(user) {
        const url = "/users";

        var data = {
            _id: user._id,
            username: user.username,
            firstname: user.firstname,
            lastname: user.lastname,
            mail: user.mail,
            role: user.role,
            civility: user.civility
        }

        return FetcherService.sendPromise(url, HTTP_METHODS.PUT, data);
    }

    //Suppression d'un utilisateur
    static deleteUser(id) {
        const url = `/users/${id}`;
        return FetcherService.sendPromise(url, HTTP_METHODS.DELETE);
    }
}

export default UserService;

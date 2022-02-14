const errorCatch = require('../services/error');
const db = require('../database');

//Constructeur qui cree un modele Auth (pour authentification)
class Auth {
    constructor(data={}) {
        for (const prop in data) {
            this[prop] = data[prop];
        }
    }

    //Fonction asynchrone qui inscrit un utilisateur dans la BDD
    static async signup(user) {
        try { 

			const salt = bcrypt.genSaltSync(10);
			const hash = bcrypt.hashSync(user.password, salt);

            const preparedQuery = {
                text: `INSERT INTO "user" (first_name, last_name, email, password) 
					VALUES ($1, $2, $3, $4) RETURNING id;`,
                values: [user.firstName, user.lastName, user.email, hash]
            }    
            const {rows} = await db.query(preparedQuery);
            if (rows[0]){
                return rows[0];
            } else {
                return null
            }
            
        } catch (error) {
            errorCatch(error);
        }
    } 

    //Fonction asynchrone qui connecte un utilisateur a partir de son email
    static async login(user) {
        try {
            const preparedQuery = {
                text: 'SELECT * FROM "user" WHERE email=$1',
                values: [user.email]
            }

            const {rows} = await db.query(preparedQuery)

            if (bcrypt.compareSync(user.password, rows[0].password)  && user.email == rows[0].email){
                return rows[0];
            } else {
                return null;
            }

        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = Auth;



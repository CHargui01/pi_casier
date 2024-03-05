const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const app = express();
const dotenv =require('dotenv').config();

app.use(express.json());

app.use(cors());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "pi_casier"
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to database:', err);
        return;
    }
    console.log('Connected to database');
});

app.post('/register', async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        // Vérifiez si l'email existe déjà dans la base de données
        const sqlCheckEmail = "SELECT * FROM user WHERE email = ?";
        db.query(sqlCheckEmail, [email], async (err, result) => {
            if (err) {
                console.error('Error checking email:', err);
                return res.status(500).json({ error: "Internal Server Error" });
            }
            if (result.length > 0) {
                return res.status(400).json({ error: 'Email already exists' });
            } else {
                // Hash du mot de passe
                const hashedPassword = await bcrypt.hash(password, 10);

                // Insérer l'utilisateur dans la base de données
                const sqlInsertUser = "INSERT INTO user (name, email, password, role) VALUES (?, ?, ?, ?)";
                db.query(sqlInsertUser, [name, email, hashedPassword, role], (err, result) => {
                    if (err) {
                        console.error('Error inserting user:', err);
                        return res.status(500).json({ error: "Internal Server Error" });
                    }
                    return res.status(201).json({ message: "User registered successfully" });
                });
            }
        });
    } catch (error) {
        console.error('Error registering user:', error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Vérifiez si l'email existe dans la base de données
        const [user] = await new Promise((resolve, reject) => {
            const sqlCheckEmail = "SELECT * FROM user WHERE email = ?";
            db.query(sqlCheckEmail, [email], (err, result) => {
                if (err) {
                    console.error('Error checking email:', err);
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });

        if (!user) {
            return res.status(400).json({ error: 'Email not found' });
        }

        // Vérifiez si le mot de passe correspond
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(400).json({ error: 'Invalid password' });
        }

        // Créer et envoyer le jeton JWT
        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET);
        res.cookie('token', token, { httpOnly: true }).send();
    } catch (error) {
        console.error('Error during login:', error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});


app.get("/listuser", (req, res) => {
    const sql = "SELECT * FROM user";
    db.query(sql, (err, data) => {
        if (err) return res.json("Error");
        return res.json(data);
    });
});

app.post('/adduser', (req, res) => {
    const { name, email, password, role } = req.body;
    const sql = "INSERT INTO user (name, email, password, role) VALUES (?, ?, ?, ?)";
    const values = [name, email, password, role];
    db.query(sql, values, (err, data) => {
        if (err) {
            console.error('Error adding user:', err);
            return res.json("Error");
        }
        return res.json(data);
    });
});

app.put('/update/:idUser', (req, res) => {
    const { name, email, password, role } = req.body;
    const idUser = req.params.idUser;
    const sql = "UPDATE user SET name = ?, email = ?, password = ?, role = ? WHERE idUser = ?";
    const values = [name, email, password, role, idUser];
    db.query(sql, values, (err, data) => {
        if (err) {
            console.error('Error updating user:', err);
            return res.json("Error");
        }
        return res.json(data);
    });
});

app.delete('/userdel/:idUser', (req, res) => {
    const idUser = req.params.idUser;
    const sql = "DELETE FROM user WHERE idUser = ?";
    db.query(sql, [idUser], (err, data) => {
        if (err) {
            console.error('Error delete user:', err);
            return res.json("Error");
        }
        return res.json(data);
    });
});
////////////table casier //////////////
app.get("/detailcasier", (req, res) => {
    const sql = "SELECT * FROM casier";
    db.query(sql, (err, data) => {
        if (err) {
            console.error('Error fetching list of medicines:', err);
            return res.status(500).json({ error: "Error fetching list of medicines" });
        }
        return res.json(data);
    });
});

////////////table etage //////////////
app.get("/detailetage", (req, res) => {
    const sql = "SELECT * FROM etage";
    db.query(sql, (err, data) => {
        if (err) {
            console.error('Error fetching list of medicines:', err);
            return res.status(500).json({ error: "Error fetching list of medicines" });
        }
        return res.json(data);
    });
});

app.post('/addetage', (req, res) => {
    const { nometage, temp, poid, idcasetage } = req.body;
    const sql = "INSERT INTO etage (nometage, temp, poid, idcasetage) VALUES (?, ?, ?, ?)";
    const values = [nometage, temp, poid, idcasetage];
    db.query(sql, values, (err, data) => {
        if (err) {
            console.error('Error adding etage:', err);
            return res.json("Error");
        }
        return res.json(data);
    });
});

app.put('/updateetage/:idetage', (req, res) => {
    const { nometage, temp, poid, idcasetage } = req.body;
    const idetage = req.params.idetage;
    const sql = "UPDATE etage SET nometage = ?, temp = ?, poid = ?, idcasetage = ? WHERE idetage = ?";
    const values = [nometage, temp, poid, idcasetage, idetage];
    db.query(sql, values, (err, data) => {
        if (err) {
            console.error('Error updating etage:', err);
            return res.json("Error");
        }
        return res.json(data);
    });
});

app.delete('/etagedel/:idetage', (req, res) => {
    const idetage = req.params.idetage;
    const sql = "DELETE FROM etage WHERE idetage = ?";
    db.query(sql, [idetage], (err, data) => {
        if (err) {
            console.error('Error delete etage:', err);
            return res.json("Error");
        }
        return res.json(data);
    });
});

////////////table medicament //////////////
app.get("/listmed", (req, res) => {
    const sql = "SELECT * FROM medicament";
    db.query(sql, (err, data) => {
        if (err) {
            console.error('Error fetching list of medicines:', err);
            return res.status(500).json({ error: "Error fetching list of medicines" });
        }
        return res.json(data);
    });
});

app.listen(8081, () => {
    console.log("Server is running on port 8081");
});

app.post('/addmed', (req, res) => {
    const { nomMed, descmed, dateEx, tempMin, typeMed, idUserMed, idetagemed } = req.body; // Récupération des données du formulaire
    const sql = "INSERT INTO medicament (nomMed, descmed, dateEx, tempMin, typeMed, idUserMed, idetagemed) VALUES (?, ?, ?, ?, ?, ?, ?)"; // Requête SQL pour insérer un nouveau médicament dans la base de données
    const values = [nomMed, descmed, dateEx, tempMin, typeMed, idUserMed, idetagemed]; // Valeurs à insérer dans la requête SQL
    db.query(sql, values, (err, data) => {
        if (err) {
            console.error('Error adding medication:', err);
            return res.json("Error");
        }
        return res.json(data);
    });
});

app.delete('/meddel/:idMed', (req, res) => {
    const idMed = req.params.idMed;
    const sql = "DELETE FROM medicament WHERE idMed = ?";
    db.query(sql, [idMed], (err, data) => {
        if (err) {
            console.error('Error delete etage:', err);
            return res.json("Error");
        }
        return res.json(data);
    });
});

app.put('/updatemed/:idMed', (req, res) => {
    const idMed = req.params.idMed;
    const { nomMed, descmed, dateEx, tempMin, typeMed, idUserMed, idetagemed } = req.body;
    const sql = "UPDATE medicament SET nomMed = ?, descmed = ?, dateEx = ?, tempMin = ?, typeMed = ?, idUserMed = ?, idetagemed = ? WHERE idMed = ?";
    const values = [nomMed, descmed, dateEx, tempMin, typeMed, idUserMed, idetagemed, idMed];
    db.query(sql, values, (err, data) => {
        if (err) {
            console.error('Error updating medication:', err);
            return res.json("Error");
        }
        return res.json(data);
    });
});


app.get("/listmed/:idetage", (req, res) => {
    const idetage = req.params.idetage; 
    const sql = "SELECT * FROM medicament WHERE idetagemed = ?";
    db.query(sql, [idetage], (err, data) => {
        if (err) {
            console.error('Error fetching list of medicines:', err);
            return res.status(500).json({ error: "Error fetching list of medicines" });
        }
        return res.json(data);
    });
});







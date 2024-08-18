import express, { Express } from "express";
import "dotenv/config";
import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import { nanoid } from 'nanoid';
import jwt from 'jsonwebtoken';
import cors from "cors";
import { emailRegex, passwordRegex } from "./lib/utils.js";

//schema imports 
import User, { IUser } from "./schema/user.js";

const app: Express = express();
const port = 3333;
app.use(express.json());
app.use(cors())

mongoose.connect(process.env.DB_LOCATION as string, {
    autoIndex: true,
})

const formatDatatoSend = (user: IUser) => {
    const access_token = jwt.sign({ id: user._id }, process.env.SECRET_ACCESS_KEY as string, { expiresIn: "1d" })
    return {
        access_token,
        profile_img: user.personal_info.profile_img,
        username: user.personal_info.username,
        fullname: user.personal_info.fullname,
    }
}

const generateUsername = async (email: string) => {
    let username = email.split("@")[0];
    const isUsernameNotUnique = await User.exists({ "personal_info.username": username }).then((result) => result)
    isUsernameNotUnique ? username += nanoid().substring(0, 5) : "";
    return username;
}

app.post("/signup", (req, res) => {
    const { fullname, email, password } = req.body;
    //validating the data from frontend
    if (fullname.length < 3) {
        return res.status(403).json({ error: "Fullname must be at least 3 characters long" })
    }
    if (!email.length) {
        return res.status(403).json({ error: "Email is required" })
    }
    if (!emailRegex.test(email)) {
        return res.status(403).json({ error: "Email is invalid" })

    }
    if (!passwordRegex.test(password)) {
        return res.status(403).json({ error: "Password must be 6 to 20 characters long with a numeric, 1 lowercase and 1 uppercase letters" })
    }

    bcrypt.hash(password, 10, async (err, hashed_password) => {
        if (err) {
            return res.status(500).json({ error: "Internal server error" })
        }

        const username = await generateUsername(email);
        const user = new User({
            personal_info: {
                fullname,
                email,
                password: hashed_password,
                username
            }
        })

        user.save().then((u) => {
            return res.status(200).json(formatDatatoSend(u))
        }).catch((err) => {
            if (err.code === 11000) {
                return res.status(403).json({ error: "Email already exists" })
            }
            return res.status(500).json({ error: err.message })
        })


        // save hash to database
    })
});


app.post("/signin", (req, res) => {
    const { email, password } = req.body;

    User.findOne({ "personal_info.email": email }).then((user) => {
        if (!user) {
            return res.status(403).json({ error: "Email does not exist" })
        }

        bcrypt.compare(password, user.personal_info.password, (err, result) => {
            if (err) {
                return res.status(403).json({ error: "Error occurred while login" })
            }

            if (!result) {
                return res.status(403).json({ error: "Password is incorrect" })
            }


            return res.status(200).json(formatDatatoSend(user))
        })
    }).catch((err) => {
        return res.status(500).json({ error: err.message })
    })
});

app.use((req, res) => {
    res.send("server running👍")
})

app.listen(port, () => {
    console.log(`Application is running on http://localhost:${port}`);
})
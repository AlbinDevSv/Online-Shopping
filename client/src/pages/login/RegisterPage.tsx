import { useState } from "react";
import { Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";

interface userInputsValues {
    account_mail: string;
    first_name: string;
    last_name: string;
    password: string;
}

const RegisterPage = () => {
    const [userInputs, setUserInputs] = useState<userInputsValues>();
    const [errorHandler, setErrorHandler] = useState(false);

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const inputFieldName = e.target.name;
        const inputFieldValue = e.target.value;
        setUserInputs({
            ...userInputs,
            [inputFieldName]: inputFieldValue,
        } as userInputsValues);
    }

    async function handleLogin() {
        await fetch("http://localhost:3000/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(userInputs),
        })
            .then((response) => response.json())
            .then((data) =>
                data === "Wrong user or password"
                    ? console.log("Something went wrong")
                    : window.location.assign(data)
            );
    }

    async function handleFetch(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        console.log("handleFetch");

        await fetch("http://localhost:3000/api/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userInputs),
        })
            .then((response) => response.json())
            .then((data) =>
                data === "User already exist"
                    ? setErrorHandler(true)
                    : handleLogin()
            );
    }
    return (
        <main style={{ marginTop: "140px" }}>
            <div style={{ margin: "auto", width: "80%" }}>
                <form
                    onSubmit={handleFetch}
                    style={{
                        margin: "auto",
                        width: "50%",
                        display: "flex",
                        flexDirection: "column",
                        gap: "20px",
                        position: "relative",
                    }}
                >
                    <h2
                        style={{
                            margin: "auto",
                            width: "50%",
                            textAlign: "center",
                        }}
                    >
                        Create Account
                    </h2>
                    {errorHandler && (
                        <h6
                            style={{
                                margin: "auto",
                                width: "50%",
                                textAlign: "center",
                                color: "red",
                            }}
                        >
                            User Already Exist
                        </h6>
                    )}

                    <label
                        style={{
                            margin: "auto",
                            marginBottom: "-20px",
                            width: "70%",
                        }}
                        htmlFor="userName"
                    >
                        Account Mail:
                    </label>
                    <input
                        required
                        onChange={handleChange}
                        type="email"
                        id="userMail"
                        name="account_mail"
                        style={{
                            margin: "auto",
                            width: "70%",
                        }}
                    />

                    <label
                        style={{
                            margin: "auto",
                            marginBottom: "-20px",
                            width: "70%",
                        }}
                        htmlFor="firstName"
                    >
                        First Name:
                    </label>
                    <input
                        required
                        onChange={handleChange}
                        type="text"
                        id="firstName"
                        name="first_name"
                        style={{
                            margin: "auto",
                            width: "70%",
                        }}
                    />
                    <label
                        style={{
                            margin: "auto",
                            marginBottom: "-20px",
                            width: "70%",
                        }}
                        htmlFor="lastName"
                    >
                        Last Name:
                    </label>
                    <input
                        required
                        onChange={handleChange}
                        type="text"
                        id="lastName"
                        name="last_name"
                        style={{
                            margin: "auto",
                            width: "70%",
                        }}
                    />
                    <label
                        style={{
                            margin: "auto",
                            marginBottom: "-20px",
                            width: "70%",
                        }}
                        htmlFor="password"
                    >
                        Password:
                    </label>
                    <input
                        required
                        onChange={handleChange}
                        type="password"
                        id="password"
                        name="password"
                        style={{
                            margin: "auto",
                            width: "70%",
                        }}
                    />
                    <Button type="submit" style={{ marginTop: "20px" }}>
                        Create
                    </Button>
                </form>
                <p
                    style={{
                        margin: "auto",
                        width: "80%",
                        textAlign: "center",
                        fontSize: "12px",
                    }}
                >
                    Already registered? Login here:{" "}
                    <NavLink to="/login">Login</NavLink>
                </p>
            </div>
        </main>
    );
};

export default RegisterPage;

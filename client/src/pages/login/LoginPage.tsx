import { useState } from "react";
import { Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";

interface userInputsValues {
    account_mail: string;
    first_name: string;
    last_name: string;
    password: string;
}

const LoginPage = () => {
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

    async function handleFetch(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        console.log("handleFetch");

        await fetch("http://localhost:3000/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userInputs),
        })
            .then((response) => response.json())
            .then((data) =>
                data === "Wrong user or password"
                    ? setErrorHandler(true)
                    : window.location.assign(data)
            );
    }
    return (
        <main style={{ marginTop: "140px" }}>
            <form
                onSubmit={handleFetch}
                style={{ margin: "auto", width: "80%" }}
            >
                <div
                    style={{
                        margin: "auto",
                        width: "50%",
                        display: "flex",
                        flexDirection: "column",
                        gap: "20px",
                    }}
                >
                    {errorHandler && (
                        <h6
                            style={{
                                margin: "auto",
                                width: "50%",
                                textAlign: "center",
                                color: "red",
                            }}
                        >
                            Wrong user or password
                        </h6>
                    )}
                    <h2
                        style={{
                            margin: "auto",
                            width: "50%",
                            textAlign: "center",
                        }}
                    >
                        Login
                    </h2>
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
                        name="account_mail"
                        id="userName"
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
                        name="password"
                        id="password"
                        style={{
                            margin: "auto",
                            width: "70%",
                        }}
                    />
                    <Button type="submit" style={{ marginTop: "20px" }}>
                        Login
                    </Button>
                    <p
                        style={{
                            margin: "auto",
                            width: "80%",
                            textAlign: "center",
                            fontSize: "12px",
                        }}
                    >
                        No account? Create account here:{" "}
                        <NavLink to="/register">Register</NavLink>
                    </p>
                </div>
            </form>
        </main>
    );
};

export default LoginPage;

"use server";

export const loginAction = async ({ email, password }: { email: string, password: string }) => {
    try {
        const res = await fetch("http://localhost:3000/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });
        const data = await res.json();
        console.log(data)
        return data
    } catch (error) {
        return error
    }


}
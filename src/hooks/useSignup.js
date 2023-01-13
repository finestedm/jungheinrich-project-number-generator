import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export default function useSignup() {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const { dispatch } = useAuthContext;

    async function signup (email, password) {
        setIsLoading(true)
        setError(null)

        const response = fetch('/api/users/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({email, password})
        })
        console.log(response)
        const json = await response.json()

        if (!response.ok) {
            setIsLoading(false)
            setError(json.error)
        } else if (response.ok) {
            localStorage.setItem('user', JSON.stringify(json))
            dispatch({type: "LOGIN", payload: json})
            setIsLoading(false)
        }
    }

    return {signup, isLoading, error}
}
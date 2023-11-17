import { useState } from "react";
import { auth, googleProvider } from "../config/firebase";
import {
    createUserWithEmailAndPassword,
    signInWithPopup,
    signOut,
} from "firebase/auth";

export const Auth = () => {
    // const [loading, setLoading] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    console.log(auth?.currentUser?.email);

    const signin = async () => {
        // setLoading(true);
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            // setLoading(false);
        } catch (err) {
            console.error(err);
        }
    };

    const signInWithGoogle = async () => {
        // setLoading(true);
        try {
            await signInWithPopup(auth, googleProvider);
            // setLoading(false);
        } catch (err) {
            console.error(err);
        }
    };

    const logout = async () => {
        // setLoading(true);
        try {
            await signOut(auth);
            // setLoading(false);
        } catch (err) {
            console.error(err);
        }
    };

    const classes = "px-4 py-1 rounded-md bg-slate-600 text-white";

    return (
        <div>
            {false ? (
                <div>Loading...</div>
            ) : (
                <div className="flex flex-col gap-3 items-center justify-center">
                    <input
                        className="border"
                        placeholder="Email..."
                        onChange={e => setEmail(e.target.value)}
                    />
                    <input
                        className="border"
                        placeholder="Password..."
                        type="password"
                        onChange={e => setPassword(e.target.value)}
                    />
                    <button className={classes} onClick={signin}>
                        Sign in
                    </button>

                    <button className={classes} onClick={signInWithGoogle}>
                        Sign in with Google
                    </button>
                    <button className={classes} onClick={logout}>
                        Logout
                    </button>
                </div>
            )}
        </div>
    );
};

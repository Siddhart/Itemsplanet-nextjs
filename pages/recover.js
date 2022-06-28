//supabase
import { createClient } from "@supabase/supabase-js";

//supabase variables
const SupabaseURL = "https://apbrajlcunciizanpygs.supabase.co";
const PublicAnonKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYyODcyNDY5NCwiZXhwIjoxOTQ0MzAwNjk0fQ.lzYJfNAfI3Qi58s_hSf9tCief1_bEoRemN7V5mXiARE";

//react components
import { useState } from "react";
import { useCookies } from "react-cookie";

//next components
import { useRouter } from "next/router";

//components
import Nav from "../components/Nav";
import Link from "next/link";

//SEO
import SEO from "../components/SEO";

export default function Recover() {
    const [email, setEmail] = useState("");
    const [showError, setshowError] = useState(false);

    const router = useRouter();

    const supabase = createClient(SupabaseURL, PublicAnonKey);


    async function recoverPassword() {
        let { data, error } = await supabase.auth.api.resetPasswordForEmail(email)

        console.log(data)
        if (data != null) {
            router.push("./signin");
        }else{
            setshowError(true);
        }
    }

    return (
        <>
            <SEO
                seoTitle="Itemsplanet - Forgot Password"
                seoDescription="Browse or search for cool items on our website. We have listed a lot of cool and cheap items."
                seoUrl='https:"//www.itemsplanet.com/signin'
            />
            <div className="container">
                <div className="navcontainer">
                    <Nav />
                </div>

                <div className="auth">
                    <p className="auth-title">Forgot Password</p>
                    <br />
                    <div className="inputfields">
                        <div className="input-with-icon">
                            <i className="fas fa-envelope"></i>
                            <input
                                placeholder="Email"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                }}
                            />
                        </div>
                    </div>
                    <div className="auth-action-button">
                        <button onClick={recoverPassword}>Send email</button>
                    </div>
                    {showError ? <div className="auth-message">
                        <p>Failed to send recovery email!</p>
                    </div> : ""}
                    <div className="already-have-account">
                        <p>
                            <Link href="/">
                                <a>Go back to the homepage</a>
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}

import React from 'react'
import Link from "next/link";
import {XCircle} from "lucide-react";

const SearchFormReset = () => {
    const reset = () => {
        const form = document.querySelector(".search-form") as HTMLFormElement;

        if (form) form.reset()
    }
    return (

        // Reset Button on Search
        <button type="reset" onClick={reset}>
            <Link href="/startups/public" className="search-btn text-white hover:animate-spin">
                <XCircle className="size-5"/>
            </Link>
        </button>
    )
}
export default SearchFormReset

import { cookies } from "next/headers"

export function getlanguage() {
    const cookieStore = cookies()
    const getlang = cookieStore.get('lang')
    const language = getlang?.value || "english"
    return language
}
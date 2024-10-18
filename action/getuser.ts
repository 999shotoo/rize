'use server'
import { auth } from "@clerk/nextjs/server";

export async function getuser() {
    const user = auth();
    return user;
}
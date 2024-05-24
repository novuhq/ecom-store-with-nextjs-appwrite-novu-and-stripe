"use client";
import Link from "next/link";
import { useState } from "react";
import { account } from "@/app/appwrite";
import { useRouter } from "next/navigation";

export default function Login() {
	const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const router = useRouter()

	const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
        await account.createEmailPasswordSession(email, password)
        alert(`Welcome back 🎉`);
        router.push("/admin/dashboard");
    } catch (err) {
        console.error(err);
        alert("Invalid credentials ❌");
    }
	};

	return (
		<main className='w-full min-h-screen flex flex-col items-center justify-center'>
			<h2 className='font-semibold text-3xl mb-4'> Admin Sign in</h2>
			<form className='w-2/3' onSubmit={handleLogin}>
				<label htmlFor='email' className='block'>
					Email
				</label>
				<input
					type='email'
					id='email'
					className='w-full px-4 py-3 border border-gray-400 rounded-sm mb-4'
					required
                    value={email}
                    placeholder="admin@admin.com"
					onChange={(e) => setEmail(e.target.value)}
				/>

				<label htmlFor='password' className='block'>
					Password
				</label>
				<input
					type='password'
					id='password'
					className='w-full px-4 py-3 border border-gray-400 rounded-sm mb-4'
					required
                    value={password}
                    placeholder="admin123"
					onChange={(e) => setPassword(e.target.value)}
				/>
				<button className='p-4 text-lg mb-3 bg-blue-600 text-white w-full rounded-md'>
					Sign in
				</button>
				<p className='text-sm text-center'>
					Not an Admin?{" "}
					<Link href='/login' className='text-blue-500'>
						Sign in as a Customer
					</Link>
				</p>
			</form>
		</main>
	);
}
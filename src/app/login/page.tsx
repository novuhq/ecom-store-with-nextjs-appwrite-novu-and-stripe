"use client";
import { account } from "../appwrite";
import { OAuthProvider } from "appwrite";

export default function Home() {
	
	const handleGitHubSignIn = async () => {
		try {
	        account.createOAuth2Session(
				OAuthProvider.Github,
				"http://localhost:3000",
				"http://localhost:3000/login"
			);
	
		} catch (err) {
			console.error(err);
		}
    };
    
	return (
		<main className='w-full min-h-screen flex flex-col items-center justify-center'>
			<h2 className='font-semibold text-3xl mb-2'>Customer Sign in</h2>
			<p className="mb-4 text-sm text-red-500">You need to sign in before you can make a purchase</p>
			<button
				className='p-4 border-[2px] border-gray-500 rounded-md hover:bg-black hover:text-white w-2/3'
				onClick={() => handleGoogleSignIn()}
			>
				Sign in with GitHub
			</button>
		</main>
	);
}

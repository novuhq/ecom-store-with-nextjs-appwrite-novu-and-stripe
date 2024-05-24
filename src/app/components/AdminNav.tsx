import { account } from "../appwrite";
import Link from "next/link";
import {
	NovuProvider,
	PopoverNotificationCenter,
	NotificationBell,
} from "@novu/notification-center";

export default function AdminNav({
	user,
	setUser,
}: {
	user: User | null;
	setUser: (value: User | null) => void;
	}) {
	
	const handleSignOut = async () => {
		try {
			await account.deleteSession("current");
			setUser(null);
			window.location.reload();
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<nav className='w-full min-h-[10vh] border-b-[1px] px-8 flex items-center justify-between'>
			<Link
				href='/admin/dashboard'
				className='text-2xl text-blue-600  font-semibold'
			>
				Dashboard
			</Link>
			<div className='flex items-center gap-4'>
				<NovuProvider
					subscriberId={process.env.NEXT_PUBLIC_NOVU_SUBSCRIBER_ID!}
					applicationIdentifier={process.env.NEXT_PUBLIC_NOVU_APP_ID!}
				>
					<PopoverNotificationCenter colorScheme='light'>
						{({ unseenCount }) => (
							<NotificationBell unseenCount={unseenCount} />
						)}
					</PopoverNotificationCenter>
				</NovuProvider>

				{user ? (
					<div className='flex items-center gap-5'>
						<p>{user.name}</p>
						<button
							onClick={() => handleSignOut()}
							className='bg-red-500 text-white  py-3 px-5 rounded-sm'
						>
							Sign out
						</button>
					</div>
				) : (
					<Link
						href='/admin/login'
						className='bg-red-500 text-white  py-3 px-5 rounded-sm'
					>
						Sign in
					</Link>
				)}
			</div>
		</nav>
	);
}
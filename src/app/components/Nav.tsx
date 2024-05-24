import Link from "next/link";
import { FaShoppingCart } from "react-icons/fa";
import { account } from "../appwrite";

export default function Nav({
	cart,
	setIsOpen,
	user, setUser
}: {
	cart: Product[];
		setIsOpen: (value: boolean) => void;
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

	const openCart = () => setIsOpen(true);
	return (
		<nav className='bg-[#003285] w-full px-8 py-4 flex items-center justify-between'>
			<Link href='/' className='text-2xl text-white font-semibold'>
				Novu Store
      </Link>
      
			<div className='flex items-center justify-between gap-5'>
				<button className='relative bg-white rounded-lg p-3' onClick={openCart}>
					<FaShoppingCart className='text-red-500 text-2xl' />
					<p className='text-xs font-bold absolute top-[3px] right-[5px]'>
						{cart.length}
					</p>
				</button>

				{user ? (
					<div className='flex items-center gap-5'>
						<p className='text-white'>{user.name}</p>
						<button
							onClick={() => handleSignOut()}
							className='bg-gray-200 hover:bg-white  py-3 px-5 rounded-sm'
						>
							Sign out
						</button>
					</div>
				) : (
					<Link
						href='/login'
						className='bg-gray-200 hover:bg-white  py-3 px-5 rounded-sm'
					>
						Sign in
					</Link>
				)}
			</div>
		</nav>
	);
}
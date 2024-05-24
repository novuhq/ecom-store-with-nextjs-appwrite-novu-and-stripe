"use client";
import Image from "next/image";
import { useState, useEffect, Fragment, useCallback } from "react";
import Nav from "./components/Nav";
import { fetchProducts, sendEmail } from "./utils";
import {
	Dialog,
	DialogTitle,
	Transition,
	DialogPanel,
	TransitionChild,
} from "@headlessui/react";
import { MdDeleteForever } from "react-icons/md";
import { useSearchParams, useRouter } from "next/navigation";
import { account } from "@/app/appwrite";

export default function Home() {
	const [cart, setCart] = useState<Product[]>([]);
	const [products, setProducts] = useState<any[]>([]);
	const [isOpen, setIsOpen] = useState(false);
	const [user, setUser] = useState<User | null>(null);
	const closeModal = () => setIsOpen(false);
	const searchParams = useSearchParams();
	const router = useRouter();

	const addToCart = (product: Product) =>
		setCart((prevCart) => [...prevCart, product]);

	const removeFromCart = (product: Product) =>
		setCart((prevCart) => prevCart.filter((item) => item !== product));

	const calculateTotal = (cart: Product []) =>
		`$${cart.reduce((acc, item) => acc + item.price, 0).toLocaleString()}`;

	useEffect(() => {
		const getProducts = async () => {
			const products = await fetchProducts();
			if (products) {
				setProducts(products);
			}
		};
		getProducts();
	}, []);

	useEffect(() => {
		const checkAuthStatus = async () => {
			try {
				const request = await account.get();
				setUser(request);
			} catch (err) {
				console.log(err);
			}
		};
		checkAuthStatus();
	}, []);

			const checkPaymentStatus = useCallback(async () => {
			if (searchParams.has("success")) {
				const storedCart = localStorage.getItem("cart");
				if (storedCart && user) {
					const soldItems = JSON.parse(storedCart)
					sendEmail(user?.email, user?.name, calculateTotal(soldItems));
				}
			} else if (searchParams.has("canceled")) {
				console.log("Payment canceled");
				}
		},  [searchParams, user]);

	useEffect(() => {
		checkPaymentStatus();
	 }, [checkPaymentStatus]);


	const processPayment = async (cart: Product[]) => {
		try {
			if (user !== null) {
				localStorage.setItem("cart", JSON.stringify(cart));
				const request = await fetch("/api/checkout", {
					method: "POST",
					body: JSON.stringify(cart),
					headers: { "Content-Type": "application/json" },
				});
				const { session } = await request.json();
				window.location.assign(session);
			} else {
				router.push("/login");
			}
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<main>
			<Nav cart={cart} setIsOpen={setIsOpen} user={user} setUser={setUser} />
			<section className=' w-full p-8 flex  items-center flex-wrap gap-5 justify-center'>
				{products.map((product) => (
					<div
						className='lg:w-1/4 w-full h-[350px] rounded-sm bg-gray-100 shadow-md'
						key={product.$id}
					>
						<div className='w-full h-[70%]'>
							<Image
								src={product.image}
								alt='watch'
								className='h-full w-full rounded-md'
								width={300}
								height={300}
							/>
						</div>
						<div className='h-[30%] w-full  p-4'>
							<p className='text-sm text-gray-700 mb-2'>{product.name}</p>
							<div className='w-full flex items-center justify-between'>
								<p className='font-bold'>${product.price.toLocaleString()}</p>
								<button
									disabled={cart.includes(product)}
									onClick={() => addToCart(product)}
									className={`px-4 py-3 ${
										cart.includes(product)
											? "bg-white text-orange-400"
											: "bg-orange-400 text-white"
									}  rounded-md text-sm`}
								>
									{cart.includes(product) ? "Added" : "Add to Cart"}
								</button>
							</div>
						</div>
					</div>
				))}
			</section>

			<div>
				<Transition appear show={isOpen} as={Fragment}>
					<Dialog as='div' className='relative z-10' onClose={closeModal}>
						<TransitionChild
							as={Fragment}
							enter='ease-out duration-300'
							enterFrom='opacity-0'
							enterTo='opacity-100'
							leave='ease-in duration-200'
							leaveFrom='opacity-100'
							leaveTo='opacity-0'
						>
							<div className='fixed inset-0 bg-black/75' />
						</TransitionChild>

						<div className='fixed inset-0 overflow-y-auto'>
							<div className='flex min-h-full items-center justify-center p-4 text-center'>
								<TransitionChild
									as={Fragment}
									enter='ease-out duration-300'
									enterFrom='opacity-0 scale-95'
									enterTo='opacity-100 scale-100'
									leave='ease-in duration-200'
									leaveFrom='opacity-100 scale-100'
									leaveTo='opacity-0 scale-95'
								>
									<DialogPanel className='w-full max-w-xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
										<DialogTitle
											as='h3'
											className='text-lg font-medium leading-6 text-blue-500 mb-3'
										>
											Cart
										</DialogTitle>

										<div>
											{cart.map((product) => (
												<div
													key={product.$id}
													className='w-full flex items-center justify-between mb-2'
												>
													<p className='w-[65%] text-sm opacity-60'>
														{product.name}
													</p>
													<p className='w-[30%]]'>{`$${product.price.toLocaleString()}`}</p>
													<MdDeleteForever
														className='w-[5%] text-3xl text-red-500 cursor-pointer'
														onClick={() => removeFromCart(product)}
													/>
												</div>
											))}
										</div>

										<div className='flex items-center justify-between mt-5'>
											<h3 className='font-semibold text-lg'> TOTAL AMOUNT</h3>
											<h3 className='font-semibold text-lg text-green-500'>
												{calculateTotal(cart)}
											</h3>
										</div>

										<button
											disabled={cart.length === 0}
											className='bg-blue-500 rounded-lg mt-8 text-blue-50 w-full px-4 py-2 text-lg font-semibold'
											onClick={() => processPayment(cart)}
										>
											PAY
										</button>
									</DialogPanel>
								</TransitionChild>
							</div>
						</div>
					</Dialog>
				</Transition>
			</div>
		</main>
	);
}
"use client";
import React, { useState, useRef, useEffect } from "react";
import { MdDeleteForever } from "react-icons/md";
import AdminNav from "@/app/components/AdminNav";
import { createProduct, deleteProduct, fetchProducts } from "@/app/utils";
import { account } from "@/app/appwrite";
import { useRouter } from "next/navigation";

export default function Dashboard() {
	const [showForm, setShowForm] = useState(false);
	const [productTitle, setProductTitle] = useState<string>("");
	const [productImage, setProductImage] = useState<File | null>(null);
	const file = useRef<HTMLInputElement | null>(null);
	const [productPrice, setProductPrice] = useState<string>("");
	const [products, setProducts] = useState<Product[]>([]);
	const handleFormToggle = () => setShowForm(!showForm);
	const [user, setUser] = useState<User | null>(null);
	const router = useRouter();

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			setProductImage(e.target.files[0]);
		}
	};

	const handleAddProduct = (e: React.FormEvent) => {
		e.preventDefault();
		if (Number(productPrice)) {
			createProduct(productTitle, Number(productPrice), productImage);
			setProductPrice("");
			setProductTitle("");
		} else {
			alert("Price must be a number");
		}
	};

	const handleDeleteProduct = async (id: string) => deleteProduct(id);

	useEffect(() => {
		const checkAuthStatus = async () => {
			try {
				const request = await account.get();
				setUser(request);
				const data = await fetchProducts();
				setProducts(data);
			} catch (err) {
				router.replace("/admin/login");
			}
		};
		checkAuthStatus();
	}, [router]);

	return (
		<main className='w-full min-h-screen'>
			<AdminNav user={user} setUser={setUser} />
			<div className='w-full p-8'>
				<section className='w-full flex items-center justify-between mb-4'>
					<h2 className='text-lg font-semibold'>All Products</h2>
					<button
						type='submit'
						onClick={handleFormToggle}
						className={`w -1/4 p-3 ${
							showForm ? "bg-red-400" : "bg-blue-500"
						} rounded-md text-sm text-green-50`}
					>
						{showForm ? "Hide Form" : "Add Product"}
					</button>
				</section>

				{showForm && (
					<form className='w-full' onSubmit={handleAddProduct}>
						<div className='flex items-center w-full gap-3 mb-3'>
							<div className='w-1/3'>
								<label htmlFor='name' className='text-gray-500'>
									Name
								</label>
								<input
									type='text'
									id='name'
									value={productTitle}
									required
									onChange={(e) => setProductTitle(e.target.value)}
									className='px-4 py-2 w-full border-[2px] outline-none rounded-sm'
								/>
							</div>

							<div className='w-1/3'>
								<label htmlFor='price' className='text-gray-500'>
									Price
								</label>
								<input
									type='text'
									id='price'
									value={productPrice}
									required
									onChange={(e) => setProductPrice(e.target.value)}
									className='px-4 py-2 w-full border-[2px] outline-none rounded-sm'
								/>
							</div>

							<div className='w-1/3'>
								<label htmlFor='image' className='text-gray-500'>
									Image
								</label>
								<input
									type='file'
									id='image'
									onChange={handleFileChange}
									ref={file}
									required
									accept='image/png, image/jpeg'
									className='px-4 py-2 w-full border-[2px] outline-none rounded-sm'
								/>
							</div>
						</div>
						<button className='bg-blue-500 rounded-sm text-white px-4 py-3 mb-4'>
							Submit
						</button>
					</form>
				)}

				<div className='w-full mt-6'>
					<table className='w-full border-collapse table-auto'>
						<thead>
							<tr>
								<th>Name</th>
								<th>Price</th>
								<th>Action</th>
							</tr>
						</thead>
						<tbody>
							{products.map((product) => (
								<tr className='text-sm text-gray-500' key={product.$id}>
									<td>{product.name}</td>
									<td>${product.price}</td>
									<td>
										<MdDeleteForever
											className='text-3xl text-red-500 cursor-pointer'
											onClick={() => handleDeleteProduct(product.$id)}
										/>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</main>
	);
}
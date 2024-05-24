import { db, storage } from "@/app/appwrite";
import { ID } from "appwrite";

export const createProduct = async (
	productTitle: string,
	productPrice: number,
	productImage: any
) => {
	try {
		const response = await storage.createFile(
			process.env.NEXT_PUBLIC_BUCKET_ID!,
			ID.unique(),
			productImage
		);

		const file_url = `https://cloud.appwrite.io/v1/storage/buckets/${process.env.NEXT_PUBLIC_BUCKET_ID}/files/${response.$id}/view?project=${process.env.NEXT_PUBLIC_PROJECT_ID}&mode=admin`;
		await db.createDocument(
			process.env.NEXT_PUBLIC_DB_ID!,
			process.env.NEXT_PUBLIC_PRODUCTS_COLLECTION_ID!,
			response.$id,
			{
				name: productTitle,
				price: productPrice,
				image: file_url,
			}
		);
		alert("Product created successfully");
	} catch (err) {
		console.error(err);
	}
};

export const deleteProduct = async (id: string) => { 
	try {
		await db.deleteDocument(
			process.env.NEXT_PUBLIC_DB_ID!,
			process.env.NEXT_PUBLIC_PRODUCTS_COLLECTION_ID!,
			id
		);
		await storage.deleteFile(
			process.env.NEXT_PUBLIC_BUCKET_ID!,
			id
		);

		alert("Product deleted successfully");
	} catch (err) {
		console.error(err);
	}
}

export const fetchProducts = async () => {
	try {
		const products = await db.listDocuments(
			process.env.NEXT_PUBLIC_DB_ID!,
			process.env.NEXT_PUBLIC_PRODUCTS_COLLECTION_ID!
		);
		if (products.documents) {
			return products.documents
		}
	} catch (err) {
		console.error(err);
	}
};

export const sendEmail = async (email: string, name: string, totalAmount: string) => { 
	 try {
        const request = await fetch("/api/send", {
            method: "POST",
            body: JSON.stringify({ email, name, totalAmount }),
        });
        const response = await request.json();
        if (response.success) {
            console.log({ response });
        }
    } catch (err) {
        console.error(err);
    }

}
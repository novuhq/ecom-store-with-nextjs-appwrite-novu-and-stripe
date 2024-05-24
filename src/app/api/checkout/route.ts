import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
	
export async function POST(req: NextRequest) {
	const cart = await req.json();

	try {
		const session = await stripe.checkout.sessions.create({
			payment_method_types: ["card"],
			line_items: cart.map((product: Product) => ({
				price_data: {
					currency: "usd",
					product_data: {
						name: product.name,
					},
					unit_amount: product.price * 100,
				},
				quantity: 1,
			})),
			mode: "payment",
			cancel_url: `http://localhost:3000/?canceled=true`,
			success_url: `http://localhost:3000?success=true&session_id={CHECKOUT_SESSION_ID}`,
		});
		return NextResponse.json({ session: session.url }, { status: 200 });
	} catch (err) {
		return NextResponse.json(
			{ err},
			{ status: 500 }
		);
	}
}


import { NextRequest, NextResponse } from "next/server";
import { Novu } from "@novu/node";

const novu = new Novu(process.env.NOVU_API_KEY!);

export async function POST(req: NextRequest) {
	const { email, name, totalAmount } = await req.json();


	const { data } = await novu.trigger("novu-store", {
            to: {
			subscriberId: process.env.NOVU_SUBSCRIBER_ID!,
			email,
			firstName: name,
            },
            payload: {
				name,
				totalAmount,
				subject: `Purchase Notification from Novu Store`,
				message: `Your purchase of ${totalAmount} was successful! 🎉`

            },
        });
	console.log(data.data)

	return NextResponse.json(
		{
			message: "Purchase Completed!",
			data: { novu: data.data},
			success: true,
		},
		{ status: 200 }
	);
}
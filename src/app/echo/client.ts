import { Echo } from "@novu/echo";
import { renderEmail } from "@/app/emails/email";

interface EchoProps {
	step: any;
	payload: {
		subject: string;
		message: string;
        name: string;
        totalAmount: string;
	}
}
export const echo = new Echo({
	apiKey: process.env.NEXT_PUBLIC_NOVU_API_KEY!,
	devModeBypassAuthentication: process.env.NODE_ENV === "development",
});

echo.workflow(
	"novu-store",
    async ({ step, payload }: EchoProps) => {
        await step.inApp("notify-admin", async () => { 
            return {
               body: `${payload.name} just made a new purchase of ${payload.totalAmount} 🎉`
            }
        })
    
		await step.email(
			"email-customer",
			async () => {
				return {
					subject: `${payload ? payload?.subject : "No Subject"}`,
					body: renderEmail(payload),
				};
			},
			{
				inputSchema: {
					type: "object",
					properties: {}
				},
			}
        );
        
	},
	{
		payloadSchema: {
			type: "object",
			properties: {
				message: { type: "string", default: "Congratulations! Your purchase was successful! 🎉"},
				subject: { type: "string", default: "Message from Newsletter App"},
                name: { type: "string", default: "User" },
                totalAmount: { type: "string", default: "0" }
			},
			required: ["message", "subject", "name", "totalAmount"],
			additionalProperties: false,
		}
	}
);
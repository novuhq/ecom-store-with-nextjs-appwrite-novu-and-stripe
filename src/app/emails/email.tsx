import {
	Body,
	Column,
	Container,
	Head,
	Heading,
	Hr,
	Html,
	Link,
	Preview,
	Section,
	Text,
	Row,
	render,
} from "@react-email/components";
import * as React from "react";

const EmailTemplate = ({
	message,
  subject,
  name
}: {
    message: string;
    subject: string;
   name: string;
}) => (
	<Html>
		<Head />
		<Preview>{subject}</Preview>
		<Body style={main}>
			<Container style={container}>
				<Section style={header}>
					<Row>
						<Column style={headerContent}>
							<Heading style={headerContentTitle}>{subject}</Heading>
						</Column>
					</Row>
				</Section>

        <Section style={content}>
          <Text style={paragraph}>
						Hey {name},
					</Text>
					<Text style={paragraph}>
						{message}
					</Text>
				</Section>
			</Container>

			<Section style={footer}>
				<Text style={footerText}>
					You&apos;re receiving this email because your subscribed to Newsletter App
				</Text>

				<Hr style={footerDivider} />
				<Text style={footerAddress}>
					<strong>Newsletter App</strong>, &copy;{" "}
					<Link href='https://novu.co'>Novu</Link>
				</Text>
			</Section>
		</Body>
	</Html>
);


export function renderEmail(inputs: { message: string; subject: string; name: string}) {
	return render(<EmailTemplate {...inputs} />);
}

const main = {
	backgroundColor: "#f3f3f5",
	fontFamily: "HelveticaNeue,Helvetica,Arial,sans-serif",
};

const headerContent = { padding: "20px 30px 15px" };

const headerContentTitle = {
	color: "#fff",
	fontSize: "27px",
	fontWeight: "bold",
	lineHeight: "27px",
};

const paragraph = {
	fontSize: "15px",
	lineHeight: "21px",
	color: "#3c3f44",
};

const divider = {
	margin: "30px 0",
};

const container = {
	width: "680px",
	maxWidth: "100%",
	margin: "0 auto",
	backgroundColor: "#ffffff",
};

const footer = {
	width: "680px",
	maxWidth: "100%",
	margin: "32px auto 0 auto",
	padding: "0 30px",
};

const content = {
	padding: "30px 30px 40px 30px",
};

const header = {
	borderRadius: "5px 5px 0 0",
	display: "flex",
	flexDireciont: "column",
	backgroundColor: "#2b2d6e",
};

const footerDivider = {
	...divider,
	borderColor: "#d6d8db",
};

const footerText = {
	fontSize: "12px",
	lineHeight: "15px",
	color: "#9199a1",
	margin: "0",
};

const footerLink = {
	display: "inline-block",
	color: "#9199a1",
	textDecoration: "underline",
	fontSize: "12px",
	marginRight: "10px",
	marginBottom: "0",
	marginTop: "8px",
};

const footerAddress = {
	margin: "4px 0",
	fontSize: "12px",
	lineHeight: "15px",
	color: "#9199a1",
};
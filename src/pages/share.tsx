import Button from "@/Components/Button";
import ImageComponent from "@/Components/Image";
import Layout from "@/Components/Layout";
import { useRouter } from "next/router";
import { PrismaClient } from "@prisma/client";
import { getUserProfile } from "@/utils/userProfile";
export default function Share() {
	return (
		<Layout>
			<div>
				<h1>share url</h1>
			</div>
		</Layout>
	);
}

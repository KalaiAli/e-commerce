import { authOptions } from "@/next-auth/authOption";

const handler = authOptions(authOptions);

export { handler as GET, handler as POST };
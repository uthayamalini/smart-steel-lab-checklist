export async function GET() {
    return Response.json({ message: "GET works" });
}

export async function POST(req: Request) {
    return Response.json({ message: "POST works" });
}
import { NextRequest, NextResponse } from "next/server";
import { graphql as graphqlExec } from "graphql";
import { adminSchema } from "../schema/admin-schema";
import { setCorsHeaders } from "@/lib/cors-header";

import { userResolver } from "../resolver/admin/user-resolver";
import { profileResolver } from "../resolver/admin/profile-resolver";

const schema = adminSchema;

const rootValue = {
  ...userResolver,
  ...profileResolver,
};

export async function POST(req: NextRequest) {
  const { query, variables } = await req.json();

  const result = await graphqlExec({
    schema,
    source: query,
    rootValue,
    variableValues: variables,
  });

  const res = NextResponse.json(result);
  setCorsHeaders(res);
  return res;
}

export async function OPTIONS() {
  const res = new NextResponse(null, { status: 204 });
  setCorsHeaders(res);
  return res;
}

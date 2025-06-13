import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import db from "@/lib/db";

async function getTweet(id: number) {
  const tweet = await db.tweet.findUnique({
    where: {
      id,
    },
    include: {
      user: {
        select: {
          username: true,
          avatar: true,
        },
      },
    },
  });

  if (!tweet) {
    redirect("/");
  }

  return tweet;
}

export default async function TweetDetail({
  params,
}: {
  params: { id: string };
}) {
  const session = await getIronSession(cookies(), {
    cookieName: "login-user-session",
    password: process.env.COOKIE_PASSWORD!,
  });

  if (!session.id) {
    redirect("/login");
  }

  const tweet = await getTweet(Number(params.id));

  return (
    <div className="max-w-screen-sm mx-auto p-4">
      <Link
        href="/"
        className="inline-block mb-4 px-4 py-2 border rounded-lg hover:bg-gray-50"
      >
        ← 돌아가기
      </Link>

      <div className="border rounded-lg p-4">
        <div className="flex items-center gap-2 mb-4">
          {tweet.user.avatar ? (
            <img
              src={tweet.user.avatar}
              alt={tweet.user.username}
              className="w-12 h-12 rounded-full"
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-gray-200" />
          )}
          <div>
            <h2 className="font-semibold text-lg">{tweet.user.username}</h2>
            <p className="text-sm text-gray-500">
              {new Date(tweet.createdAt).toLocaleString()}
            </p>
          </div>
        </div>
        <p className="text-gray-800 text-lg">{tweet.text}</p>
      </div>
    </div>
  );
}

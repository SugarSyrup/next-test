import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import db from "@/lib/db";

async function getTweets(page: number) {
  const tweets = await db.tweet.findMany({
    take: 10,
    skip: (page - 1) * 10,
    orderBy: {
      createdAt: "desc",
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

  const totalTweets = await db.tweet.count();
  const totalPages = Math.ceil(totalTweets / 10);

  return {
    tweets,
    totalPages,
  };
}

export default async function Home({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const session = await getIronSession(cookies(), {
    cookieName: "login-user-session",
    password: process.env.COOKIE_PASSWORD!,
  });

  if (!session.id) {
    redirect("/login");
  }

  const page = Number(searchParams.page) || 1;
  const { tweets, totalPages } = await getTweets(page);

  return (
    <div className="max-w-screen-sm mx-auto p-4">
      <div className="flex flex-col gap-4">
        {tweets.map((tweet) => (
          <Link
            key={tweet.id}
            href={`/tweets/${tweet.id}`}
            className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-2 mb-2">
              {tweet.user.avatar ? (
                <img
                  src={tweet.user.avatar}
                  alt={tweet.user.username}
                  className="w-8 h-8 rounded-full"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-gray-200" />
              )}
              <span className="font-semibold">{tweet.user.username}</span>
            </div>
            <p className="text-gray-800">{tweet.text}</p>
            <p className="text-sm text-gray-500 mt-2">
              {new Date(tweet.createdAt).toLocaleString()}
            </p>
          </Link>
        ))}
      </div>

      <div className="flex justify-center gap-4 mt-8">
        {page > 1 && (
          <Link
            href={`/?page=${page - 1}`}
            className="px-4 py-2 border rounded-lg hover:bg-gray-50"
          >
            ← 이전
          </Link>
        )}
        {page < totalPages && (
          <Link
            href={`/?page=${page + 1}`}
            className="px-4 py-2 border rounded-lg hover:bg-gray-50"
          >
            다음 →
          </Link>
        )}
      </div>
    </div>
  );
}

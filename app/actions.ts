"use server";

import { z } from "zod";

export interface LoginState {
  message?: string;
  success?: boolean;
  errors?: {
    email?: string;
    username?: string;
    password?: string;
  };
}

// Zod 스키마 정의
const loginSchema = z.object({
  email: z
    .string()
    .email("올바른 이메일 형식이 아닙니다")
    .refine((email) => email.endsWith("@zod.com"), {
      message: "오직 @zod.com 이메일만 허용됩니다",
    }),
  username: z.string().min(5, "사용자명은 최소 5글자 이상이어야 합니다"),
  password: z
    .string()
    .min(10, "비밀번호는 최소 10글자 이상이어야 합니다")
    .regex(/\d/, "비밀번호는 최소 1개 이상의 숫자를 포함해야 합니다"),
});

export async function loginAction(
  prevState: LoginState,
  formData: FormData
): Promise<LoginState> {
  const email = formData.get("email") as string;
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  // Zod를 사용한 폼 검증
  const result = loginSchema.safeParse({
    email,
    username,
    password,
  });

  if (!result.success) {
    // 검증 실패 시 에러 메시지 반환
    const fieldErrors: { [key: string]: string } = {};

    result.error.errors.forEach((error) => {
      if (error.path[0]) {
        fieldErrors[error.path[0] as string] = error.message;
      }
    });

    return {
      success: false,
      errors: {
        email: fieldErrors.email,
        username: fieldErrors.username,
        password: fieldErrors.password,
      },
    };
  }

  // 모든 검증 통과
  return {
    success: true,
    message: "Welcome back!",
  };
}

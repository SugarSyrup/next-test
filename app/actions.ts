"use server";

export interface LoginState {
  message?: string;
  success?: boolean;
  errors?: {
    email?: string;
    username?: string;
    password?: string;
  };
}

export async function loginAction(
  prevState: LoginState,
  formData: FormData
): Promise<LoginState> {
  const email = formData.get("email") as string;
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  // 이메일 형식 검증
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return {
      success: false,
      errors: {
        email: "Please enter a valid email address",
      },
    };
  }

  // username 검증 (아무 username이나 허용하되 빈 값은 안됨)
  if (!username || username.trim() === "") {
    return {
      success: false,
      errors: {
        username: "Username is required",
      },
    };
  }

  // password 검증 (12345만 허용)
  if (password !== "12345") {
    return {
      success: false,
      message: "Wrong password",
    };
  }

  // 모든 검증 통과
  return {
    success: true,
    message: "Welcome back!",
  };
}

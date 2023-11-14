"use client";

import { NextPage } from "next";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import styled from "styled-components";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

type LoginFormValues = {
  userId: string;
  password: string;
};

const ErrorMessage = styled.div`
  font-size: 10pt;
  color: red;
`;

const LoginPage: NextPage = ({}) => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [isLoginFailed, setLoginFailed] = useState(false);
  const router = useRouter();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<LoginFormValues>({
    mode: `onSubmit`,
    reValidateMode: "onSubmit",
  });

  const handleChangeUserId = (e) => {
    setLoginFailed(false);
    setUserId(e.target.value);
  };

  const handleChangePassword = (e) => {
    setLoginFailed(false);
    setPassword(e.target.value);
  };

  const onSubmit: SubmitHandler<LoginFormValues> = async (data) => {
    const result = await signIn("credentials", {
      userId: data.userId,
      password: data.password,
      redirect: false,
    });

    if (result?.error) {
      console.error("ログインエラー:", result.error);
      setLoginFailed(true);
    } else {
      router.push("/weather");
    }
  };

  return (
    <>
      <h1>ログインページ</h1>
      {isLoginFailed && <ErrorMessage>認証に失敗しました</ErrorMessage>}

      <div>
        <label>ユーザーID</label>
        <input
          id="userId"
          type="text"
          value={userId}
          {...register("userId", {
            required: { value: true, message: "ユーザIDは必須です" },
          })}
          onChange={handleChangeUserId}
        />
        {errors.userId && <ErrorMessage>{errors.userId?.message}</ErrorMessage>}

        <label htmlFor="password">パスワード</label>
        <input
          id="password"
          type="password"
          value={password}
          {...register("password", {
            required: { value: true, message: "パスワードは必須です" },
            maxLength: {
              value: 8,
              message: "パスワードは8文字以下で入力してください",
            },
          })}
          onChange={handleChangePassword}
        />
        {errors.password && (
          <ErrorMessage>{errors.password?.message}</ErrorMessage>
        )}
      </div>
      <button style={{ marginRight: 10 }} onClick={handleSubmit(onSubmit)}>
        Sign In
      </button>
    </>
  );
};

export default LoginPage;

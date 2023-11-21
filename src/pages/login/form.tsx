import { Form, Input, Button, Space } from '@arco-design/web-react';
import { FormInstance } from '@arco-design/web-react/es/Form';
import { IconLock, IconUser } from '@arco-design/web-react/icon';
import React, { useEffect, useRef, useState } from 'react';
import useStorage from '@/utils/useStorage';
import useLocale from '@/utils/useLocale';
import locale from './locale';
import styles from './style/index.module.less';
import { getDiCtData,  userLogin } from '@/request/api';
import {
  setToken,
  setLocalUser,
  setLocalDictData,
} from '@/utils/function';
import Router from "next/router";

export default function LoginForm() {
  const formRef = useRef<FormInstance>();
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [loginParams, setLoginParams, removeLoginParams] =
    useStorage('loginParams');

  const t = useLocale(locale);

  const [rememberPassword, setRememberPassword] = useState(!!loginParams);

  function afterLoginSuccess(params) {
    // 记住密码
    if (rememberPassword) {
      setLoginParams(JSON.stringify(params));
    } else {
      removeLoginParams();
    }
    // 记录登录状态
    localStorage.setItem('userStatus', 'login');
    // 跳转首页
    Router.push('/dashboard/workplace');
  }

  function login(params) {
    setErrorMessage('');
    setLoading(true);
    userLogin(params).then(async (res) => {
      const { code, msg, data } = res;
      setToken(data?.token);

      if (code == 200) {
        //init dict data
        const res3 = await getDiCtData();
        if (res3?.code !== 200) {
          setErrorMessage(res3?.code || t['login.form.login.errMsg']);
          return false;
        }

        setLocalUser({ username: params.userName });
        afterLoginSuccess(params);
        setLocalDictData(res3?.data);
        setLoading(false);
      } else {
        setErrorMessage(msg || t['login.form.login.errMsg']);
        setLoading(false);
      }
    });
  }

  function onSubmitClick() {
    formRef.current.validate().then((values) => {
      login(values);
    });
  }

  // 读取 localStorage，设置初始值
  useEffect(() => {
    const rememberPassword = !!loginParams;
    setRememberPassword(rememberPassword);
    if (formRef.current && rememberPassword) {
      const parseParams = JSON.parse(loginParams);
      formRef.current.setFieldsValue(parseParams);
    }
  }, [loginParams]);

  return (
    <div className={styles['login-form-wrapper']}>
      <div className={styles['login-form-title']}>{t['login.form.title']}</div>
      {/*<div className={styles['login-form-sub-title']}>*/}
      {/*  {t['login.form.title']}*/}
      {/*</div>*/}
      <div className={styles['login-form-error-msg']}>{errorMessage}</div>
      <Form
        className={styles['login-form']}
        layout="vertical"
        ref={formRef}
        initialValues={{ userName: '', password: '' }}
      >
        <Form.Item
          field="userName"
          rules={[{ required: true, message: t['login.form.userName.errMsg'] }]}
        >
          <Input
            prefix={<IconUser />}
            // placeholder={t['login.form.userName.placeholder']}
            onPressEnter={onSubmitClick}
          />
        </Form.Item>
        <Form.Item
          field="password"
          rules={[{ required: true, message: t['login.form.password.errMsg'] }]}
        >
          <Input.Password
            prefix={<IconLock />}
            // placeholder={t['login.form.password.placeholder']}
            onPressEnter={onSubmitClick}
          />
        </Form.Item>
        <Space size={16} direction="vertical">
          {/*<div className={styles['login-form-password-actions']}>*/}
          {/*  <Checkbox checked={rememberPassword} onChange={setRememberPassword}>*/}
          {/*    {t['login.form.rememberPassword']}*/}
          {/*  </Checkbox>*/}
          {/*  <Link>{t['login.form.forgetPassword']}</Link>*/}
          {/*</div>*/}
          <Button type="primary" long onClick={onSubmitClick} loading={loading}>
            {t['login.form.login']}
          </Button>
          {/*<Button*/}
          {/*  type="primary"*/}
          {/*  long*/}
          {/*  className={styles['login-form-register-btn']}*/}
          {/*>*/}
          {/*  {t['login.form.register']}*/}
          {/*</Button>*/}
        </Space>
      </Form>
    </div>
  );
}

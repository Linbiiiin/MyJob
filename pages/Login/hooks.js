import {useCallback, useEffect} from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Toast from 'react-native-toast-message'
import globalRouter from '../../contants/globalRouter';

// 使用 Zod 定义表单验证规则
const loginSchema = z.object({
  username: z.string({
    required_error: '用户名不能为空'
  })
    .regex(/^(\+\d{1,3}[- ]?)?\d{10}$/, { message: '请输入正确的手机号' })
    .or(z.string().email({ message: '请输入有效的邮箱地址' }))
    .or(z.string().min(6, { message: '用户名至少6位' })),
  password: z.string({
    required_error: '密码不能为空'
  }).min(6, { message: '密码至少6位' }),
});

export const useLogin = (props) => {
  const { navigation } = props;
  const form = useForm({
    resolver: zodResolver(loginSchema),
  });
  const { trigger, formState, getValues } = form;

  const { errors } = formState;
  const onErrorTip = useCallback(() => {
    const { username, password } = errors;
    const error = username || password;

    if (error?.message) {
      Toast.show({
        type: 'error',
        text1: `${error.message}`,
        text2: '',
      });
    }
  }, [errors]);
  const onLogin = useCallback(async () => {
    const isValid = await trigger();


    if (!isValid) {
      return;
    }
    Toast.hide();
    const body = getValues();

    Toast.show({
      type: 'success',
      text1: '登录成功',
    });
    navigation.reset({
      index: 0,
      routes: [{ name: globalRouter.main }], // 设置新的首页为 Home
    });
  }, [trigger, getValues, navigation]);

  useEffect(() => {
    onErrorTip();
  }, [onErrorTip]);

  return {
    onLogin,
    form,
  };
};

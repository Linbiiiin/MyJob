import React from 'react';
import { StyleSheet, TextInput, View, Text, Button, Pressable } from 'react-native';
import { Controller } from 'react-hook-form';

import globalStyles from '../../contants/globalStyles';
import { useLogin } from './hooks';

const Login = (props) => {
  const { onLogin, form } = useLogin(props);
  const {
    control,
  } = form;

  return (
    <View style={styles.login}>
      <View style={styles.container}>
        <View style={styles.formContainer}>
          <Controller
            control={control}
            name="username"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="请输入手机号/用户名/邮箱"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                style={styles.accountInput}
              />
            )}
          />

          {/* 密码输入框 */}
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, onBlur, value } }) => (
              <View style={styles.passwordStyle}>
                <TextInput
                  placeholder="密码"
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  secureTextEntry
                  style={styles.passwordInput}
                />
                <Text style={styles.findPassword}>忘记密码？</Text>
              </View>
            )}
          />

          <Pressable style={styles.loginBtn} onPress={onLogin}>
            <Text style={styles.loginBtnText}>登 录</Text>
          </Pressable>
        </View>
        <View style={styles.smsLogin} />
        <View style={styles.register} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  login: {},
  container: {
    paddingTop: 140,
  },
  accountInput: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 16,
    fontSize: globalStyles.fontSize.s16,
    borderBottomWidth: 1,
    borderColor: globalStyles.color.gray,
    backgroundColor: 'transparent',
  },
  passwordStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: 16,
    fontSize: globalStyles.fontSize.s16,
    borderBottomWidth: 1,
    borderColor: globalStyles.color.gray,
    backgroundColor: 'transparent',
  },
  passwordInput: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: globalStyles.fontSize.s16,
  },
  findPassword: {
    fontSize: globalStyles.fontSize.s14,
    color: globalStyles.color.main,
  },
  formContainer: {
    paddingHorizontal: 32,
  },
  loginBtn: {
    padding: 12,
    marginTop: 30,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: globalStyles.color.blue,
  },
  loginBtnText: {
    textAlign: 'center',
    fontSize: globalStyles.fontSize.s18,
    color: '#fff',
  },
});

export default Login;

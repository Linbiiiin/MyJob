/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useCallback, useMemo } from 'react';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Toast from 'react-native-toast-message';

import Icon from './components/Icon';
import globalRouter from './contants/globalRouter';

import Home from './pages/Home';
import Square from './pages/Square';
import Mine from './pages/Mine';
import ChatMessage from './pages/ChatMessage';
import Login from './pages/Login';
import PartTimeInformation from './pages/PartTimeInformation';
import CompanyInformation from './pages/CompanyInformation';
import MineCurriculumVitae from './pages/MineCurriculumVitae';
import ChatWindow from './pages/ChatWindow';

const Tab = createBottomTabNavigator();

const Stack = createNativeStackNavigator();


const Main = () => {
  // const { route } = props;
  // const defaultMainTab = useMemo(() => {
  //   return route?.params?.screen || '/home';
  // }, [route]);
  const insets = useSafeAreaInsets();

  // const safeAreaStyle = useMemo(() => {
  //   return {
  //     flex: 1,
  //     // Paddings to handle safe area
  //     paddingTop: insets.top,
  //     paddingBottom: insets.bottom,
  //     paddingLeft: insets.left,
  //     paddingRight: insets.right,
  //   };
  // }, [insets]);
  const screenOptions = useMemo(() => ({
    tabBarStyle: {
      height: 60 + insets.bottom,
      paddingTop: 4,
      paddingBottom: 10 + insets.bottom,
    },
    // elevation: 0, // Android: 隐藏下边框的阴影
    // shadowOpacity: 0, // iOS: 隐藏下边框的阴影
    // borderBottomWidth: 0, // 确保没有边框
  }), [insets.bottom]);
  const genTabConfig = ({ label, icon, title, headerShown = false, ...rest }) => ({
    ...rest,
    tabBarLabel: label,
    headerShown,
    title,
    tabBarIcon: ({ color, size }) => {
      return (
        <Icon name={icon} color={color} size={size} />
      );
    },
  });

  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen name={globalRouter.home} component={Home} options={genTabConfig({ label: '首页', icon: 'home' })} />
      <Tab.Screen
        name={globalRouter.square}
        component={Square}
        options={genTabConfig({
          label: '兼职广场',
          icon: 'plaza',
        })} />
      <Tab.Screen
        name={globalRouter.chat_message}
        component={ChatMessage}
        options={genTabConfig({
          label: '消息',
          icon: 'chat',
          headerShown: true,
          title: '消息',
          headerStyle: {
            elevation: 0, // Android
            shadowOpacity: 0, // iOS
            borderBottomWidth: 0, // 确保边框完全隐藏
          },
        })} />
      <Tab.Screen name={globalRouter.mine} component={Mine} options={genTabConfig({ label: '我的', icon: 'mine' })}  />
    </Tab.Navigator>
  );
};
const App = () => {
  const navigation = useNavigation();
  const headerBaseConfig = (params) => {
    const { title } = params || {};

    return {
      headerBackTitleVisible: false,
      headerTitleAlign: 'center',
      headerShown: true,
      contentStyle: {},
      headerTitle: title,
      headerTintColor: '#000', // 设置返回按钮颜色
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginLeft: -10 }}>
          <Icon name="back" size={26} color="#000" />
        </TouchableOpacity>
      ),
    };
  };
  const screenOptions = {
    headerShown: false,  // 可选择是否显示头部
    contentStyle: styles.container,  // 默认安全区域
  };

  return (
    <Stack.Navigator
      initialRouteName={globalRouter.main}
      screenOptions={screenOptions}
    >
      <Stack.Screen name={globalRouter.main} component={Main} />
      <Stack.Screen name={globalRouter.part_time_information} component={PartTimeInformation} options={headerBaseConfig({ title: '职位详情' })} />
      <Stack.Screen name={globalRouter.company_info} component={CompanyInformation} options={headerBaseConfig({ title: '公司主页' })} />
      <Stack.Screen name={globalRouter.login} component={Login} options={{ headerTitle: '' }} />
      <Stack.Screen name={globalRouter.mine_curriculum_vitae} component={MineCurriculumVitae} options={headerBaseConfig({ title: '公司主页' })} />
      <Stack.Screen name={globalRouter.chat_window} component={ChatWindow} options={headerBaseConfig()} />
    </Stack.Navigator>
  );
};


const SafeAreaContainer = () => {

  return (
    <SafeAreaProvider style={styles.container}>
      <GestureHandlerRootView style={styles.container}>
        <NavigationContainer style={styles.container}>
          <App />
          <Toast />
        </NavigationContainer>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default SafeAreaContainer;

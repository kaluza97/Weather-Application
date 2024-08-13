import React, { FC } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { WeatherDataInterface } from '@components/WeatherSearchForm/types';
import { styles } from '@components/Cards/styles';
import { colors } from '@constants/global.styles';

interface SwipeableItemProps {
  item: WeatherDataInterface;
  onRemove: (id: number) => void;
}

const SwipeableItem: FC<SwipeableItemProps> = ({ item, onRemove }) => {
  const navigation =
    useNavigation<
      NativeStackNavigationProp<{ Details: { weatherData: WeatherDataInterface } }>
    >();
  const pressed = useSharedValue<boolean>(false);
  const offset = useSharedValue<number>(0);
  const swipeSensivity: number = 300;

  const pan = Gesture.Pan()
    .onBegin(() => {
      pressed.value = true;
    })
    .onChange(event => {
      offset.value = event.translationX;
    })
    .onEnd(() => {
      if (Math.abs(offset.value) > swipeSensivity) {
        runOnJS(onRemove)(item.id);
      } else {
        offset.value = withSpring(0);
      }
      pressed.value = false;
    });

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ translateX: offset.value }],
    backgroundColor: pressed.value ? colors.primaryColorShadow : colors.primaryColor,
  }));

  const handlePress = (item: WeatherDataInterface): void => {
    navigation.navigate('Details', { weatherData: item });
  };

  return (
    <GestureDetector gesture={pan}>
      <Animated.View style={[animatedStyles, styles.container]}>
        <TouchableOpacity
          onPress={() => handlePress(item)}
          style={styles.touchableOpacity}>
          <View>
            <View style={styles.header}>
              <Icon name="map-marker" style={styles.icon} />
              <Text style={styles.city}>{item.name}</Text>
            </View>
            <Text style={styles.description}>
              {item.weather[0].description}
            </Text>
            <Text style={styles.temperature}>{item.main.temp}°C</Text>
          </View>
          <Image
            source={{
              uri: `https://openweathermap.org/img/wn/${item.weather[0].icon}.png`,
              width: 100,
              height: 100,
            }}
          />
        </TouchableOpacity>
      </Animated.View>
    </GestureDetector>
  );
};

export default SwipeableItem;

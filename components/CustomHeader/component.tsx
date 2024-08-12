import React, { FC } from 'react';
import { View, Text } from 'react-native';
import { Props } from './types';
import { styles } from './styles';

const CustomHeader: FC<Props> = ({ title }) => (
  <View style={styles.container}>
    <Text style={styles.text}>{title}</Text>
  </View>
);

export default CustomHeader;

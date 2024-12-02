import {Text, View} from 'react-native';
import React, {Component} from 'react';
import type {PropsWithChildren} from 'react';
import Icons from 'react-native-vector-icons/FontAwesome';


//defining prop for Icons
type IconProps = PropsWithChildren<{
  name: string;
}>;

const Icon = ({name}: IconProps) => {
  switch (name) {
    case 'cross':
        return <Icons 
        name='circle-thin'
        color='#'
        size={34} />
        break;
    case 'circle': 
        <Icons 
        name='times'
        color='#'
        size={34}
        />
        break; 
    default:
        <Icons 
        name='pencil'
        color='#'
        size={34}
        />
        break;
  }
};

export default Icon;

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
      return <Icons name="times" color="#FE0000" size={38} />;
    case 'circle':
      return <Icons name="circle-thin" color="#00FF40" size={38} />;
    default:
      return <Icons name="pencil" color="#ffffff" size={38} />;
  }
};

export default Icon;

import React from 'react';
import { GlobalImports } from '../config/globalImports';
import {SkypeIndicator} from 'react-native-indicators';

export default function GlobalLoader(props) {
  return (
    <SkypeIndicator
      style={{
        width: GlobalImports.wp2(100),
        height: GlobalImports.hp2(100),
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      color={'white'}
    />
  );
}

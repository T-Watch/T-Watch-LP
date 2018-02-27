import React from 'react';
import { AutoComplete } from 'antd';
import './Search.css';

const dataSource = ['Maria Losada', 
'Nuria Outeiral', 'Brais Piñeiro', 'Martin Paz', 'Hector González', 'Raúl Iglesias'];

export default class Search extends React.Component { // cuadro azul

      render() {
        return (
          <AutoComplete
            style={{ width: 200 }}
            dataSource={dataSource}
            placeholder="Ej.: Maria Losada"
            filterOption={
              (inputValue, option: any) => option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
            }
          />
        );
      }
    
}
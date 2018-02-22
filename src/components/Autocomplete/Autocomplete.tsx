import React from 'react';
import { AutoComplete } from 'antd';
import './Autocomplete.css';

function onSelect(value: string) {
    console.log('onSelect', value);
  }

export default class Autocomplete extends React.Component { // cuadro azul

    state = {
        dataSource: [],
      };
    
      handleSearch = (value: string) => {
        this.setState({
          dataSource: !value ? [] : [
            value,
            value + value,
            value + value + value,
          ],
        });
      }
    
      render() {
        const { dataSource } = this.state;
        return (
          <AutoComplete
            dataSource={dataSource}    
               />
        );
      }
    
}
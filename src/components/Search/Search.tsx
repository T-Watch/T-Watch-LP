import React from 'react';
import {  Input } from 'antd';

const SearchInput = Input.Search;

export default class Search extends React.Component {
  render() {
    return (
        <SearchInput
          placeholder="Maria Losada or Vigo"
          onSearch={value => console.log(value)}
          style={{ width: 400 }}
        />
    );
  }
}
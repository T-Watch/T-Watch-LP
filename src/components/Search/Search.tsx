import React from 'react';
import {  Input } from 'antd';

interface SearchProps {
  onSearchResult: Function;
}
const SearchInput = Input.Search;

export default class Search extends React.Component<SearchProps,
any> {
  constructor(props: SearchProps) {
    super(props);
  }

  handleSearch = (value: any) => {  
    console.log('onSelect', value);
    this.props.onSearchResult(value);
  }

  render() {
    return (
        <SearchInput
          placeholder="Maria Losada or Vigo"
          onSearch={this.handleSearch}
          style={{ width: 400 }}
        />
    );
  }
}
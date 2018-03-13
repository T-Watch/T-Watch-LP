// De aqui le paso el lugar o nombre a showCards. Y alli muestro las que sean
// Arreglar lo de que no salgan dos i
import React from 'react';
import { AutoComplete, Input, Button, Icon, Select } from 'antd';
import './AutocompleteSearch.css';
const Option = AutoComplete.Option;
const OptGroup = AutoComplete.OptGroup;

const dataBase =  [{
  id: 'maria',
  name: 'maria',
  location: 'Ourense'
},
{
  id: 'nuria',
  name: 'nuria',
  location: 'Coruña'
},
{
  id: 'brais',
  name: 'brais',
  location: 'Coruña'
},
{
  id: 'martin',
  name: 'martin',
  location: 'Ourense'
},
];

interface SearchState {
  dataSource: object[];
}
interface SearchProps {
  onSearchResult: Function;
}

function searchResult(query: string, dataSource: any) {
  const result = [];
  query = query.toLowerCase();
  for (let x of dataBase) {
    if (x !== undefined) {
      if (x.name.toLowerCase().startsWith(query)) {
        result.push(x);
      }
    }
   
  }
  return result;
}

function renderOptionName(item: any) {
  return(
  
     item.name
  );
  }
export default class AutoCompleteSearch extends React.Component<SearchProps,
SearchState> { 

  constructor(props: SearchProps) {
    super(props);
    this.state = {
        dataSource: [{
          id: 'maria',
          name: 'maria',
          location: 'Ourense'
        },
        {
          id: 'nuria',
          name: 'nuria',
          location: 'Coruña'
        },
        {
          id: 'brais',
          name: 'brais',
          location: 'Coruña'
        },
        {
          id: 'martin',
          name: 'martin',
          location: 'Ourense'
        },

      ],
    };
  }

  onSelect = (value: any) => {  
    console.log('onSelect', value);
    this.props.onSearchResult(value);
  }

  handleSearch = (value: any) => {
    const dataSource = this.state.dataSource;
    this.setState({
      dataSource:  searchResult(value, dataSource),
    });
  }
  render() {

    const dataSource = this.state.dataSource;
    return (
      <div className="global-search-wrapper" style={{ width: 300 }}>
        <AutoComplete
            className="global-search"
            size="large"
            style={{ width: '100%' }}
            dataSource={(dataSource).map(renderOptionName)}
            onSelect={this.onSelect}
            onSearch={this.handleSearch}
            placeholder="Maria Losada or Vigo"
            optionLabelProp="text"
        >
          <Input
            suffix={(
              <Button className="search-btn" size="large" type="primary">
                <Icon type="search" />
              </Button>
            )}
          />
        </AutoComplete>
      </div>
    );
  }
}
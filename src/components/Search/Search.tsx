// De aqui le paso el lugar o nombre a showCards. Y alli muestro las que sean
// Arreglar lo de que no salgan dos i
import React from 'react';
import { AutoComplete, Input, Button, Icon, Select } from 'antd';
import './Search.css';
const Option = AutoComplete.Option;

const dataBase = [{
  id: 'maria',
  name: 'maria',
  location: 'Ourense'
},
{
  id: 'nuria',
  name: 'nuria',
  location: 'Coruña'
},
,
{
  id: 'brais',
  name: 'brais',
  location: 'Coruña'
},
,
{
  id: 'martin',
  name: 'martin',
  location: 'Ourense'
},

];
function onSelect(value: any) {
  
  console.log('onSelect', value);
}
function getRandomInt(max: number, min: number = 0) {
  return Math.floor(Math.random() * (max - min + 1)) + min; // eslint-disable-line no-mixed-operators
}
function searchResult(query: string) {
  const result = [];
  let locationIsAdded = false;
  query = query.toLowerCase();
  for (let x of dataBase) {
    if (x !== undefined) {
      if  (x.name.toLowerCase().startsWith(query)) {
        result.push(x);
      }
      if (x.location.toLowerCase().startsWith(query) && !locationIsAdded) {
        result.push(x);
        locationIsAdded = true;
      }
    }
   
  }
  console.log(result);

  return result;
}

function renderOptionLocation(item: any) {
return(

      <Option key={item.location} value={item.location}>
        {item.location}
      </Option>
);
}

function renderOptionName(item: any) {
  return(
  
        <Option key={item.name} value={item.name}>
          {item.name}
        </Option>
  );
  }
export default class Search extends React.Component { // cuadro azul

  constructor(props: any) {
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
      ],
    };
  }
  handleSearch = (value: any) => {
    console.log(value);
    this.setState({
      dataSource: value !== undefined ? searchResult(value) : [],
    });
  }
  render() {
    const  {dataSource}  = this.state;
    return (
      <div className="global-search-wrapper" style={{ width: 300 }}>
        <AutoComplete
            className="global-search"
            size="large"
            style={{ width: '100%' }}
            dataSource={dataSource.map(renderOptionLocation).concat(dataSource.map(renderOptionName))}
            onSelect={onSelect}
            onSearch={this.handleSearch}
            placeholder="input here"
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
import React, { Component } from 'react'
import { getCollection } from '../firebase/collectionFuntion';
import { RouteComponentProps } from 'react-router-dom';

export class Collections extends Component {
  public props!: RouteComponentProps<{colName: string}>;
  public state = {
    collectionData: null
  }

  async initialize() {
    let collectionName = this.props.match.params.colName;
    const collectionData = await getCollection(collectionName);
    this.setState({
      collectionData
    })
  }

  componentDidMount() {
    this.initialize();
  }

  render() {
    const list = this.state.collectionData ? 
    (JSON.stringify(this.state.collectionData)) : (<h5>올바르지 않은 콜렉션 이름입니다</h5>);

    console.log(typeof(this.state.collectionData));
    return(
      <div className="collections">
        {list}
      </div>
    );
  }
}

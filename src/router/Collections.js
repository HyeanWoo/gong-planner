import React, { Component } from 'react'
import { getCollection } from '../firebase/collectionFuntion';

class Collections extends Component {
  state = {
    collectionData: null
  }

  async initialize() {
    let collectionName = this.props.match.params.col_name;
    const collectionData = await getCollection(collectionName);
    this.setState({
      collectionData
    })
  }

  componentDidMount() {
    this.initialize();
  }

  render() {
    const list = this.state.collectionData ? (JSON.stringify(this.state.collectionData)
      ) : (<h5>올바르지 않은 콜렉션 이름입니다</h5>);
    return(
      <div className="collections">
        {list}
      </div>
    );
  }
}

export default Collections;
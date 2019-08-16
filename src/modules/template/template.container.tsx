import * as React from 'react';
import './template.css';
import {} from 'rxjs';
import {} from 'rxjs/operators';

class HomePage extends React.Component<{}, IState> {
  constructor(props: any) {
    super(props);
    this.state = {};
  }
  componentDidMount() {}
  render() {
    return <div className={'container'} />;
  }
}

const styles: { [key: string]: React.CSSProperties } = {};

interface IState {}
export default HomePage;

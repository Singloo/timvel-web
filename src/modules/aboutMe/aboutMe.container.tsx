import * as React from 'react';
import './aboutMe.css';
import service from './aboutMe.service';
import {} from 'rxjs';
import {} from 'rxjs/operators';
import { IStyle } from '../../models';
import { Icon } from 'antd';
const ZhMd = require('./assets/me_zh.md');
const EnMd = require('./assets/me_en.md');
const capitalFirstChar = (str: string) =>
  str.replace(/^\w/, e => e.toUpperCase());
const getSelectText = () => {
  const obj = window.getSelection();
  if (!obj) return;
  const selectedText = obj!.toString();
  return {
    selection: obj,
    start: Math.min(obj.anchorOffset, obj.focusOffset),
    end: Math.max(obj.anchorOffset, obj.focusOffset),
    selectedText,
  };
};
const HIDDEN_TEXT = '你要干嘛啊???';
const DISPLAY_TEXT = '████████';
class HomePage extends React.Component<{}, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      lang: 'zh',
      md: undefined,
      selectStart: 0,
      selectEnd: 0,
    };
  }
  componentDidMount() {
    this._queryMd('zh');
    const elm = document.getElementById('phone-number') as HTMLDivElement;
    elm.onmousemove = this._onSelectPhoneNumber;
    document.onclick = () => {
      const { start, end } = getSelectText()!;
      if (start === 0 && end === 0) {
        const { selectStart, selectEnd } = this.state;
        if (selectStart === 0 && selectEnd === 0) return;
        this.setState({
          selectStart: 0,
          selectEnd: 0,
        });
      }
    };
  }
  _onSelectPhoneNumber = (e: MouseEvent) => {
    if (window.getSelection) {
      const { start, end, selectedText } = getSelectText()!;
      const { selectStart, selectEnd } = this.state;
      if (start === 0 && end === 0) return;
      if (selectStart === start && selectEnd === end) return;
      this.setState({
        selectStart: start,
        selectEnd: end,
      });
    }
  };

  _switchLang = () => {
    this.setState({
      lang: this.state.lang === 'zh' ? 'en' : 'zh',
    });
  };
  _queryMd = (lang: 'zh' | 'en') => {
    const path = lang === 'zh' ? ZhMd : EnMd;
    service
      .requireMd(path)
      .then(md => {
        console.log(md);
        this.setState({ md });
      })
      .catch(err => console.log(err));
  };
  render() {
    return (
      <div
        // className={'container'}
        style={{
          paddingRight: '10%',
          paddingLeft: '10%',
        }}
      >
        {this._renderHeader()}
        {this._renderContacts()}
        {this._renderSeparator()}
        <article
          style={{ display: 'flex' }}
          dangerouslySetInnerHTML={
            this.state.md ? { __html: this.state.md } : undefined
          }
        />
      </div>
    );
  }
  _renderHeader = () => {
    return (
      <div
        className="row-center row-center-space-between"
        // style={{ paddingRight: '10%', paddingLeft: '10%' }}
      >
        {this._renderH2MainByEach('TIMVEL', true)}
        <div className="row-center">
          <h2 className="main clickable">blog</h2>
          <h2 className="main space-horizontal">/</h2>
          <h2 className="main clickable" onClick={this._switchLang}>
            {capitalFirstChar(this.state.lang)}
          </h2>
        </div>
      </div>
    );
  };

  _renderContacts = () => {
    const { selectStart, selectEnd, lang } = this.state;
    let text = DISPLAY_TEXT;
    if (selectStart !== 0 || selectEnd !== 0) {
      text = text
        .split('')
        .map((w, idx) => {
          if (idx >= selectStart && idx <= selectEnd - 1)
            return HIDDEN_TEXT.split('')[idx] || w;
          return w;
        })
        .join('');
    }
    // console.warn(selectStart, selectEnd, text);
    return (
      <div style={{ paddingLeft: '20px', paddingRight: '20px' }}>
        <div className="subtitle" style={{ display: 'flex' }}>
          {service.getText(lang).name}
        </div>
        <div
          className="row-center"
          style={{ display: 'flex', marginTop: 5, marginBottom: 5 }}
        >
          <Icon
            type={'mail'}
            style={{
              fontWeight: 'lighter',
              marginTop: 1,
              marginRight: 3,
              fontSize: 16,
            }}
          />
          <div className="subtitle">Email: q@timvel.com</div>
        </div>
        <div className="row-center">
          <Icon
            type={'phone'}
            style={{
              fontWeight: 'lighter',
              marginTop: 1,
              marginRight: 3,
              fontSize: 16,
            }}
          />
          <div id="phone-number" className="subtitle clickable">
            {text}
          </div>
        </div>
        <div className="row-center" style={{ display: 'flex', marginTop: 5 }}>
          <Icon
            type={'wechat'}
            style={{
              fontWeight: 'lighter',
              marginTop: 1,
              marginRight: 3,
              fontSize: 17,
            }}
          />
          <div id="phone-number" className="subtitle">
            {'qingloo8005'}
          </div>
        </div>
      </div>
    );
  };
  _renderSeparator = () => {
    return <div className="separator" />;
  };
  _renderH2MainByEach = (text: string, clickable?: boolean) => {
    return (
      <div className={`row-center ${clickable && 'clickable'}`}>
        {text.split('').map((title, index) => (
          <h2 className="main" key={index}>
            {title}
          </h2>
        ))}
      </div>
    );
  };
}

const styles: IStyle = {};

interface IState {
  lang: 'zh' | 'en';
  md: undefined | string;
  selectStart: number;
  selectEnd: number;
}
export default HomePage;

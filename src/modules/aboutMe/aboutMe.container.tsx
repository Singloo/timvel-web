import * as React from 'react';
import './aboutMe.css';
import service from './aboutMe.service';
import { interval } from 'rxjs';
import {} from 'rxjs/operators';
import { IStyle } from '../../models';
import { withRouter, RouteComponentProps } from 'react-router';
import { goToUrl } from '../../utils';
import { ContactRow, CodeExpRow, Button } from './components';
import Moment from 'moment';

const ZhMd = require('./assets/me_zh.md');
const EnMd = require('./assets/me_en.md');
const convertSec = (
  secs: number,
  {
    y,
    m,
    d,
    h,
    min,
    s,
  }: { y: string; m: string; d: string; h: string; min: string; s: string },
) => {
  const MINUTE = 60;
  const HOUR = 3600;
  const DAY = 86400;
  const MONTH = 2592000;
  const YEAR = 31536000;
  const year = Math.floor(secs / YEAR);
  const month = Math.floor((secs % YEAR) / MONTH);
  const day = Math.floor(((secs % YEAR) % MONTH) / DAY);
  const hour = Math.floor((((secs % YEAR) % MONTH) % DAY) / HOUR);
  const minute = Math.floor(((((secs % YEAR) % MONTH) % DAY) % HOUR) / MINUTE);
  const sec = ((((secs % YEAR) % MONTH) % DAY) % HOUR) % MINUTE;
  const construct = (num: number, unit: string) =>
    num + ' ' + (num <= 1 ? unit.replace(/s$/, '') : unit);
  return [
    construct(year, y),
    construct(month, m),
    construct(day, d),
    // construct(hour, h),
    // construct(minute, min),
    construct(sec, s),
  ].join(' ');
};
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
const FIRST_CODING = Moment('2016-10-18');
const FIRST_INTERNSHIP = Moment('2018-01-03');
const FIRST_JOB = Moment('2018-06-23');

const ZH_LEARN_MORE = [
  '擅长直觉修Bug',
  '擅长于大型犬格斗',
  '2013年 sd敢达 阿纳海姆',
];
const EN_LEARN_MORE: string[] = [];
class HomePage extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      lang: 'zh',
      md: undefined,
      selectStart: 0,
      selectEnd: 0,
      zhLearnMore: 0,
      enLearnMore: 0,
    };
  }
  componentDidMount() {
    this._queryMd('zh');
    const elm = document.getElementById('phone-number') as HTMLDivElement;
    elm.onmousemove = this._onSelectPhoneNumber;
    document.onclick = this._resetSelection;
    interval(1000).subscribe(() => this.forceUpdate());
  }
  _resetSelection = () => {
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
  _goToBlog = () => {
    goToUrl('https://blog.timvel.com');
  };
  _goToGithub = () => {
    goToUrl('https://github.com/Singloo');
  };
  get i18n() {
    return service.getText(this.state.lang);
  }
  _onPressLearnMore = () => {
    const { lang, zhLearnMore, enLearnMore } = this.state;
    const isZh = lang === 'zh';
    const total = isZh ? ZH_LEARN_MORE.length : EN_LEARN_MORE.length;
    const key = isZh ? 'zhLearnMore' : 'enLearnMore';
    const current = isZh ? zhLearnMore : enLearnMore;
    this.setState({
      [key]: Math.min(total, current + 1),
    } as any);
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
          style={{ textAlign: 'start' }}
          dangerouslySetInnerHTML={
            this.state.md ? { __html: this.state.md } : undefined
          }
        />
        {this._renderLearnMore()}
        {this._renderLearnMoreBtn()}
      </div>
    );
  }
  _renderHeader = () => {
    return (
      <div className="row-center row-center-space-between">
        {this._renderH2MainByEach('TIMVEL', true)}
        <div className="row-center">
          <h2 className="main clickable" onClick={this._goToBlog}>
            blog
          </h2>
          <h2 className="main space-horizontal">/</h2>
          <h2 className="main clickable" onClick={this._switchLang}>
            {capitalFirstChar(this.state.lang === 'zh' ? 'en' : 'zh')}
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
        <ContactRow iconType={'mail'} text={'q@timvel.com'} />
        <ContactRow
          iconType={'phone'}
          text={text}
          textId={'phone-number'}
          onClick={() => {}}
        />
        <ContactRow
          iconType={'wechat'}
          text={'qingloo8005'}
          iconStyle={{ fontSize: 17 }}
        />
        <ContactRow
          iconType={'github'}
          text={'github.com/Singloo'}
          onClick={this._goToGithub}
        />
        {this._renderCodingExp()}
      </div>
    );
  };
  _renderCodingExp = () => {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
        }}
      >
        <h4>{this.i18n.codingExp}</h4>
        <CodeExpRow
          title={'从第一次编程开始'}
          subtitle={convertSec(Moment().diff(FIRST_CODING, 's'), {
            ...this.i18n.unit,
          })}
        />
        <CodeExpRow
          title={'从实习开始'}
          subtitle={convertSec(Moment().diff(FIRST_INTERNSHIP, 's'), {
            ...this.i18n.unit,
          })}
        />
        <CodeExpRow
          title={'从第一份工作开始'}
          subtitle={convertSec(Moment().diff(FIRST_JOB, 's'), {
            ...this.i18n.unit,
          })}
        />
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
  _renderLearnMore = () => {
    const { lang, zhLearnMore, enLearnMore } = this.state;
    const isZh = lang === 'zh';
    const total = isZh ? ZH_LEARN_MORE : EN_LEARN_MORE;
    const current = isZh ? zhLearnMore : enLearnMore;
    return (
      <div>
        {total.slice(0, current).map(str => (
          <p>{str}</p>
        ))}
      </div>
    );
  };
  _renderLearnMoreBtn = () => {
    const { lang, zhLearnMore, enLearnMore } = this.state;
    const isZh = lang === 'zh';
    const total = isZh ? ZH_LEARN_MORE.length : EN_LEARN_MORE.length;
    const current = isZh ? zhLearnMore : enLearnMore;
    if (current >= total) return;
    return (
      <Button
        onClick={this._onPressLearnMore}
        style={{ marginTop: 10, marginBottom: 10 }}
      >
        {this.i18n.learnMore}
      </Button>
    );
  };
}

const styles: IStyle = {};

interface IState {
  lang: 'zh' | 'en';
  md: undefined | string;
  selectStart: number;
  selectEnd: number;
  zhLearnMore: number;
  enLearnMore: number;
}
interface IProps extends RouteComponentProps {}
export default withRouter(HomePage);

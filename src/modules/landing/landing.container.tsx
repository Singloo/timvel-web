/*
 * File: /Users/origami/Desktop/timvel-web/src/modules/landing/landing.container.tsx
 * Project: /Users/origami/Desktop/timvel-web
 * Created Date: Wednesday April 3rd 2019
 * Author: Rick yang tongxue(🍔🍔) (origami@timvel.com)
 * -----
 * Last Modified: Tuesday April 30th 2019 10:39:00 am
 * Modified By: Rick yang tongxue(🍔🍔) (origami@timvel.com)
 * -----
 */
import * as React from 'react';
import './landing.css';
import logoWrapper1 from '../../assets/logo_wrapper1.png';
import logoWrapper2 from '../../assets/logo_wrapper2.png';
import playIcon from '../../assets/play.png';
import logoCentre from '../../assets/logo_centre.png';
import { Button } from '../../components';
import Service from './landing.service';
import { from, interval, timer } from 'rxjs';
import { map, delay } from 'rxjs/operators';
import Moment from 'moment';
const songs = [
  'https://timvel-1.oss-cn-hangzhou.aliyuncs.com/musics/organ_variation.mp3',
  'https://timvel-1.oss-cn-hangzhou.aliyuncs.com/musics/space_song.mp3',
];
const INITIAL_TEXTS = [
  'Finally',
  'This is my commitment',
  'My modern manifesto',
  `I'm doing it for all of us`,
  'Who never got the chance',
  'For all the ...',
  'And all my birds of paradise',
  'Who never got to fly at night',
  `There's no more chasing rainbows`,
  'And hoping for an end to them',
  'Their arches are illusions',
  'Solid at first glance',
  'But then you try to touch them',
  `There's nothing to hold on to`,
  'The colors used to lure you in',
  'And put you in a trance',
];
const precisionMap = (date: string, precision: string): string => {
  switch (precision) {
    case 'day':
      return Moment(date).format('dddd, LL');
    case 'month':
      return Moment(date).format('YYYY MMMM');
    case 'year':
      return Moment(date).format('YYYY');
    default:
      return '';
  }
};
const extractContent = (post: any) => {
  return precisionMap(post.happenedAt, post.precision) + ' - ' + post.content;
};
class HomePage extends React.Component<{}, IState> {
  songToPlay: string;
  audio?: HTMLAudioElement | null;
  play?: HTMLImageElement | null;
  constructor(props: any) {
    super(props);
    this.songToPlay = Math.random() > 0.5 ? songs[0] : songs[1];
    this.state = {
      texts: [...INITIAL_TEXTS],
      currentIndex: 0,
    };
  }
  componentDidMount() {
    this.audio = document.getElementById('audio') as HTMLAudioElement;
    this.play = document.getElementById('play') as HTMLImageElement;
    this.play.addEventListener('click', () => {
      this.audio!.play();
    });
    document.addEventListener(
      'WeixinJSBridgeReady',
      () => {
        this.audio!.play();
      },
      false,
    );
    this._fetchPosts();
    this._startLoop();
  }
  _goToUrl = (url: string) => {
    window.open(url, '_blank');
  };
  _startLoop = () => {
    interval(5000)
      .pipe(
        delay(2500),
        map(index => index + 1),
        map(index => (index > this.state.texts.length - 1 ? 0 : index)),
      )
      .subscribe(currentIndex => this.setState({ currentIndex }));
  };
  _fetchPosts = () => {
    from(Service.getAllPosts())
      .pipe(
        map(({ data }) => data),
        map(data => data.map(extractContent)),
      )
      .subscribe({
        next: _texts => {
          const { texts, currentIndex } = this.state;
          const nextTexts = texts.map(o => o);
          nextTexts.splice(currentIndex + 1, 0, ..._texts);
          this.setState({
            texts: nextTexts,
          });
        },
        error: err => {},
      });
  };
  render() {
    const { texts, currentIndex } = this.state;
    const currentText = texts[currentIndex];
    const textStyle = {};
    return (
      <div className={'container'}>
        <audio id={'audio'} src={this.songToPlay} autoPlay={true} />
        <div style={styles.topContainer}>
          <img id={'play'} style={styles.play} src={playIcon} />
          {this._renderButtons()}
        </div>
        {this._renderLogo()}

        <h3 className="title" style={textStyle}>
          {texts[currentIndex]}
        </h3>
        {this._renderLegality()}
      </div>
    );
  }

  _renderLogo = () => {
    return (
      <div className={'logo_container'}>
        <img className={'logo_wrapper2'} src={logoWrapper2} />
        <img className="logo_wrapper1" src={logoWrapper1} />
        <img className="logo" src={logoCentre} />
      </div>
    );
  };
  _renderButtons = () => {
    return (
      <div>
        <Button
          onClick={() => this._goToUrl('https://timvel.com/aboutMe')}
          style={styles.button}
        >
          About me
        </Button>
        <Button
          onClick={() => this._goToUrl('https://blog.timvel.com')}
          style={styles.button}
        >
          Blog
        </Button>
        <Button
          onClick={() =>
            this._goToUrl('https://itunes.apple.com/cn/app/id1461661373')
          }
          style={styles.button}
        >
          Download for Ios
        </Button>
        <Button
          onClick={() =>
            this._goToUrl(
              'https://timvel-downloads.oss-cn-hangzhou.aliyuncs.com/timvel-latest.apk',
            )
          }
          style={styles.button}
        >
          Download for Android
        </Button>
      </div>
    );
  };
  _renderLegality = () => {
    return (
      <a href={'http://www.jsca.gov.cn'}>
        <h6 style={styles.legality}>苏ICP备18024360号</h6>
      </a>
    );
  };
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    flexDirection: 'column',
    alignSelf: 'center',
  },
  legality: {
    textAlign: 'end',
    position: 'absolute',
    bottom: 5,
    left: 0,
    right: 10,
    fontSize: 8,
    color: '#cccccc',
  },
  play: {
    width: 50,
    height: 50,
  },
  button: {
    backgroundColor: 'transparent',
    color: 'white',
    border: 0,
  },
  topContainer: {
    position: 'absolute',
    top: 20,
    left: 0,
    right: 0,
    margin: '0px 20px 0px 20px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
};

interface IState {
  texts: string[];
  currentIndex: number;
}
export default HomePage;

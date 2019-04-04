/*
 * File: /Users/origami/Desktop/timvel-web/src/modules/landing/landing.container.tsx
 * Project: /Users/origami/Desktop/timvel-web
 * Created Date: Wednesday April 3rd 2019
 * Author: Rick yang tongxue(🍔🍔) (origami@timvel.com)
 * -----
 * Last Modified: Thursday April 4th 2019 11:15:33 am
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
const songs = [
  'https://timvel-1.oss-cn-hangzhou.aliyuncs.com/musics/organ_variation.mp3',
  'https://timvel-1.oss-cn-hangzhou.aliyuncs.com/musics/space_song.mp3',
];
class HomePage extends React.Component {
  songToPlay: string;
  audio?: HTMLAudioElement | null;
  play?: HTMLImageElement | null;
  constructor(props: any) {
    super(props);
    this.songToPlay = Math.random() > 0.5 ? songs[0] : songs[1];
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
  }
  _goToUrl = (url: string) => {
    window.open(url, '_blank');
  };
  render() {
    return (
      <div className={'container'}>
        <audio id={'audio'} src={this.songToPlay} autoPlay={true} />
        <div style={styles.topContainer}>
          <img id={'play'} style={styles.play} src={playIcon} />
          {this._renderButtons()}
        </div>
        {this._renderLogo()}

        <h3 className="title">{`I'm coming now ...`}</h3>
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
          onClick={() => this._goToUrl('https://blog.timvel.com')}
          style={styles.button}
        >
          Blog
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
    border:0
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

export default HomePage;

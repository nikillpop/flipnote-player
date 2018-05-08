import { h, Component } from "preact";
import Router, { route } from "preact-router";
import Match, { Link } from "preact-router/match";
import ReactGA from "react-ga";

import FlipnoteViewer from "views/flipnoteViewer";
import FileSelect from "views/fileSelect";

import flipnote from "flipnote.js";
import util from "util";

export default class App extends Component {

  constructor() {
    super();
    this.state = {
      src: null,
      hasOpenedFlipnote: false,
    };
    this.util = util;
    window.app = this;
    ReactGA.initialize(process.env.GA_TRACKING_ID);
  }

  render(props, state) {
    return (
      <main class="app">
        <div class="menuBar menuBar--upper wrap wrap--wide">
          <div class="menuBar__group menuBar__group--left">
            <svg class="menuBar__logo" width="380" height="380" viewBox="0 0 380 380">
              <g fill="none" fill-rule="evenodd" transform="translate(5 32)">
                <path fill="#FFFFFF" fill-rule="nonzero" d="M370,143.357164 L370,178.433895 C370,191.11042 363.838898,202.996082 353.480186,210.303021 L207.480186,313.290067 C194.001371,322.797899 175.998629,322.797899 162.519814,313.290067 L16.5198137,210.303021 C6.16110152,202.996082 -9.23705556e-14,191.11042 0,178.433895 L2.27373675e-13,143.357164 C3.19744231e-13,130.680639 6.16110152,118.794977 16.5198137,111.488037 L27.3736147,103.831867 L20.0542449,98.6712889 C11.4781348,92.6246417 9.4276,80.7705547 15.4742473,72.1944446 C18.4633163,67.9549737 23.0557652,65.1219298 28.1856945,64.3528575 C34.667084,63.3811761 39.7251547,62.5416834 43.3119751,61.8460499 C81.378512,54.4633666 114.498491,41.3108313 142.788052,22.4195931 L162.519814,8.5009913 C163.725691,7.65037688 164.975327,6.87086323 166.263147,6.16504232 C179.381219,-1.36984463 195.729956,-0.644493304 208.152991,8.11445574 L355.248723,111.825345 C358.512745,114.126667 361.074296,117.194955 362.75182,120.711211 C367.441705,127.287068 370,135.194726 370,143.357164 Z"/>
                <path fill="#FE7F7E" fill-rule="nonzero" d="M341.951886,127.831179 L195.951886,24.8441331 C189.385283,20.2121127 180.614717,20.2121127 174.048114,24.8441331 L28.0481144,127.831179 C23.0015623,131.39097 20,137.181421 20,143.357164 L20,178.433895 C20,184.609638 23.0015623,190.400088 28.0481144,193.959879 L174.048114,296.946925 C180.614717,301.578946 189.385283,301.578946 195.951886,296.946925 L341.951886,193.959879 C346.998438,190.400088 350,184.609638 350,178.433895 L350,143.357164 C350,137.181421 346.998438,131.39097 341.951886,127.831179 Z M347.716036,119.659608 C355.418668,125.092973 360,133.93103 360,143.357164 L360,178.433895 C360,187.860029 355.418668,196.698085 347.716036,202.13145 L201.716036,305.118496 C191.693327,312.188422 178.306673,312.188422 168.283964,305.118496 L22.283964,202.13145 C14.5813319,196.698085 10,187.860029 10,178.433895 L10,143.357164 C10,133.93103 14.5813319,125.092973 22.283964,119.659608 L168.283964,16.6725622 C178.306673,9.60263634 191.693327,9.60263634 201.716036,16.6725622 L347.716036,119.659608 Z"/>
                <path fill="#FE7F7E" fill-rule="nonzero" d="M195.956981,24.8545311 C189.388161,20.217717 180.611839,20.217717 174.043019,24.8545311 L27.1423851,128.549096 C26.8627351,128.746496 26.6189311,128.9903 26.4215311,129.26995 C25.4660511,130.623547 25.7887884,132.495424 27.1423851,133.450904 L174.043019,237.145469 C180.611839,241.782283 189.388161,241.782283 195.956981,237.145469 L342.857615,133.450904 C343.137265,133.253504 343.381069,133.0097 343.578469,132.73005 C344.533949,131.376453 344.211212,129.504576 342.857615,128.549096 L195.956981,24.8545311 Z M201.723813,16.6848525 L348.624447,120.379418 C354.490032,124.519831 355.888561,132.631296 351.748148,138.496882 C350.892747,139.708698 349.836264,140.765182 348.624447,141.620582 L201.723813,245.315147 C191.697719,252.39239 178.302281,252.39239 168.276187,245.315147 L21.3755531,141.620582 C15.5099675,137.480169 14.1114391,129.368704 18.2518525,123.503118 C19.1072525,122.291302 20.1637364,121.234818 21.3755531,120.379418 L168.276187,16.6848525 C178.302281,9.60760988 191.697719,9.60760988 201.723813,16.6848525 Z"/>
                <path fill="#FFFFFF" fill-rule="nonzero" d="M33.6117968,83.7588857 L41.0311647,88.9899678 L187.766239,192.446573 C190.826432,194.604184 194.455916,195.809499 198.198874,195.911146 C205.523234,196.110053 211.306577,195.973602 215.504045,195.514612 C246.706475,192.102648 281.977116,176.609892 321.241822,148.926032 L343.724064,133.074768 C344.00473,132.876882 344.249336,132.632276 344.447222,132.35161 C345.401956,130.997487 345.078187,129.125789 343.724064,128.171055 L196.628332,24.4601658 C190.063237,19.8313986 181.296576,19.8313986 174.73148,24.4601658 L159.161865,35.4376337 C127.436743,57.8056556 90.0737596,73.1496581 47.1198537,81.4802054 C43.6969502,82.1440486 39.1978322,82.9027401 33.6117968,83.7588857 Z"/>
                <path fill="#FE7F7E" fill-rule="nonzero" d="M33.6117968,83.7588857 L41.0311647,88.9899678 L187.766239,192.446573 C190.826432,194.604184 194.455916,195.809499 198.198874,195.911146 C205.523234,196.110053 211.306577,195.973602 215.504045,195.514612 C246.706475,192.102648 281.977116,176.609892 321.241822,148.926032 L343.724064,133.074768 C344.00473,132.876882 344.249336,132.632276 344.447222,132.35161 C345.401956,130.997487 345.078187,129.125789 343.724064,128.171055 L196.628332,24.4601658 C190.063237,19.8313986 181.296576,19.8313986 174.73148,24.4601658 L159.161865,35.4376337 C127.436743,57.8056556 90.0737596,73.1496581 47.1198537,81.4802054 C43.6969502,82.1440486 39.1978322,82.9027401 33.6117968,83.7588857 Z M202.390662,16.2873108 L349.486393,119.9982 C355.354259,124.135381 356.757257,132.246074 352.620077,138.11394 C351.762572,139.330159 350.702613,140.390119 349.486393,141.247623 L327.004151,157.098887 C286.465635,185.680855 249.685986,201.836449 216.591058,205.455357 C211.873478,205.971221 205.667213,206.11765 197.927405,205.907461 C192.214469,205.752315 186.674731,203.912624 182.00391,200.619428 L35.2688337,97.1628218 L25.8165743,90.4984339 C21.7542074,87.6342333 20.7829017,82.0191409 23.6471023,77.956774 C25.0629767,75.9486041 27.2383467,74.6066363 29.6683126,74.242339 C36.2786732,73.2513223 41.4665329,72.3902885 45.2159144,71.6631277 C86.8230889,63.5937676 122.868649,48.7907965 153.399535,27.2647787 L168.969151,16.2873108 C178.98956,9.2223503 192.370252,9.2223503 202.390662,16.2873108 Z M210.642113,78.7576961 L234.06011,136.137807 C235.938302,140.73986 233.730176,145.993136 229.128123,147.871328 C227.127251,148.687925 224.89935,148.757291 222.851552,148.066749 L130.556549,116.943753 L122.259449,114.145885 C118.072793,112.734094 115.82332,108.195655 117.235112,104.008999 C118.020754,101.679183 119.834089,99.8400361 122.152569,99.0215455 C125.632987,97.7928564 128.368056,96.8167041 130.354321,96.094385 C143.261661,91.4005392 153.342112,87.3899802 160.569919,84.0775693 C166.770932,81.2357248 173.930479,77.5057365 182.038482,72.8895637 C183.501858,72.0564118 185.376662,70.9083893 187.650969,69.451043 C194.62608,64.9814865 203.903816,67.0126353 208.373376,73.9877435 C208.815316,74.677426 209.200019,75.4021503 209.523628,76.1546465 L210.642113,78.7576961 Z M222.343457,133.893614 L201.419536,82.6223293 L200.33709,80.1052825 C200.229221,79.8544506 200.100986,79.6128759 199.953673,79.3829818 C198.46382,77.0579462 195.37124,76.3808964 193.046205,77.8707477 C190.636667,79.4147487 188.620625,80.6492569 186.986152,81.5798203 C178.639487,86.3318718 171.226168,90.1940708 164.736119,93.1683767 C157.224203,96.610991 146.911388,100.713997 133.771923,105.492257 C132.948018,105.791876 132.00079,106.13324 130.930004,106.516436 L133.751879,107.468002 L223.975483,137.892496 L222.343457,133.893614 Z"/>
              </g>
            </svg>
            <div class="menuBar__title">
              <h1>Flipnote Player v{process.env.VERSION}</h1>
              <h2 class="menuBar__subTitle">by James Daniel (<a native href="https://twitter.com/rakujira">@rakujira</a>)</h2>
            </div>
          </div>
          <div class="menuBar__group menuBar__group--right">
            <a native href="https://github.com/jaames/flipnote-player">View on GitHub</a>
          </div>
        </div>
        <div class="wrap wrap--wide">
          <Router onChange={ (e) => this.handleRoute(e) }>
            <FileSelect path="/" onFileSelect={ (src) => this.openFlipnote(src) }/>
            <FlipnoteViewer path="/view" src={ state.src }/>
          </Router>
        </div>
        <div class="menuBar menuBar--lower wrap wrap--wide">
        </div>
      </main>
    );
  }

  handleRoute(e) {
    ReactGA.pageview(e.url);
    switch(e.url) {
      case "/":
        this.closeFlipnote();
        break;
      case "/view":
        if (!this.state.hasOpenedFlipnote) route("/");
        break;
    }
  }

  openFlipnote(src) {
    this.setState({
      src,
      hasOpenedFlipnote: true,
    });
    route("/view");
  }

  closeFlipnote() {
    route("/");
    this.setState({src: null});
  }
}

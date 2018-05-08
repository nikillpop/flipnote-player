import { h, Component } from "preact";
import Dropzone from "react-dropzone";

import FlipnoteGrid from "components/flipnoteGrid";
import FlipnoteGridThumb from "components/flipnoteGridThumb";
import ajax from "util/ajax";

export default class fileSelect extends Component {

  constructor(props) {
    super(props);
    this.state = {
      gridItems: new Array(12).fill({}).map(item => ({src: ""}))
    };
  }

  componentDidMount() {
    this.loadSamples(); 
  }

  render(props, state) {
    return (
      <div class="fileSelect modal">
        <div class="fileSelect__side modal__region modal__region--left">
          <h4 class="region__title">Upload Flipnote</h4>
          <div class="region__body">
            <Dropzone 
              className="dropzone"
              activeClassName="dropzone--active"
              acceptClassName="dropzone--accept"
              rejectClassName="dropzone--reject"
              accept=".ppm"
              multiple={false}
              onDrop={ (accepted) => this.onDrop(accepted) }
              style={{}}
            >
              <div class="dropzone__content">
                <p>Drag &amp; drop a Flipnote .PPM file here</p>
                <div class="button button--inline">Browse Files</div>
              </div>
            </Dropzone>
          </div>
        </div>
        <div class="fileSelect__main modal__region modal__region--right modal__region--gray">
          <h4 class="region__title">Sample Flipnotes</h4>
          <FlipnoteGrid>
            { state.gridItems.map((item, index) => {
              return (<FlipnoteGridThumb key={index} thumb={item.thumb} author={item.author} src={item.src} onSelect={src => this.loadFlipnote(src)}/>); 
            }) }
          </FlipnoteGrid>
        </div>
      </div>
    );
  }

  loadSamples() {
    ajax.getJson("static/ppm/manifest.json", (data) => {
      var items = data["items"].map(item => ({...item, src: `static/ppm/${item.filestem}.ppm`}));
      this.setState({ gridItems: items });
    });
  }

  loadFlipnote(source) {
    this.props.onFileSelect(source);
  }

  onDrop(accepted) {
    var file = accepted[0];
    var reader = new FileReader();
    reader.onload = (event) => {
      this.loadFlipnote(event.target.result);
    };
    reader.readAsArrayBuffer(file);
  }
}
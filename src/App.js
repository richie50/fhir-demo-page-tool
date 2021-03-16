import CodeMirror from 'react-codemirror';
import Editor from 'react-simple-code-editor';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/yaml/yaml.js';
import 'codemirror/mode/javascript/javascript.js';
import "./App.css";
import { Component } from "react";

class App extends Component {

  options = {
    lineNumbers: true,
  };

  code = `function add(a, b) {
    return a + b;
  }
  `;

  constructor() {
    super();
    // this.props = {currentExpression: ''}
    this.state = {
      selectedFileType: 'yaml',
      currentExpression: ''
    };
  }

  componentDidMount = () => {
    console.log("Mounted" , this.code);
  }

  componentDidUpdate = ()=> {
    console.log(this.state);
}

  updateCode(world) {}
  
  testEvaluate(){
    console.log('Hello ....' );
  }
  debounce = (func , wait) => {
    let timeout;
    return function(event){
      const context = this;
      if(timeout){
        clearTimeout(timeout);
      }
      timeout = setTimeout(() => {
        timeout = null;
        console.log(event.target.value);
        this.setState({currentExpression : event.target.value} , () => {
          console.log(this.state);
        })
        func.apply(context , event);
        
       }, wait);
    };
  }

  onFileTypeSelected(event){
    const { name, value } = event.target;
    console.log(name , value);
    this.setState({selectedFileType: value})
    // console.log(this.state.selectedFileType);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1> Fhir Demo</h1>
          <b>fhirpath.js&nbsp;</b>
          <a id="Header-link" href="https://github.com/HL7/fhirpath.js">
            <span className="Header-text">
              JavaScript Engine for HL7 FHIRPath
            </span>
          </a>
        </header>
        <main>
          <div className="container">
            <input
              className="search-input"
              type="text"
              onChange={this.debounce(this.testEvaluate.bind(this), 500).bind(
                this
              )}
              placeholder="Enter here"
            />

            <div id="files" className="file-type">
              <input
                id="json-type"
                className="radio-file"
                type="radio"
                value="yaml"
                name="yaml-name"
                checked={this.state.selectedFileType === "yaml"}
                onChange={this.onFileTypeSelected.bind(this)}
              />
              <label htmlFor="json-type">YAML</label>

              <input
                id="yaml-type"
                className="radio-file"
                type="radio"
                value="json"
                name="json-name"
                checked={this.state.selectedFileType === "json"}
                onChange={this.onFileTypeSelected.bind(this)}
              />
              <label htmlFor="yaml-type">JSON</label>
            </div>

            <div className="container-grid">
              <div className="editor">
                {/* <CodeMirror value={this.state.code} onChange={this.updateCode.bind(this)} options={this.options} /> */}
                <Editor
                textareaClassName="editing-area"
                  value={this.code}
                  onValueChange={(code) => this.testEvaluate(code)}
                  highlight={(code) => {return null}}
                  style={{
                    fontFamily: '"Fira code", "Fira Mono", monospace',
                    fontSize: 12,
                  }}            
                />
              </div>
              <div className="output-box">
                <h4>Output</h4>
              </div>
            </div>
          </div>
        </main>
        <footer className="footer">
          Powered by <a href="https://www.health-samurai.io/">health-samurai</a>
          and
          <a href="https://lhncbc.nlm.nih.gov/">LHNCBC</a>
        </footer>
      </div>
    );
  }
}

export default App;

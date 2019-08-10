import React from 'react'

class ApiContainer extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      apiSrc: "",
      apiCaption: "",
      apiTitle: "",
      date: props.date || ""
    } 
  }

  shouldComponentUpdate(nextProps, nextState) {
    const nextSrc = nextState.apiSrc
    const currSrc = this.state.apiSrc
    return (nextSrc !== currSrc)
  }

  callApi() {
    fetch(
      `https://api.nasa.gov/planetary/apod?` +
      `date=${ this.state.date }&` +
      `api_key=${ NASA_API_KEY }`
      )
      .then(res => res.json())
      .then(res => this.setState({
        apiSrc: res.url,
        apiCaption: res.explanation,
        apiTitle: res.title,
        apiDate: res.date,
        apiCopyright: res.copyright || "Public Domain" }))
      .catch(err => err)
  }

  componentDidMount() {
    this.callApi()
  }

  render() {
    return (
      <div className="api-container">
        <div className="api-card-wrapper">
          <h2 className="api-title">{ this.state.apiTitle }</h2>
          <div className="api-img-wrapper">
            <img className="api-img" src={ this.state.apiSrc } />
          </div>
          <p className="api-caption">{ this.state.apiCaption }</p>
          <footer className="post-footer">
            <div className="post-date">
              { this.state.apiDate }
            </div>
            <div className="post-copy">
              { this.state.apiCopyright }
            </div>
          </footer>
        </div>
      </div>
    )
  }
}

export default ApiContainer

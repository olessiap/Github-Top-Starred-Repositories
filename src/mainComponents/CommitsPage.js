import React, { Component } from 'react'
import ChuckNorrisFact from './ChuckNorrisFact'
import JavascriptTimeAgo from 'javascript-time-ago'
import PageTitle from "../reusableComponents/PageTitle"
import StarCount from "../reusableComponents/StarCount"
import en from 'javascript-time-ago/locale/en'

JavascriptTimeAgo.locale(en)

export class CommitsPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      commits: {}
    }
  }
  //fetch latest repo commits and store them in state
  componentDidMount() {
    //calculate todays date and tomorrows dates to use in search query
    const today = new Date().toISOString().split("T")[0]
    const yesterday = new Date(new Date().getTime() - (24 * 60 * 60 * 1000)).toISOString().split("T")[0]

    const url = `https://api.github.com/search/commits?q=repo:${this.props.location.state.name} author-date:${yesterday}..${today}`
    
    // create github api header requirement
    const headers = {
      "Accept":"application/vnd.github.cloak-preview"
    }
    fetch(url, {
      method: 'GET',
      headers: headers
    })
    .then(response => response.json())
    .then(
      (responseJson) => {
        this.setState({
          commits:responseJson.items
        })
      })
      .catch((error) => {
        console.log(error)
        //if error occurs redirect user to fancy error page
        this.props.history.push('/error')
      })
  } 
  render() {
    const { commits } = this.state
    const { location  } = this.props
    //check if there are any commits first then create commit divs
    const commitList = commits.length ? (
      commits.map((item, index) => {
        return (
          <div className="commit-div" key={index}>
            <div className="author-container">
              <img src={item.author.avatar_url} alt={item.author.avatar_url}/>
              <p className="author-name">{item.commit.author.name}</p>
            </div>
            <p className="commit-message">{item.commit.message.slice(0, 200)}</p>
            <p className="commit-date">{item.commit.author.date.split("T")[0]}</p>
          </div> 
        )
      })
    ) : (
        //if no commits render a random chuck norris quote :)
        <ChuckNorrisFact />
    )
    return (
      <div className="main-container"> 
        <PageTitle title={"Commits made in the last 24 hours"}/>
        <div className="repo-container">
          <div className="card-header">
            <h1 className="repo-title">{location.state.name}</h1>
            <StarCount starNum={location.state.stars} />
          </div>
          <div className="commit-container">
            {commitList}
          </div>
        </div>
      </div>
    )
  }
}

export default CommitsPage

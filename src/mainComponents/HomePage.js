import React, { Component } from 'react'
import { Link } from "react-router-dom"
import { withRouter } from "react-router"
import PageTitle from "../reusableComponents/PageTitle"
import ReactTimeAgo from 'react-time-ago'
import StarCount from '../reusableComponents/StarCount'
import JavascriptTimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'

//initialize time-ago
JavascriptTimeAgo.locale(en)

export class HomePage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: {}
    }
  }

  //fetch top git repos 
  componentDidMount() {
    const url = "https://api.github.com/search/repositories?q=stars:>40000&per_page=100"
    fetch(url)
    .then(response => response.json())
    .then(
      (responseJson) => {
        this.setState({
          data:responseJson.items
        })
      })
      //if an error occurs redirect the user to the fancy error page
      .catch((error) => {
        console.log(error)
        this.props.history.push('/error')
      })
  }
  //click event to keep things interesting
  handleClick = () => {
    alert("That sure is a lot of stars!!!")
  }
  render() {
    const { data } = this.state
    //check if data loaded first then map through the list and create a div for each card
    const repoCard = data.length ? (
      data.map(item => {
        return(
          <div key={item.id}  className="repository-card">
            <div className="card-header">
              <Link 
                style={{
                  textDecoration:'none'
                }} to={{
                pathname: `/${item.id}`,
                state: {
                  name: item.full_name,
                  stars: item.stargazers_count
                }
              }}><span className="repository-title">{item.name}</span></Link>
              <StarCount starNum={item.stargazers_count} />
            </div>
            <p className="repository-description">{item.description.slice(0, 150)}</p>
            <p className="date">created <ReactTimeAgo date={item.created_at}/></p>
          </div>
        )
      })
    ) : (
      //display message while the data loads
      <p>Loading repos... </p>
    )
    return (
      <div className="main-container">
        <PageTitle title={"Top Starred Repositories Currently On Github"}/>
        <div className="home-container">{repoCard}</div>
      </div>
    )
  }
}

export default withRouter(HomePage)

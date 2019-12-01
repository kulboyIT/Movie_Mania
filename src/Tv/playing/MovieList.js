import React, { Component } from "react";
import Spinner from "../../common/Spinner";
// import Formm from "./Form";
// import axios from 'axios';
import { Row, Container } from "react-bootstrap";
import Service from "../Service";
// import {getNowPlaying} from '../../Action/NowPlayingActions'

const service = new Service();

const POSTER_PATH = "http://image.tmdb.org/t/p/original";

export class TMovieList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      page: null
    };
  }

  _loadMore = async e => {
    e.preventDefault();

    await this.setState(prev => {
      return { page: prev.page + 1 };
    });
    await service.getCustomersByURL(parseInt(this.state.page));
    this.props.history.push("/?page=" + parseInt(this.state.page));
  };

  // componentDidMount() {
  //     axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=222e7bb2f5b52cf29c95ea61cc204128&language=en-US`)
  //       .then(res => {
  //         const info = res.data;
  //         console.log(res);
  //         this.setState({ info });
  //       })

  //   }

  async componentDidMount(page) {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/tv/on_the_air?api_key=222e7bb2f5b52cf29c95ea61cc204128&language=en-US`
      );
      const movies = await res.json();
      console.log(movies);
      this.setState({
        movies: movies.results
      });
    } catch (e) {
      console.log(e);
    }
  }

  // Get Data from filter date
  // getData = async e => {
  //   try {
  //     const find = e.target.elements.find.value;
  //     e.preventDefault();
  //     const res = await fetch(
  //       `https://api.themoviedb.org/3/search/movie?api_key=222e7bb2f5b52cf29c95ea61cc204128&language=en-US&query=${find}&page=1&include_adult=false`
  //     );
  //     const movies = await res.json();
  //     console.log(movies);
  //     this.setState({
  //       movies: movies.results
  //     });
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  render() {
    const { movies } = this.state;
    if (movies === null)
      return (
        <p>
          <Spinner />
        </p>
      );
    return (
      <Container>
        {/* <Formm loaddata={this.getData} /> */}
        <Row>
          {this.state.movies.map(castt => (
            <div class="col-sm-3" key={castt.id} style={{ marginTop: "15px" }}>
              <a href={"/tv/overview/" + castt.id}>
                <div class="card">
                  <img
                    src={
                      castt.poster_path
                        ? `${POSTER_PATH}${castt.poster_path}`
                        : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRW4I8WjSih2pBUuErcVPFj7G_Zn2xvNVWqvlMvHtb3M1JOtJUU"
                    }
                    alt={castt.name}
                    style={{ height: "360px" }}
                    class="card-img-top ig image"
                  />
                  <div class="middle">
                    <p className="cc">{castt.original_name}</p>
                    <p className="cc">{castt.first_air_date}</p>
                    <p className="cc">{castt.vote_average}/10</p>
                  </div>
                </div>
              </a>
            </div>
          ))}
        </Row>

        <button onClick={this._loadMore} className="btn__loadmore_popular_next">
          <i className="fas fa-arrow-right fa-3x" />
        </button>
      </Container>
    );
  }
}

export default TMovieList;

import React, { Component, setState } from 'react';
import { request, trending } from './getData';
import axios from 'axios';
export default class Movies extends Component {
    constructor(props){
        super(props);
        this.state={
            hover:'',
            currpage:1,
            parr:[1] ,
            movies:[],
            favourites:[]
        }
        // this.nxtPage = this.nxtPage.bind(this);
    }
    async componentDidMount()
    {
        const resp = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=a748adf1e91c666693b3a7ec038cce7d&language=en-US&page=%24%7B{this.state.currpage}`)
        console.log("dekho",resp.data);
        let data = resp.data;
        console.log(data);
        console.log("Mounting DOne");
        this.setState({
            movies:[...data.results]
        })
    }
    changeData = async ()=> {
        const resp = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=a748adf1e91c666693b3a7ec038cce7d&language=en-US&page=%24%7B{this.state.currpage}`)
        let data = resp.data;
        this.setState({
            movies:[...data.results]
        })
    }

    nxtPage = ()=>{
        let tmparr=[]
        for (let i=1; i<this.state.parr.length+1;i++){
            tmparr.push(i);
        }
        this.setState({
            parr:[...tmparr],
            currpage:this.state.currpage +1
        },this.changeData)
    }

    prevPage = ()=> {
        if(this.currpage != 1){
            console.log(this);
            this.setState({currpage:this.state.currpage - 1},this.changeData)
        }
    }
    handleClick=(value)=>{
        if(value!=this.state.currpage){
            console.log("i am called")
            this.setState({currPage:value},this.changeData);
        }
    }
    handleFavourites=(movie)=>{
        let oldData = JSON.parse(localStorage.getItem("movies-app") || "[]")
        if(this.state.favourites.includes(movie.id)){
            oldData = oldData.filter((m)=>m.id!=movie.id)
        }else{
            oldData.push(movie)
        }
        localStorage.setItem("movies-app",JSON.stringify(oldData));
        console.log(oldData);
        this.handleFavouritesState();
    }
    handleFavouritesState=()=>{
        let oldData = JSON.parse(localStorage.getItem("movies-app") || "[]")
        let temp = oldData.map((movie)=>movie.id);
        this.setState({
            favourites:[...temp]
        })
    }
  render() {
    //   let movie = movies.results;

    return <div>
            {
                this.state.movies.length == 0 ?
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>:
                <div>
                    <h1 className="text-center"><strong>Trending</strong></h1>
                    {
                        <div className='movies-list'>
                            {
                                this.state.movies.map( (movieobj) =>( 
                                    <div className="card movies-card" >    
                                        <img src={`https://image.tmdb.org/t/p/original${movieobj.backdrop_path}`}   alt={movieobj.title} className="card-img-top movies-img" onMouseEnter={()=> this.setState=({hover:movieobj.id})} />
                                        <h5 className="card-title movies-title">{movieobj.original_title}</h5>
                                        <div className="button-wrapper" style={{display:'flex',width:'100%',justifyContent:'center'}}>
                                        <a className="btn btn-primary movies-button" onClick={()=>this.handleFavourites(movieobj)}>{this.state.favourites.includes(movieobj.id)?"Remove from favourites":"Add to favourites"}</a>
                                            {/* <a className="btn btn-primary movies-button"onClick={()=>this.handleFavourites(movieobj)} {this.state.favourites.includes(movieobj.id)?"Remove from favourites":"Add to favourites"}/> */}
                                        </div>
                                        
                                    </div>
                                ))
                            }
                        </div>  
                    }
                    <div style={{display:'flex',width:'100%',justifyContent:'center'}}>
                        <nav aria-label="Page navigation example">
                        <ul className="pagination">
                            <li className="page-item"><a className="page-link" onClick={this.prevPage}>Previous</a></li>
                            {
                                this.state.parr.map((value)=>(
                                    <li className="page-item"><a className="page-link" onClick={this.handleClick}>{value}</a></li>
                                )) 
                            }
                            <li className="page-item"><a className="page-link" onClick={this.nxtPage}>Next</a></li>
                        </ul>
                        </nav>
                    </div>
                </div>
            }
            </div>  
  }
}


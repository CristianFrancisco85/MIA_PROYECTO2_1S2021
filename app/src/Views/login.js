import React, { Component } from 'react'
import {Button,Typography,Grid,Box,Input,Container,TextField,Link} from '@material-ui/core'
import {BrowserRouter as Router,Switch,Route,Link as LinkRouter} from "react-router-dom";

export default class Login extends Component {

    constructor(props){
        super(props)
        this.state = {
            loginAuth:false,
            user:'',
            password:''
        }
        
        
    }


     async handleSubmit(e){
        e.preventDefault()
        try{
            await fetch(`http://localhost:8080/loginCliente/${this.state.user}/${this.state.password}`,
            {   
                method:'POST'
            })
            .then(response => response.json())
            .then(data => {
                if(data==1){
                    localStorage.setItem("username",this.state.user)
                    this.props.history.push("/menu");
                }
                else{
                    alert("Datos incorrectos")
                }
            });
        }
        catch(error){
            console.error(error)
        }
       
    }

    render() {

        return (
            <Container component="main" maxWidth="sm" style={{marginTop:250}}>
                <form onSubmit={(e)=>this.handleSubmit(e)}>
                <Typography component="h1" variant="h5">Login Users</Typography>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoFocus
                    onChange={(e)=> this.setState({user:e.target.value}) }
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    onChange={(e)=> this.setState({password:e.target.value}) }
                />
                <Button
                    fullWidth
                    type="submit"
                    variant="contained"
                    color="primary"
                >
                    Sign In
                </Button>
                </form>

                <br></br>
                <Link component={LinkRouter} to="/createAccount">
                    Crear Cuenta
                </Link>
                <Link component={LinkRouter} to="/loginAdmin">
                    Login Admin
                </Link>
          </Container>
        )
    }
}

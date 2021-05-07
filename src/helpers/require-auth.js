import React from 'react';
import {Redirect} from 'react-router-dom';
import {config} from '../config';
import axios from 'axios';
import {connect} from 'react-redux';
import {loadUserInfo} from '../actions/user/userActions';



export default function(ChildComponent, withAuth = false) {
    
    class RequireAuth extends React.Component {
        constructor(props) {
            super(props)
            this.state = {
                redirect: false,
            }
        
        componentDidMount = async () => {
            const token = window.localStorage.getItem('collemavie')
            if(token === null) {
                this.setState({redirect: true});
            } else {
                if(this.props.user.isLogged === false) {
                    axios.get(config.api_url+"/api/v1/checkToken", { headers: { "x-access-token": token }})
                    .then((response)=>{
                        if(response.data.status !== 200) {
                                this.setState({redirect: true});
                        } else {
                            this.props.loadUserInfo(response.data.user);
                        }
                    })
                }
                               
            }
        }
        
        render() {
        if(this.state.redirect) {
                return <Redirect to="/login" />
            }
            return (<ChildComponent {...this.props} />)
        }
        
    }
    
    const mapDispatchToProps = {
        loadUserInfo,
    }
    
    const mapStateToProps = (store)=>{
        return {
            user: store.user,
            
        }
    }
    
    
    return connect(mapStateToProps, mapDispatchToProps)(RequireAuth);
}
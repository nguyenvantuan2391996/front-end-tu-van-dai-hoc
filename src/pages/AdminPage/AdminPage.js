import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

class AdminPage extends Component {
	constructor(props){
		super(props);
		this.state = {
			message : '',
			role : '1'
		};
	}

	onSignOut = (e) => {
		e.preventDefault();
		axios({
			method: 'POST',
			url: 'http://nguyenvantuan239-001-site1.itempurl.com/api/logout',
			data: {
				refresh_token: localStorage.getItem('refresh_token'),
				token: localStorage.getItem('access_token')
			}

		}).then(res => {
			this.setState({
				message : "signout"
			});
			this.setState({
				role : localStorage.getItem('role')
			});
			localStorage.clear();
		}).catch(err => {
			alert(err.response.data.message);
		});
	}

	componentDidMount () {
		if (localStorage.getItem('refresh_token') !== null && localStorage.getItem('access_token') !== null) {
			axios({
				method: 'POST',
				url: 'http://nguyenvantuan239-001-site1.itempurl.com/api/login/getinfortoken',
				data: {
					refresh_token: localStorage.getItem('refresh_token'),
					token: localStorage.getItem('access_token')
				}
			}).then(res => {
				this.setState({
					role : res.data.role
				});
			}).catch(err => {
				this.setState({
					message : "signout"
				});
			});
		} else {
			this.setState({
				message : "signout"
			});
		}
	}

	render() {
		var {message, role} = this.state;

		if (message === "signout" || role !== "1") {
			return <Redirect to="/" />
		}

		return (
			<div>
		        <div className="page-topbar">
		          <div className="quick-area">
		            <ul className="pull-left info-menu  user-notify">
		              <button id="menu_icon"><i className="fa fa-bars" aria-hidden="true" /></button>
		            </ul>
		            <ul className="pull-right info-menu user-info">
		              <li className="profile">
		                <a href="/user" role="button">
		                  <img alt="avatar" src="https://pickaface.net/gallery/avatar/unr_randomavatar_170412_0236_9n4c2i.png" className="img-circle img-inline" />
		                  <span>{localStorage.getItem('name')}</span>
		                </a>
		              </li>
		            </ul>
		          </div>
		        </div>
		        <div className="page-sidebar expandit">
		          <div className="sidebar-inner" id="main-menu-wrapper">
		            <div className="profile-info row ">
		              <div className="profile-image ">
		                <img alt="avatar" src="https://pickaface.net/gallery/avatar/unr_randomavatar_170412_0236_9n4c2i.png" className="img-circle img-inline" />
		              </div>
		              <div className="profile-details">
		                <h3>
		                  <a href="/user">{localStorage.getItem('name')}</a> 
		                </h3>
		                <p className="profile-title">{localStorage.getItem('address')}</p>
		              </div>
		            </div>
		            <ul className="wraplist" style={{height: 'auto'}}>	
		              <li><a href="/admin"><span className="sidebar-icon"><i className="fa fa-address-card-o" /></span> <span className="menu-title">Manage Account</span></a></li>
		              <li><a href='/managefeedback'><span className="sidebar-icon"><i className="fa fa-rss" /></span> <span className="menu-title">Manage Feedback</span></a></li>
		              <li><a href="/toolquery"><span className="sidebar-icon"><i className="fa fa-windows" /></span> <span className="menu-title">Tool Query</span></a></li>
		              <li><a role="button" onClick={this.onSignOut}><span className="sidebar-icon"><i className="fa fa-lock" /></span> <span className="menu-title">Sign Out</span></a></li>
		            </ul>
		          </div>
		        </div>

		        <section id="main-content">
		        	<section className="wrapper main-wrapper row">
	        			<div className="col-md-12">
	        				<div className="card shadow">
	        					<div className="table-responsive">
									<table id="mytable" className="table table-bordred">
										<thead className="thead-light">
											<tr>
												<th>Serial</th>
												<th>Account Name</th>
												<th>Name</th>
												<th>Phone</th>
												<th>Address</th>
												<th>Role</th>
												<th>Status</th>
												<th>Edit</th>
											</tr>
										</thead>
										<tbody>
											<tr>
												<td>1</td>
												<td>nguyentuongvi</td>
												<td>Nguyễn Tường Vi</td>
												<td>098888888</td>
												<td>Hà Nội</td>
												<td>User</td>
												<td>Active</td>
												<td><button><i className="fa fa-pencil-square-o" aria-hidden="true"></i></button></td>
											</tr>
										</tbody>
									</table>
				        		</div>
	        				</div>
			        	</div>
		        	</section>
		        </section>
		        
	      	</div>
		);
	}
}

export default AdminPage;
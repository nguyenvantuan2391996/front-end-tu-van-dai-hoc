import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import swal from '@sweetalert/with-react';

class FeedbackPage extends Component {
	constructor(props){
		super(props);
		this.state = {
			message : '',
			role : '1',
			listFeedback : []
		};
	}
	onChange = (e) => {
		var target = e.target;
		var name = target.name;
		var value = target.value;
		this.setState({
			[name]: value
		});
	}

	onSignOut = (e) => {
		e.preventDefault();
		swal({
			title: "Are you sure ?",
			text: "Once sign out, you will redirect to home !",
			icon: "warning",
			buttons: true,
			dangerMode: true,
		})
		.then((willDelete) => {
			if (willDelete) {
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

					swal("Sign out success!", {
						icon: "success",
						timer: 2000
					});
				}).catch(err => {
					swal("Fail !", err.response.data.message + " !", "error");
				});
			}
		});
	}

	onDelete = (data) => {
		swal({
			title: "Are you sure ?",
			text: "Feedback will be deleted !",
			icon: "warning",
			buttons: true,
			dangerMode: true,
		})
		.then((willDelete) => {
			if (willDelete) {

				axios({
					method: 'DELETE',
					url: 'http://nguyenvantuan239-001-site1.itempurl.com/api/feedback',
					data: {
						id : data.id
					},
					headers: { Authorization: "Bearer " + localStorage.getItem('access_token')}
				}).then(res => {
					swal("Delete success!", {
						icon: "success",
						timer: 2000
					});
					this.getFeedback();
				}).catch(err => {
					if (err.response.status === 401) {
						axios({
							method: 'POST',
							url: 'http://nguyenvantuan239-001-site1.itempurl.com/api/login/refreshToken',
							data: {
								refresh_token: localStorage.getItem('refresh_token'),
								token: localStorage.getItem('access_token')
							}
						}).then(res => {
							localStorage.setItem('access_token', res.data.access_token);
							localStorage.setItem('refresh_token', res.data.refresh_token);

							axios({
								method: 'DELETE',
								url: 'http://nguyenvantuan239-001-site1.itempurl.com/api/feedback',
								data: {
									id : data.id
								},
								headers: { Authorization: "Bearer " + localStorage.getItem('access_token')}
							}).then(res => {
								swal("Delete success!", {
									icon: "success",
									timer: 2000
								});
								this.getAccount();
							}).catch(err => {
								this.setState({
									message : "signout"
								});
							});
						});
					}
				});
			}
		});
	}

	getFeedback() {
		axios({
			method: 'GET',
			url: 'http://nguyenvantuan239-001-site1.itempurl.com/api/feedback',
			data: {
				refresh_token: localStorage.getItem('refresh_token'),
				token: localStorage.getItem('access_token')
			}
		}).then(res => {
			this.setState({
				listFeedback : res.data
			});
		}).catch(err => {
			if (err.response.status === 404) {
				swal("Fail !", err.response.data.message + " !", "error");
			}
			else if (err.response.status === 401) {
				axios({
					method: 'POST',
					url: 'http://nguyenvantuan239-001-site1.itempurl.com/api/login/refreshToken',
					data: {
						refresh_token: localStorage.getItem('refresh_token'),
						token: localStorage.getItem('access_token')
					},
				}).then(res => {
					localStorage.setItem('access_token', res.data.access_token);
					localStorage.setItem('refresh_token', res.data.refresh_token);

					axios({
						method: 'GET',
						url: 'http://nguyenvantuan239-001-site1.itempurl.com/api/feedback',
						data: {
							refresh_token: localStorage.getItem('refresh_token'),
							token: localStorage.getItem('access_token')
						}
					}).then(res => {
						this.setState({
							listFeedback : res.data
						});
					}).catch(err => {
						this.setState({
							message : "signout"
						});
					});
				});
			}
		});
	}

	componentDidMount () {
		this.getFeedback();

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
				localStorage.setItem('id', res.data.user_id);
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
		var {listFeedback, message, role} = this.state;

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
		              <li><a href='/feedback'><span className="sidebar-icon"><i className="fa fa-rss" /></span> <span className="menu-title">Manage Feedback</span></a></li>
		              <li><a href="/query"><span className="sidebar-icon"><i className="fa fa-windows" /></span> <span className="menu-title">Tool Query</span></a></li>
		              <li><a href="!#" role="button" onClick={this.onSignOut}><span className="sidebar-icon"><i className="fa fa-lock" /></span> <span className="menu-title">Sign Out</span></a></li>
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
												<th>Content</th>
												<th>Rating</th>
												<th>Delete</th>
											</tr>
										</thead>
										<tbody>
										{
											listFeedback.map((data, index) => {
												return (
													<tr key={index}>
														<td>{index + 1}</td>
														<td>{data.account_name}</td>
														<td>{data.name}</td>
														<td>{data.phone}</td>
														<td>{data.address}</td>
														<td>{data.feedback_content}</td>
														<td>{data.feedback_type}&nbsp;<i className="fa fa-star-o" aria-hidden="true"></i> </td>
														<td><a href="!#" role="button" onClick={() => this.onDelete(data)}><i className="fa fa-trash-o fa-lg" aria-hidden="true"></i> </a></td>
													</tr>
												);
											})
										}
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
export default FeedbackPage;
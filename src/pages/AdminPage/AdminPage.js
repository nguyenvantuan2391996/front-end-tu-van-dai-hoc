import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import swal from '@sweetalert/with-react';

class AdminPage extends Component {
	constructor(props){
		super(props);
		this.state = {
			message : '',
			role : '1',
			status : '',
			name : '',
			accountID : '',
			listAccount : []
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

	onUpdate = (data) => {
		this.setState({
			accountID : data.id
		});
		this.setState({
			name : data.name
		});
		this.setState({
			status : data.status
		});
	}

	onDelete = (data) => {
		swal({
			title: "Are you sure ?",
			text: "Account will be deleted !",
			icon: "warning",
			buttons: true,
			dangerMode: true,
		})
		.then((willDelete) => {
			if (willDelete) {

				axios({
					method: 'DELETE',
					url: 'http://nguyenvantuan239-001-site1.itempurl.com/api/account',
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
							}
						}).then(res => {
							localStorage.setItem('access_token', res.data.access_token);
							localStorage.setItem('refresh_token', res.data.refresh_token);

							axios({
								method: 'DELETE',
								url: 'http://nguyenvantuan239-001-site1.itempurl.com/api/account',
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

	onSaveUpdate = (e) => {
		e.preventDefault();
		var {accountID, status} = this.state;
		axios({
			method: 'PUT',
			url: 'http://nguyenvantuan239-001-site1.itempurl.com/api/account',
			data: {
				id : accountID,
				status : status
			},
			headers: { Authorization: "Bearer " + localStorage.getItem('access_token')}
		}).then(res => {
			swal("Update success!", {
				icon: "success",
				timer: 2000
			});
			this.getAccount();
		}).catch(err => {
			if (err.response.status === 404) {
				swal("Fail !", "Update Fail !", "error");
			}
			else if (err.response.status === 401) {
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
						method: 'PUT',
						url: 'http://nguyenvantuan239-001-site1.itempurl.com/api/account',
						data: {
							id : accountID,
							status : status
						},
						headers: { Authorization: "Bearer " + localStorage.getItem('access_token')}
					}).then(res => {
						swal("Update success!", {
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

	getAccount () {
		axios({
			method: 'POST',
			url: 'http://nguyenvantuan239-001-site1.itempurl.com/api/account/getaccounts',
			data: {
			},
			headers: { Authorization: "Bearer " + localStorage.getItem('access_token')}
		}).then(res => {
			this.setState({
				listAccount : res.data
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
						method: 'POST',
						url: 'http://nguyenvantuan239-001-site1.itempurl.com/api/account/getaccounts',
						data: {
						},
						headers: { Authorization: "Bearer " + localStorage.getItem('access_token')}
					}).then(res => {
						this.setState({
							listAccount : res.data
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
		this.getAccount();

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
		var {name, status, listAccount, message, role} = this.state;

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
												<th>Role</th>
												<th>Status</th>
												<th>Edit</th>
												<th>Delete</th>
											</tr>
										</thead>
										<tbody>
										{
											listAccount.map((data, index) => {
												return (
													<tr key={index}>
														<td>{index + 1}</td>
														<td>{data.accountName}</td>
														<td>{data.name}</td>
														<td>{data.phone}</td>
														<td>{data.address}</td>
														<td>{data.role === "1" ? 'Admin' : 'User'}</td>
														<td>{data.status === "1" ? 'Active' : 'Locked'}</td>
														<td><a href="!#" role="button" data-title="editAccount" data-toggle="modal" data-target="#editAccount" onClick={() => this.onUpdate(data)}><i className="fa fa-pencil-square-o fa-lg" aria-hidden="true"></i> </a></td>
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

		        {/*Model feedback*/}
		        <form onSubmit={this.onSaveUpdate}>
			        <div className="modal fade" id="editAccount" tabIndex={-1} role="dialog" aria-hidden="true">
			        	<div className="modal-dialog">
			        		<div className="modal-content">
			        			<div className="modal-header">
			        				<h5 className="modal-title">Edit account {name}</h5>
				        			<button type="button"  className="close" data-dismiss="modal" aria-label="Close">
				        				<span aria-hidden="true">&times;</span>
				        			</button>
			        			</div>
			        			<div className="modal-body">
			        				<div className="row">
			        					<div className="col-md-2">
			        					</div>
			        					<div className="col-md-6">
				        					<div className="form-group">
				        						<select required="required" className="form-control" name="status" value={status} onChange={this.onChange} >
					                                <option value="1">Active</option>
					                                <option value="0">Locked</option>
			                              		</select>
				        					</div>
			        					</div>
			        				</div>
			        			</div>
			        			<div className="modal-footer ">
			        				<button type="submit" className="btn" id="saveAccount" ><i className="fa fa-floppy-o"></i> Save</button>
			        			</div>
			        		</div>
			        	</div>
			        </div>
		        </form>
		        
	      	</div>
		);
	}
}

export default AdminPage;
import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import swal from '@sweetalert/with-react';

class ToolQueryPage extends Component {
	constructor(props){
		super(props);
		this.state = {
			message : '',
			role : '1',
			queryValue : '',
			countRecord : '50',
			listResult : [],
			listKeyName : []
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

	submitQuery = (e) => {
		e.preventDefault();
		var {queryValue, countRecord} = this.state;
		if (queryValue.toUpperCase().includes("SELECT")) {
			queryValue = queryValue.toUpperCase().replace("SELECT", "SELECT TOP " + countRecord);
		}

		axios({
			method: 'POST',
			url: 'http://nguyenvantuan239-001-site1.itempurl.com/api/toolquery',
			data: {
				querySql : queryValue
			},
			headers: { Authorization: "Bearer " + localStorage.getItem('access_token')}
		}).then(res => {
			if (res.data.length > 0) {
				this.setState({
					listKeyName : Object.keys(res.data[0])
				});
				this.setState({
					listResult : res.data
				});

				swal("Success !", {
					icon: "success",
					timer: 2000
				});
			} else {
				swal(res.data.message + " !", {
					icon: "success",
					timer: 2000
				});
			}
		}).catch(err => {
			if (err.response.status === 400) {
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
						url: 'http://nguyenvantuan239-001-site1.itempurl.com/api/toolquery',
						data: {
							querySql : queryValue.toUpperCase().replace("SELECT", "SELECT TOP " + countRecord)
						},
						headers: { Authorization: "Bearer " + localStorage.getItem('access_token')}
					}).then(res => {
						if (res.data.length > 0) {
							this.setState({
								listKeyName : Object.keys(res.data[0])
							});
							this.setState({
								listResult : res.data
							});

							swal("Success !", {
								icon: "success",
								timer: 2000
							});
						} else {
							swal(res.data.message + " !", {
								icon: "success",
								timer: 2000
							});
						}
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
		var {listResult, listKeyName, message, role} = this.state;

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
												<th><i className="fa fa-search-plus" aria-hidden="true"></i>&nbsp;Run Query&emsp;&emsp;&emsp;Max Number of displayed rows&emsp;
													<select name="countRecord" onChange={this.onChange}>
														<option value="50">50</option>
														<option value="100">100</option>
														<option value="200">200</option>
												    </select>
												</th>
												<th></th>
											</tr>
										</thead>
										<tbody>
											<tr>
												<td>
													<textarea name="queryValue" id="queryValue" cols="50" rows="5" onChange={this.onChange}></textarea>
												</td>
											</tr>
											<tr>
												<td align="Center">
													<input type="button" name="reset" id="reset" value="Reset"></input>&nbsp;&nbsp;
													<input onClick={this.submitQuery} type="button" name="submit" id="submit" value="Submit"></input>
												</td>
											</tr>	
										</tbody>

										{/*Result executequery*/}
										<table id="resultTable" className="table table-bordred">
											<thead className="thead-light">
												<tr>
												{
													listKeyName.map((data, index) => {
														return (
															<th key={index}>{data}</th>
														);
													})
												}
												</tr>
											</thead>
											<tbody>
											{
												listResult.map((data, index) => {
													return (
														<tr key={index}>
														{
															listKeyName.map((keyName, i) =>
																<td>{data[keyName]}</td>
															)
														}
														</tr>
													);
												})
											}
											</tbody>
										</table>

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
export default ToolQueryPage;
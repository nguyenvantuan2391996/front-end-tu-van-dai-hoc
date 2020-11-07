import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

class UserPage extends Component {
	constructor(props){
		super(props);
		this.state = {
			message : '',
			role : '0',
			yourScore : '',
			location : '',
			examGroup : '',
			majorGroup : '',
			resultDss : []
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

	onConsult = (e) => {
		e.preventDefault();
		var {yourScore, location, examGroup, majorGroup} = this.state;
		axios({
			method: 'POST',
			url: 'http://nguyenvantuan239-001-site1.itempurl.com/api/decisionsupport',
			data: {
				score: yourScore,
				location: location,
				examGroup: examGroup,
				majorGroupId: majorGroup
			},
			headers: { Authorization: "Bearer " + localStorage.getItem('access_token')}
		}).then(res => {
			this.setState({
				resultDss : res.data
			});
		}).catch(err => {
			if (err.response.status === "404") {
				alert(err.response.data.message);
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
						url: 'http://nguyenvantuan239-001-site1.itempurl.com/api/decisionsupport',
						data: {
							score: yourScore,
							location: location,
							examGroup: examGroup,
							majorGroupId: majorGroup
						},
						headers: { Authorization: "Bearer " + localStorage.getItem('access_token')}
					}).then(res => {
						this.setState({
							resultDss : res.data
						});
					});
				}).catch(err => {
					this.setState({
						message : "signout"
					});
				});
			}
		});
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
		var {resultDss, message, role, yourScore, location, examGroup, majorGroup} = this.state;

		if (message === "signout" || role !== "0") {
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
		              <li><a href="/user"><span className="sidebar-icon"><i className="fa fa-search" /></span> <span className="menu-title">Consulting Majors</span></a></li>
		              <li><a href="/comment"><span className="sidebar-icon"><i className="fa fa-comment-o" /></span> <span className="menu-title">Comment</span></a></li>
		              <li><a href='/feedback'><span className="sidebar-icon"><i className="fa fa-rss" /></span> <span className="menu-title">Feedback</span></a></li>
		              <li><a role="button" onClick={this.onSignOut}><span className="sidebar-icon"><i className="fa fa-lock" /></span> <span className="menu-title">Sign Out</span></a></li>
		            </ul>
		          </div>
		        </div>

		        <section id="main-content">
		        	<section className="wrapper main-wrapper row">
		        	<form onSubmit={this.onConsult}>
		        		<div className="row">
		        				<div className="col-md-2">
			        				<div className="form-group">
		                              <input type="text" className="form-control" placeholder="Your Score *" name="yourScore" value={yourScore} onChange={this.onChange} required="required" />
		                            </div>
			        			</div>

			        			<div className="col-md-2">
			        				<div className="form-group">
	                              		<select required="required" className="form-control" name="location" value={location} onChange={this.onChange} >
			                                <option className="hidden" defaultValue>Location *</option>
			                                <option value="all">All</option>
			                                <option value="Bắc">Bắc</option>
			                                <option value="Trung">Trung</option>
			                                <option value="Nam">Nam</option>
	                              		</select>
	                            	</div>
			        			</div>

			        			<div className="col-md-2">
			        				<div className="form-group">
		                              <input type="text" className="form-control" placeholder="Exam Group *" name="examGroup" value={examGroup} onChange={this.onChange} required="required" />
		                            </div>
			        			</div>

			        			<div className="col-md-2">
			        				<div className="form-group">
	                              		<select required="required" className="form-control" name="majorGroup" value={majorGroup} onChange={this.onChange} >
			                                <option className="hidden" defaultValue>Majors Group *</option>
			                                <option value="1">Khoa học - Kỹ thuật</option>
			                                <option value="2">Kinh tế - Quản lý</option>
			                                <option value="3">	Chính trị - Quân sự</option>
			                                <option value="4">Xã hội - Nhân văn</option>
			                                <option value="5">Năng khiếu</option>
			                                <option value="6">Ngôn ngữ</option>
			                                <option value="7">Y - Dược</option>
	                              		</select>
	                            	</div>
			        			</div>

			        			<div className="col-md-2">
			        				<div className="d-flex justify-content-center">
			        					<button type="submit" className="btn btn-light"><i className="fa fa-graduation-cap" aria-hidden="true"></i> Consult</button>
			        				</div>
			        			</div>
			        			<div className="col-md-12">
			        				<div className="card shadow">
			        					<div className="table-responsive">
											<table id="mytable" className="table table-bordred">
												<thead className="thead-light">
													<tr>
														<th>Rank</th>
														<th>University Name</th>
														<th>Majors Name</th>
														<th>Exam Group</th>
														<th>Majors Group Name</th>
														<th>Benchmarks 2019</th>
														<th>Location</th>
														<th>Link Website</th>
													</tr>
												</thead>
												<tbody>
												{
													resultDss.map((data, index) => {
														return (
															<tr key={index}>
																<td>{index + 1}</td>
																<td>{data.universityName}</td>
																<td>{data.majorsName}</td>
																<td>{data.examGroup}</td>
																<td>{data.majorsGroupName}</td>
																<td>{data.benchmarks2019}</td>
																<td>{data.location}</td>
																<td><a target="_blank" href="data.linkWebsite">{data.linkWebsite}</a></td>
															</tr>
														);
													})
												}
												</tbody>
											</table>
						        		</div>
			        				</div>
					        	</div>
					        </div>
				        </form>
		        	</section>
		        </section>
		        
	      	</div>
		);
	}
}

export default UserPage;
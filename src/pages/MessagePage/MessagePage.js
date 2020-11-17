import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import swal from '@sweetalert/with-react';
import moment from 'moment';

class MessagePage extends Component {
	constructor(props){
		super(props);
		this.state = {
			message : '',
			role : '0',
			senderId : '',
			receiverId : '',
			messageContent : '',
			listMessage : []
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

	selectChat = (e) => {
		e.preventDefault();
		axios({
			method: 'POST',
			url: 'http://nguyenvantuan239-001-site1.itempurl.com/api/message/getmessage',
			data: {
				sender_id: 3,
				receive_id: 1
			}
		}).then(res => {
			this.setState({
				listMessage : res.data
			});
		}).catch(err => {
			swal("Fail !", err.response.data.message + " !", "error");
		});
	}

	submitSend = (e) => {
		e.preventDefault();
		var {messageContent} = this.state;

		axios({
			method: 'POST',
			url: 'http://nguyenvantuan239-001-site1.itempurl.com/api/message/addmessage',
			data: {
				messageChat: {
					message_content : messageContent,
					message_time : moment(new Date.toLocaleDateString()).format(),
					is_read : "0"
				},
				senderReceive: {
					sender_id : 3,
					receive_id : 1
				}
			}
		}).then(res => {
			this.selectChat(e);
		}).catch(err => {
			swal("Fail !", err.response.data.message + " !", "error");
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
		var {message, role, receiverId, listMessage} = this.state;

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
		              <li><a href="/message"><span className="sidebar-icon"><i className="fa fa-comment-o" /></span> <span className="menu-title">Message</span></a></li>
		              <li><a href="!#" role="button" data-title="feedback" data-toggle="modal" data-target="#feedback"><span className="sidebar-icon"><i className="fa fa-rss" /></span> <span className="menu-title">Feedback</span></a></li>
		              <li><a href="!#" role="button" onClick={this.onSignOut}><span className="sidebar-icon"><i className="fa fa-lock" /></span> <span className="menu-title">Sign Out</span></a></li>
		            </ul>
		          </div>
		        </div>							

		        <section id="main-content">
		        	<section className="wrapper main-wrapper row">
	        			<div className="col-md-12">
	        				<div className="card shadow">
	        					<div className="container">
						          <div className="messaging">
						            <div className="inbox_msg">
						              <div className="inbox_people">
						                <div className="headind_srch">
						                  <div className="recent_heading">
						                    <h4>Message</h4>
						                  </div>
						                  <div className="srch_bar">
						                    <div className="stylish-input-group">
						                      <input type="text" className="search-bar" placeholder="Search" />
						                      <span className="input-group-addon">
						                        <button type="button"> <i className="fa fa-search" aria-hidden="true" /> </button>
						                      </span> </div>
						                  </div>
						                </div>

						                <div className="inbox_chat">
						                  <div className="chat_list active_chat">
						                    <div className="chat_people">
						                      <div className="chat_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil" /> </div>
						                      <a href="!#" value={receiverId} onClick={this.selectChat} role="button">
							                      <div className="chat_ib">
								                      <h5>Sunil Rajput <span className="chat_date">Dec 25</span></h5>
									                        <p>Test, which is a new approach to have all solutions 
									                        astrology under one roof.</p>
							                      </div>
						                      </a>
						                    </div>
						                  </div>
						                  <div className="chat_list">
						                    <div className="chat_people">
						                      <div className="chat_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil" /> </div>
						                      <a href="" role="button">
						                      <div className="chat_ib">
						                        <h5>Sunil Rajput <span className="chat_date">Dec 25</span></h5>
						                        <p>Test, which is a new approach to have all solutions 
						                          astrology under one roof.</p>
						                      </div>
						                      </a>
						                    </div>
						                  </div>
						                </div>
						              </div>

						              <div className="card-header msg_head">
										<div className="d-flex bd-highlight">
											<div className="img_cont">
												<img src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg" className="rounded-circle user_img" />
											</div>
											<div className="user_info">
												<span><b>Chat with Khalid</b></span>
											</div>
											<div className="video_cam">
												<span><i className="fa fa-video-camera"></i></span>
												<span><i className="fa fa-phone-square"></i></span>
											</div>
										</div>
									</div>

						              <div className="mesgs">
						                <div className="msg_history">
						                {
						                	listMessage.map((data, index) => {
						                		return (
						                			<div key={index}>
						                			{
						                				data.sender_id === 1 ? (
						                					<div className="incoming_msg">
						                						<div className="incoming_msg_img">
						                							<img src="https://ptetutorials.com/images/user-profile.png" alt="sunil" />
						                						</div>
						                						<div className="received_msg">
						                							<div className="received_withd_msg">
						                								<p>{data.message_content}</p>
						                								<span className="time_date">{moment(data.message_time).format('DD-MM-YYYY HH:MM')}</span>
						                							</div>
						                						</div>
						                					</div>
						                				) : (
						                				<div className="outgoing_msg">
						                					<div className="sent_msg">
						                						<p>{data.message_content}</p>
						                						<span className="time_date">{moment(data.message_time).format('DD-MM-YYYY HH:MM')}</span>
						                					</div>
						                				</div>
						                				)
						                			}
						                			</div>					                			
						                		);
						                	})
						                }

						                  <div className="type_msg">
						                    <div className="input_msg_write">
						                      <input type="text" className="write_msg" placeholder="Type a message" name="messageContent" onChange={this.onChange} />
						                      <button onClick={this.submitSend} className="msg_send_btn" type="button"><i className="fa fa-paper-plane-o" aria-hidden="true" /></button>
						                    </div>
						                  </div>
						                </div>
						              </div>
						            </div></div>
						        </div>
	        				</div>
			        	</div>
		        	</section>
		        </section>
	      	</div>
		);
	}
}
export default MessagePage;
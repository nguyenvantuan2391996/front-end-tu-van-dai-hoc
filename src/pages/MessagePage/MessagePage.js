import React, { Component } from 'react';

class MessagePage extends Component {
	render() {
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
						                      <a href="" role="button">
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
						                  <div className="chat_list">
						                    <div className="chat_people">
						                      <div className="chat_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil" /> </div>
						                      <div className="chat_ib">
						                        <h5>Sunil Rajput <span className="chat_date">Dec 25</span></h5>
						                        <p>Test, which is a new approach to have all solutions 
						                          astrology under one roof.</p>
						                      </div>
						                    </div>
						                  </div>
						                  <div className="chat_list">
						                    <div className="chat_people">
						                      <div className="chat_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil" /> </div>
						                      <div className="chat_ib">
						                        <h5>Sunil Rajput <span className="chat_date">Dec 25</span></h5>
						                        <p>Test, which is a new approach to have all solutions 
						                          astrology under one roof.</p>
						                      </div>
						                    </div>
						                  </div>
						                  <div className="chat_list">
						                    <div className="chat_people">
						                      <div className="chat_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil" /> </div>
						                      <div className="chat_ib">
						                        <h5>Sunil Rajput <span className="chat_date">Dec 25</span></h5>
						                        <p>Test, which is a new approach to have all solutions 
						                          astrology under one roof.</p>
						                      </div>
						                    </div>
						                  </div>
						                  <div className="chat_list">
						                    <div className="chat_people">
						                      <div className="chat_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil" /> </div>
						                      <div className="chat_ib">
						                        <h5>Sunil Rajput <span className="chat_date">Dec 25</span></h5>
						                        <p>Test, which is a new approach to have all solutions 
						                          astrology under one roof.</p>
						                      </div>
						                    </div>
						                  </div>
						                  <div className="chat_list">
						                    <div className="chat_people">
						                      <div className="chat_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil" /> </div>
						                      <div className="chat_ib">
						                        <h5>Sunil Rajput <span className="chat_date">Dec 25</span></h5>
						                        <p>Test, which is a new approach to have all solutions 
						                          astrology under one roof.</p>
						                      </div>
						                    </div>
						                  </div>
						                </div>
						              </div>
						              <div className="mesgs">
						                <div className="msg_history">
						                  <div className="incoming_msg">
						                    <div className="incoming_msg_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil" /> </div>
						                    <div className="received_msg">
						                      <div className="received_withd_msg">
						                        <p>Test which is a new approach to have all
						                          solutions</p>
						                        <span className="time_date"> 11:01 AM    |    June 9</span></div>
						                    </div>
						                  </div>
						                  <div className="outgoing_msg">
						                    <div className="sent_msg">
						                      <p>Test which is a new approach to have all
						                        solutions</p>
						                      <span className="time_date"> 11:01 AM    |    June 9</span> </div>
						                  </div>
						                  <div className="incoming_msg">
						                    <div className="incoming_msg_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil" /> </div>
						                    <div className="received_msg">
						                      <div className="received_withd_msg">
						                        <p>Test, which is a new approach to have</p>
						                        <span className="time_date"> 11:01 AM    |    Yesterday</span></div>
						                    </div>
						                  </div>
						                  <div className="outgoing_msg">
						                    <div className="sent_msg">
						                      <p>Apollo University, Delhi, India Test</p>
						                      <span className="time_date"> 11:01 AM    |    Today</span> </div>
						                  </div>
						                  <div className="incoming_msg">
						                    <div className="incoming_msg_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil" /> </div>
						                    <div className="received_msg">
						                      <div className="received_withd_msg">
						                        <p>We work directly with our designers and suppliers,
						                          and sell direct to you, which means quality, exclusive
						                          products, at a price anyone can afford.</p>
						                        <span className="time_date"> 11:01 AM    |    Today</span></div>
						                    </div>
						                    <div className="incoming_msg">
						                      <div className="incoming_msg_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil" /> </div>
						                      <div className="received_msg">
						                        <div className="received_withd_msg">
						                          <p>We work directly with our designers and suppliers,
						                            and sell direct to you, which means quality, exclusive
						                            products, at a price anyone can afford.</p>
						                          <span className="time_date"> 11:01 AM    |    Today</span></div>
						                      </div>
						                    </div>
						                  </div>
						                  <div className="type_msg">
						                    <div className="input_msg_write">
						                      <input type="text" className="write_msg" placeholder="Type a message" />
						                      <button className="msg_send_btn" type="button"><i className="fa fa-paper-plane-o" aria-hidden="true" /></button>
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